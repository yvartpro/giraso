//register SW
if('serviceWorker' in navigator){
 window.onload = () => navigator.serviceWorker.register('./service-worker.js').catch(err => console.error(err))
}

//notify user
const notifyUser = () => {
 if("Notification" in window) {
   if(Notification.permission === "granted"){
        navigator.serviceWorker.ready
        .then(r =>{
          r.showNotification("Giraso",
            body: "A new message arrives",
            icon: "icon/icon.png",
            vibrate : [200, 100, 200],
            tag: "msg-notification"
          )
        })
      })
    }else{
      Notification.requestPermission()
      .then(perm =>{
        if(perm === "granted") {
          new Notification("Giraso",{
            body: "Activation fast",
            icon: "icon.png"
          })
        }
      })
    }
  }
  console.log(true)
}
