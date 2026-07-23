const CACHE_NAME = "volt-calc-v1";
const APP_FILES = [
  "/volt-calc/",
  "/volt-calc/index.html",
  "/volt-calc/styles.css",
  "/volt-calc/script.js",
  "/volt-calc/manifest.webmanifest",
  "/volt-calc/icon.svg",
  "/volt-calc/kw-amp/",
  "/volt-calc/caida-volt/",
  "/volt-calc/calcs/kw-amp/kw-amp.html",
  "/volt-calc/calcs/kw-amp/style.css",
  "/volt-calc/calcs/kw-amp/code.js",
  "/volt-calc/calcs/caida-volt/caida-volt.html",
  "/volt-calc/calcs/caida-volt/style.css",
  "/volt-calc/calcs/caida-volt/code.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.match(event.request).then((cachedResponse) => cachedResponse || caches.match("/volt-calc/"))
      )
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => cachedResponse || fetch(event.request))
  );
});
