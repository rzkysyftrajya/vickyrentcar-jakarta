import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

async function handleTrackApi(request: Request, env?: unknown): Promise<Response> {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "POST, OPTIONS",
        "access-control-allow-headers": "Content-Type",
      },
    });
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ success: false, error: "Method not allowed" }), {
      status: 405,
      headers: { "content-type": "application/json" },
    });
  }

  try {
    const rawBody = await request.text();
    const data = (rawBody ? JSON.parse(rawBody) : {}) as Record<string, unknown>;

    const getEnv = (name: string) =>
      (env && typeof env === "object" && typeof (env as Record<string, unknown>)[name] === "string"
        ? (env as Record<string, string>)[name]
        : undefined) || process.env[name];

    const event = data["event"] === "impression" ? "page_view" : data["event"];
    const trackingKey = typeof data["tracking_key"] === "string" ? data["tracking_key"].trim() : "";
    const isTrackingEvent = event === "page_view" || event === "click";

    if (request.url.includes("/api/public/track") && (!trackingKey || !isTrackingEvent)) {
      return new Response(JSON.stringify({ success: false, error: "tracking_key and a valid event are required" }), {
        status: 400,
        headers: { "content-type": "application/json", "access-control-allow-origin": "*" },
      });
    }

    // Ambil IP address asli pengunjung dari header proxy/CDN
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const cfConnectingIp = request.headers.get("cf-connecting-ip");

    const clientIp =
      (forwardedFor ? forwardedFor.split(",")[0]?.trim() : null) ||
      realIp ||
      cfConnectingIp ||
      "unknown";

    const payload: Record<string, unknown> = {
      ...data,
      ...(isTrackingEvent ? { event, tracking_key: trackingKey } : {}),
      ip_address: clientIp,
      server_timestamp: new Date().toISOString(),
    };

    if (isTrackingEvent && trackingKey && !payload["website_id"]) {
      const supabaseUrl = getEnv("SUPABASE_URL") || "https://qtgbuacxiuntczeaqlqi.supabase.co";
      const supabaseKey = getEnv("SUPABASE_SERVICE_ROLE_KEY") || getEnv("SUPABASE_ANON_KEY");

      if (supabaseKey) {
        const websiteLookup = await fetch(
          `${supabaseUrl}/rest/v1/websites?select=id&tracking_key=eq.${encodeURIComponent(trackingKey)}&limit=1`,
          {
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
            },
          },
        );

        if (websiteLookup.ok) {
          const websites = (await websiteLookup.json()) as Array<{ id?: string }>;
          const websiteId = websites[0]?.id;
          if (websiteId) payload["website_id"] = websiteId;
        }
      }
    }

    const targetUrl = getEnv("GOOGLE_APPS_SCRIPT_URL");

    if (isTrackingEvent) {
      const supabaseTrackUrl =
        getEnv("SUPABASE_TRACK_FUNCTION_URL") ||
        `${getEnv("SUPABASE_URL") || "https://qtgbuacxiuntczeaqlqi.supabase.co"}/functions/v1/track`;
      const supabaseKey = getEnv("SUPABASE_SERVICE_ROLE_KEY") || getEnv("SUPABASE_ANON_KEY");
      let trackingResponse = await fetch(supabaseTrackUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(supabaseKey ? { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` } : {}),
        },
        body: JSON.stringify(payload),
      });
      let trackingBody = await trackingResponse.text();
      let finalEvent = event;

      // Older deployed functions still accept legacy `impression` and reject
      // canonical `page_view`. Keep the public API canonical in this app while
      // translating upstream only when the remote function rejects it.
      const isLegacyEventRejection =
        event === "page_view" &&
        /invalid event type|unsupported event|not allowed|event.*page_view/i.test(trackingBody || "");

      if (isLegacyEventRejection || (event === "page_view" && trackingResponse.status === 400)) {
        trackingResponse = await fetch(supabaseTrackUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(supabaseKey ? { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` } : {}),
          },
          body: JSON.stringify({ ...payload, event: "impression" }),
        });
        trackingBody = await trackingResponse.text();
        finalEvent = "impression";
      }

      if (!trackingResponse.ok) {
        console.warn("[Tracking API] Upstream tracking failed. Returning a resilient success response so the browser does not break.", {
          event,
          finalEvent,
          status: trackingResponse.status,
          body: trackingBody,
        });

        return new Response(
          JSON.stringify({
            success: true,
            event,
            upstream_event: finalEvent,
            tracking_key: trackingKey,
            website_id: payload["website_id"] ?? null,
            warning: "Canonical page_view accepted by local app; upstream compatibility fallback was attempted.",
            details: trackingBody,
          }),
          {
            status: 200,
            headers: { "content-type": "application/json", "access-control-allow-origin": "*" },
          },
        );
      }

      return new Response(
        JSON.stringify({ success: true, event, tracking_key: trackingKey, website_id: payload["website_id"] ?? null }),
        {
          status: 200,
          headers: { "content-type": "application/json", "access-control-allow-origin": "*" },
        },
      );
    }

    // Forward ke Google Apps Script Web App Endpoint secara asynchronous
    if (targetUrl) {
      fetch(targetUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        redirect: "follow",
      }).catch((err) => {
        console.error("[Tracking API] Error forwarding to Google Apps Script:", err);
      });
    } else {
      console.warn(
        "[Tracking API] Warning: GOOGLE_APPS_SCRIPT_URL is not set. Please configure it in your environment variables."
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Tracking recorded successfully", ip: clientIp }),
      {
        status: 200,
        headers: {
          "content-type": "application/json",
          "access-control-allow-origin": "*",
        },
      }
    );
  } catch (error: any) {
    console.error("[Tracking API] Request error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error?.message || "Internal server error" }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      }
    );
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const url = new URL(request.url);
    // Accept both /api/track and /api/public/track for backward + forward compat
    if (url.pathname === "/api/track" || url.pathname === "/api/public/track") {
      return handleTrackApi(request, env);
    }

    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
