if('serviceWorker' in navigator){
 navigator.serviceWorker.register('service-worker.js')
   .then(() => console.log('Registered. '))
   .catch(err => console.error(err))
}