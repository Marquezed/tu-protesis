const CACHE = "version12";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

self.addEventListener("message", (event)=> {
    if (event.data && event.data.type === "SKIP_WAITING"){
        self.skipWaiting();
    }
});

workbox.routing.registerRoute(
    new RegExp('/*'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: CACHE
    })
)