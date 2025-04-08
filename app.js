if('serviceWorker' in navigator){
 window.onload = () => navigator.serviceWorker.register('./service-worker.js')
   .then(() => console.log('Registered. '))
   .catch(err => console.error(err))
}