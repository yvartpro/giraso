const CACHE_NAME = 'giraso-v1'
const FILES_TO_CACHE = ['./index.html', './bg.jpg']

self.oninstall = event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  )
  self.skipWaiting()  
}

self.onactivate = event => {
  event.waitUntil(
    caches.keys().then(keys => keys.map(cache => {
      if(cache !== CACHE_NAME) caches.delete(cache) //filter cache and keep actual version
    }))
  )
  self.skipWaiting()
}

//serve caches if cached and when offline or fetch over network
self.onfetch = event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  )
}