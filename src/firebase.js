  import firebase  from 'firebase/app'
  import 'firebase/auth'
  import 'firebase/database'
  import 'firebase/storage'
  
  
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAkdJgNnjuJRPa4EaY0AnIlxklzEzyvBKA",
    authDomain: "chatapp-39a37.firebaseapp.com",
    databaseURL: "https://chatapp-39a37.firebaseio.com",
    projectId: "chatapp-39a37",
    storageBucket: "chatapp-39a37.appspot.com",
    messagingSenderId: "93300204985"
  };
  firebase.initializeApp(config);

  export default firebase;