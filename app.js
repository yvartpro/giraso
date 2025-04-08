if('serviceWorker' in navigator){
 window.onload = () => navigator.serviceWorker.register('./service-worker.js').catch(err => console.error(err))
}