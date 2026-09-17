(function() {
  // 1. Inisialisasi awal ke window object secara langsung
  const VRNTrack = {
    tracking_key: null,
    _initialized: false,
    lastClickTime: 0,
    endpoint: 'https://vrnadvertiser.vercel.app/api/public/track',
    legacyEndpoint: 'https://qtgbuacxiuntczeaqlqi.supabase.co/functions/v1/track',

    init: function(config) {
      if (!config || !config.tracking_key) {
        console.error('[VRNTrack] Missing tracking_key');
        return;
      }
      // Guard: prevent double page_view if init is called more than once
      if (this._initialized && this.tracking_key === config.tracking_key) {
        console.warn('[VRNTrack] Already initialized with this tracking_key — skipping duplicate init');
        return;
      }
      this.tracking_key = config.tracking_key;
      this._initialized = true;
      this.trackPageView();
    },

    // Canonical page_view event (sends 'page_view' to the backend)
    trackPageView: function() {
      const sentKey = 'vrn_page_view_sent_' + this.tracking_key + '_' + window.location.href;
      if (sessionStorage.getItem(sentKey)) {
        console.log('[VRNTrack] page_view already sent for this session.');
        return;
      }
      sessionStorage.setItem(sentKey, 'true');
      this.send('page_view');
    },

    // Backward-compat alias — kept so existing callers don't break
    trackImpression: function() {
      this.trackPageView();
    },

    // Anti-Spam Click: Jeda minimal 3 detik antar klik (Debounce)
    trackClick: function(extraData) {
      const now = Date.now();
      if (now - this.lastClickTime < 3000) {
        console.warn('[VRNTrack] Click ignored due to rate limiting (spam protection).');
        return;
      }
      this.lastClickTime = now;
      this.send('click', extraData || {});
    },

    send: function(event, extra) {
      if (!this.tracking_key) return;

      const urlParams = new URLSearchParams(window.location.search);
      const payload = {
        event: event,
        tracking_key: this.tracking_key,
        landing_page: window.location.href,
        referrer: document.referrer || '',
        gclid: urlParams.get('gclid') || null,
        utm_source: urlParams.get('utm_source') || null,
        utm_medium: urlParams.get('utm_medium') || null,
        utm_campaign: urlParams.get('utm_campaign') || null,
        utm_content: urlParams.get('utm_content') || null,
        utm_term: urlParams.get('utm_term') || null,
        keyword: urlParams.get('keyword') || null,
        device: /iPad|Tablet/i.test(navigator.userAgent)
          ? 'Tablet'
          : /Mobile|Android|iPhone|iPod/i.test(navigator.userAgent)
            ? 'Mobile'
            : 'Desktop',
        browser: /Edg\//i.test(navigator.userAgent)
          ? 'Edge'
          : /OPR\//i.test(navigator.userAgent)
            ? 'Opera'
            : /Chrome\//i.test(navigator.userAgent)
              ? 'Chrome'
              : /Firefox\//i.test(navigator.userAgent)
                ? 'Firefox'
                : /Safari\//i.test(navigator.userAgent)
                  ? 'Safari'
                  : 'Unknown',
        page_url: window.location.href,
        session_id: getSessionId(),
        user_agent: navigator.userAgent || '',
        timestamp: new Date().toISOString(),
        ...(extra || {})
      };

      function getSessionId() {
        const key = 'vrn_session_id';
        try {
          const existing = sessionStorage.getItem(key);
          if (existing) return existing;
          const generated = `sess_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
          sessionStorage.setItem(key, generated);
          return generated;
        } catch {
          return '';
        }
      }

      const targetEndpoint = event === 'click' ? this.legacyEndpoint : this.endpoint;
      fetch(targetEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        console.log('[VRNTrack] Event logged:', data);
      })
      .catch(function(err) {
        console.warn('[VRNTrack] Error:', err);
      });
    }
  };

  // Bind langsung ke window object di awal
  window.VRNTrack = VRNTrack;

  // Auto-init berdasarkan script tag
  try {
    const currentScript = document.currentScript || document.querySelector('script[src*="track.js"]');
    if (currentScript) {
      const autoKey = currentScript.getAttribute('data-tracking-key') || currentScript.getAttribute('data-tracking-id');
      if (autoKey) {
        VRNTrack.init({ tracking_key: autoKey });
      }
    }
  } catch (e) {
    console.error('[VRNTrack] Auto-init error:', e);
  }
})();