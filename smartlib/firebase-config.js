// Firebase SDKs already included in HTML via <script> tags

const firebaseConfig = {
  apiKey: "AIzaSyDfp-yredGhyaan3ly2BFT9sESlPNjsjHY",
  authDomain: "iot-librisense.firebaseapp.com",
  databaseURL: "https://iot-librisense-default-rtdb.firebaseio.com",
  projectId: "iot-librisense",
  storageBucket: "iot-librisense.appspot.com",
  messagingSenderId: "G-NFZQKEXCK0",
  appId: "1:834080956081:web:42fe60eda9e038e8b1cc90"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize only Realtime Database
const db = firebase.database();
