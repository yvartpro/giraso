if('serviceWorker' in navigator){
 navigator.serviceWorker.register( registration => console.log('Service worker registered: ', registration))
}else{
    console.log(false)
}