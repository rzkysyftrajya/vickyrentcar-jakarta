(function() {
  function getTrackingId() {
    try {
      var currentScript = document.currentScript || document.querySelector('script[src*="track.js"]');
      if (currentScript) {
        return currentScript.getAttribute('data-tracking-id') || 
               currentScript.getAttribute('data-tracking-key') || 
               '9ab5c620-00fb-4833-88cb-6172a7028f7a';
      }
    } catch (e) {}
    return '9ab5c620-00fb-4833-88cb-6172a7028f7a';
  }

  var trackingId = getTrackingId();

  function sendEvent(eventName, extraData) {
    var idToUse = trackingId || getTrackingId();
    if (!idToUse) {
      console.error('[VRNTrack] Tracking ID not found');
      return;
    }

    var payload = {
      event: eventName,
      tracking_key: idToUse,
      landing_page: window.location.href,
      referrer: document.referrer || '',
      user_agent: navigator.userAgent || ''
    };

    if (extraData) {
      for (var attrname in extraData) { 
        payload[attrname] = extraData[attrname]; 
      }
    }

    fetch('https://vrnadvertiser.vercel.app/api/public/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true
    })
    .then(function(res) { return res.json(); })
    .then(function(data) { console.log('[VRNTrack] Logged successfully:', data); })
    .catch(function(err) { console.error('[VRNTrack] Fetch error:', err); });
  }

  // Auto-send page_view
  sendEvent('page_view');

  // Register ke window object
  window.VRNTrack = {
    send: sendEvent,
    tracking_key: trackingId
  };
})();