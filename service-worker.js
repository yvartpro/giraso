const CACHE_NAME = 'giraso-v1'
const FILES_TO_CACHE = ['./index.html', './logo.jpg']

self.oninstall = event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  )
  self.skipWaiting()  
}

self.onactivate = event => {
    caches.keys().then(keys => keys.map(cache => console.log(cache)))
}