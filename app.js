//register SW
if('serviceWorker' in navigator){
 window.onload = () => navigator.serviceWorker.register('./service-worker.js').catch(err => console.error(err))
}

//request notificationn
if("Notification" in window) {
  if(Notification.permission === "granted"){
    new Notification("Giraso",{
      body: "You have a new message",
      icon: "icon.png"
    })
  }else{
    Notification.requestPermission().then(perm =>{
      if(perm === "granted") {
        new Notification("Giraso",{
        body: "Activation fast",
        icon: "icon.png"
    })
  }

console.log(true)
