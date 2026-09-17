(function() {
  var trackingId = null;
  
  try {
    var currentScript = document.currentScript || document.querySelector('script[src*="track.js"]');
    if (currentScript) {
      trackingId = currentScript.getAttribute('data-tracking-id') || currentScript.getAttribute('data-tracking-key');
    }
  } catch (e) {}

  function sendEvent(eventName, extraData) {
    if (!trackingId) return;

    var payload = {
      event: eventName,
      tracking_key: trackingId,
      landing_page: window.location.href,
      referrer: document.referrer || '',
      user_agent: navigator.userAgent || ''
    };

    if (extraData) {
      for (var attrname in extraData) { payload[attrname] = extraData[attrname]; }
    }

    fetch('https://vrnadvertiser.vercel.app/api/public/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true
    })
    .then(function(res) { return res.json(); })
    .then(function(data) { console.log('[VRNTrack] Logged:', data); })
    .catch(function(err) { console.error('[VRNTrack] Error:', err); });
  }

  // Auto Send Page View begitu script dimuat
  if (trackingId) {
    sendEvent('page_view');
  }

  // Simpan ke window agar bisa dipanggil manual jika perlu
  window.VRNTrack = {
    send: sendEvent,
    tracking_key: trackingId
  };
})();