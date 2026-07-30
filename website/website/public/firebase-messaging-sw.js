importScripts(
  "https://www.gstatic.com/firebasejs/11.1.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/11.1.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyBmzI_YuznVHShDGR9dsQoNj5rjyXyMXXk",
  authDomain: "pr-2602-055---bsh-grocery.firebaseapp.com",
  projectId: "pr-2602-055---bsh-grocery",
  storageBucket: "pr-2602-055---bsh-grocery.firebasestorage.app",
  messagingSenderId: "706930903999",
  appId: "1:706930903999:web:6462e1efb7e2c03b4eaf0a",
  measurementId: "G-B7LQW46GJ8",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: payload.data.icon,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
