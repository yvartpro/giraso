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
          {
            body: "A new message arrives",
            icon: "icon/icon.png",
            vibrate : [200, 100, 200],
            tag: "msg-notification"
          }
        )
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
}

// Auth modal logic
const authBtn = document.getElementById("authBtn");
const authModal = document.getElementById("authModal");
const closeAuthModal = document.getElementById("closeAuthModal");
const loginBtn = document.getElementById("loginBtn");

authBtn.onclick = () => authModal.classList.remove("hidden");
closeAuthModal.onclick = () => authModal.classList.add("hidden");

// Dummy auth: Use localStorage for now
loginBtn.onclick = () => {
  const email = document.getElementById("authEmail").value;
  const password = document.getElementById("authPassword").value;
  if (email && password) {
    localStorage.setItem("user", JSON.stringify({ email }));
    updateAuthUI();
    authModal.classList.add("hidden");
  } else {
    alert("Please fill in both fields.");
  }
};

function updateAuthUI() {
  const user = JSON.parse(localStorage.getItem("user"));
  const authMenu = document.getElementById("authMenu");
  if (user) {
    authMenu.innerHTML = `
      <div class="text-sm text-gray-700 flex items-center space-x-2">
        <span>Hi, ${user.email.split('@')[0]}</span>
        <button id="logoutBtn" class="text-white bg-[var(--primary)] px-3 py-1 rounded hover:bg-[var(--secondary)]">Logout</button>
      </div>
    `;
    document.getElementById("logoutBtn").onclick = () => {
      localStorage.removeItem("user");
      updateAuthUI();
    };
  }
}

// Call it on load
updateAuthUI();
