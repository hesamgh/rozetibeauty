(function () {
  var host = location.hostname;
  var isLocal =
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "[::1]";

  window.__rozetibeautyPwa = { deferredPrompt: null };

  window.addEventListener("beforeinstallprompt", function (event) {
    event.preventDefault();
    window.__rozetibeautyPwa.deferredPrompt = event;
    window.dispatchEvent(new CustomEvent("rozetibeauty-pwa-ready"));
  });

  window.addEventListener("appinstalled", function () {
    window.__rozetibeautyPwa.deferredPrompt = null;
    window.dispatchEvent(new CustomEvent("rozetibeauty-pwa-installed"));
  });

  if (!("serviceWorker" in navigator)) return;

  if (isLocal) {
    navigator.serviceWorker.getRegistrations().then(function (regs) {
      regs.forEach(function (reg) {
        reg.unregister();
      });
    });
    return;
  }

  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then(function (registration) {
        registration.addEventListener("updatefound", function () {
          var worker = registration.installing;
          if (!worker) return;

          worker.addEventListener("statechange", function () {
            if (
              worker.state === "activated" &&
              navigator.serviceWorker.controller
            ) {
              caches.keys().then(function (keys) {
                keys.forEach(function (key) {
                  if (key !== "rozetibeauty-pwa-v1") caches.delete(key);
                });
              });
            }
          });
        });
      })
      .catch(function () {});
  });
})();
