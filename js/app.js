// Register Service Worker
if ('serviceWorker' in navigator) {
  window.onload = () => {
    navigator.serviceWorker
      .register('./service-worker.js')
      .catch(err => console.error(err));
  };
}

// Notify User
const notifyUser = () => {
  if ("Notification" in window) {
    if (Notification.permission === "granted") {
      navigator.serviceWorker.ready.then(r => {
        r.showNotification("Giraso", {
          body: "A new message arrives",
          icon: "icons/favicon-32x32.png",
          vibrate: [200, 100, 200],
          tag: "msg-notification"
        });
      });
    } else {
      Notification.requestPermission().then(perm => {
        if (perm === "granted") {
          new Notification("Giraso", {
            body: "Activation fast",
            icon: "./icons/favicon-32x32.png"
          });
        }
      });
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const auth = window.firebaseAuth;
  const {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
  } = window.firebaseMethods;

  const loginForm = document.querySelector("#loginForm");     // modal login form
  const registerForm = document.querySelector("#registerForm"); // modal register form
  const logoutBtn = document.getElementById("logout-btn");
  const userStatus = document.getElementById("user-status");

  // Register
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        localStorage.setItem("user", JSON.stringify({ email: user.email }));
        alert("Registered as " + user.email);
        e.target.reset();
        // hide modal or update UI
      } catch (err) {
        alert(err.message);
      }
    });
  }

  // Login
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        localStorage.setItem("user", JSON.stringify({ email: user.email }));
        alert("Logged in as " + user.email);
        e.target.reset();
        // hide modal or update UI
      } catch (err) {
        alert(err.message);
      }
    });
  }

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      signOut(auth)
        .then(() => {
          alert("Logged out");
        })
        .catch(err => alert(err.message));
    });
  }

  // User State
  onAuthStateChanged(auth, (user) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify({ email: user.email }));
      if (userStatus) userStatus.textContent = "Connected: " + user.email;
    } else {
      localStorage.removeItem("user");
      if (userStatus) userStatus.textContent = "Not connected";
    }
  });
});
