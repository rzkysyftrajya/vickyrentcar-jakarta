(function() {
  const VRNTrack = {
    tracking_key: null,
    _initialized: false,
    lastClickTime: 0,
    endpoint: 'https://vrnadvertiser.vercel.app/api/public/track',

    init: function(config) {
      if (!config || !config.tracking_key) {
        console.error('[VRNTrack] Missing tracking_key');
        return;
      }
      if (this._initialized && this.tracking_key === config.tracking_key) {
        return;
      }
      this.tracking_key = config.tracking_key;
      this._initialized = true;

      // Auto Track Page View saat di-init
      this.trackPageView();

      // Auto Attach Global Click Listener
      this.attachClickListeners();
    },

    trackPageView: function() {
      this.send('page_view');
    },

    trackClick: function(extraData) {
      const now = Date.now();
      if (now - this.lastClickTime < 3000) {
        console.warn('[VRNTrack] Click ignored (anti-spam 3s window).');
        return;
      }
      this.lastClickTime = now;
      this.send('click', extraData || {});
    },

    send: function(event, extra) {
      if (!this.tracking_key) return;

      const urlParams = new URLSearchParams(window.location.search);
      
      function getSessionId() {
        const key = 'vrn_session_id';
        try {
          const existing = sessionStorage.getItem(key);
          if (existing) return existing;
          const generated = 'sess_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 10);
          sessionStorage.setItem(key, generated);
          return generated;
        } catch (e) {
          return '';
        }
      }

      const payload = Object.assign({
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
        timestamp: new Date().toISOString()
      }, extra || {});

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
        console.warn('[VRNTrack] Error sending log:', err);
      });
    },

    attachClickListeners: function() {
      const self = this;
      document.addEventListener('click', function(e) {
        const target = e.target.closest('a, button');
        if (!target) return;
        
        const href = target.getAttribute('href') || '';
        if (href.includes('wa.me') || href.includes('whatsapp.com') || href.startsWith('tel:')) {
          self.trackClick({
            target_url: href,
            element_text: (target.innerText || '').trim().slice(0, 100)
          });
        }
      }, true);
    }
  };

  window.VRNTrack = VRNTrack;

  // Auto Init
  try {
    const currentScript = document.currentScript || document.querySelector('script[src*="track.js"]');
    if (currentScript) {
      const autoKey = currentScript.getAttribute('data-tracking-id') || currentScript.getAttribute('data-tracking-key');
      if (autoKey) {
        VRNTrack.init({ tracking_key: autoKey });
      }
    }
  } catch (e) {
    console.error('[VRNTrack] Auto-init error:', e);
  }
})();