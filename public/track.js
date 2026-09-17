(function() {
  // 1. Inisialisasi awal ke window object secara langsung
  const VRNTrack = {
    tracking_key: null,
    endpoint: 'https://qtgbuacxiuntczeaqlqi.supabase.co/functions/v1/track',
    lastClickTime: 0,

    init: function(config) {
      if (!config || !config.tracking_key) {
        console.error('[VRNTrack] Missing tracking_key');
        return;
      }
      this.tracking_key = config.tracking_key;
      this.trackImpression();
    },

    // 2. Anti-Spam Impression: Hanya kirim 1x per sesi browser
    trackImpression: function() {
      if (sessionStorage.getItem('vrn_impression_sent')) {
        console.log('[VRNTrack] Impression already sent for this session.');
        return;
      }
      sessionStorage.setItem('vrn_impression_sent', 'true');
      this.send('impression');
    },

    // 3. Anti-Spam Click: Jeda minimal 3 detik antar klik (Debounce)
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
        device: urlParams.get('device') || null,
        user_agent: navigator.userAgent || '',
        timestamp: new Date().toISOString(),
        ...(extra || {})
      };

      fetch(this.endpoint, {
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