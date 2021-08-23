importScripts('https://www.gstatic.com/firebasejs/7.21.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.21.0/firebase-messaging.js');
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('../firebase-messaging-sw.js')
//     .then(function(registration) {
//       console.log('Registration successful, scope is:', registration.scope);
//     }).catch(function(err) {
//       console.log('Service worker registration failed, error:', err);
//     });
// }
console.log('hello firebase');
firebase.initializeApp({
  apiKey: "AIzaSyD2Mj9mQuxS9qAPa5yatnR4bxnu_FUu3LY",
  authDomain: "angular-cloud-messing.firebaseapp.com",
  projectId: "angular-cloud-messing",
  storageBucket: "angular-cloud-messing.appspot.com",
  messagingSenderId: "673503877237",
  appId: "1:673503877237:web:a5318dafe59ddf9c8ac03c",
  measurementId: "G-PH286821T5"
});
const messaging = firebase.messaging();
