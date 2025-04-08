if('serviceWorker' in navigator){
 navigator.serviceWorker.register('service-worker.js').then(registration => console.log('Service worker registered: ', registration))
}else{
    console.log(false)
}