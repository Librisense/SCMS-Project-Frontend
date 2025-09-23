// Firebase config (replace with your real config if needed)
const firebaseConfig = {
  apiKey: "AIzaSyDfp-yredGhyaan3ly2BFT9sESlPNjsjHY",
  authDomain: "iot-librisense.firebaseapp.com",
  databaseURL: "https://iot-librisense-default-rtdb.firebaseio.com",
  projectId: "iot-librisense",
  storageBucket: "iot-librisense.appspot.com",
  messagingSenderId: "834080956081",
  appId: "1:834080956081:web:42fe60eda9e038e8b1cc90",
  measurementId: "G-NFZQKEXCK0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Parse mood and uid from URL manually
let mood = null;
let uid = null;

if (window.location.search) {
  const urlParams = new URLSearchParams(window.location.search);
  mood = urlParams.get('mood');
  uid = urlParams.get('uid');
}

// If no mood in URL, fallback to sessionStorage
if (!mood) {
  mood = sessionStorage.getItem('userMood');
}

console.log('Mood:', mood);
console.log('User ID:', uid);

// Highlight the mood-based zone
if (mood) {
  const moodToZoneClass = {
    calm: 'reading-zone',
    happy: 'reading-zone',
    focus: 'computer-zone',
    'need-help': 'computer-zone',
    relax: 'study-zone',
    tired: 'study-zone'
  };

  const zoneClass = moodToZoneClass[mood];
  if (zoneClass) {
    const zoneEl = document.querySelector(`.zone.${zoneClass}`);
    if (zoneEl) {
      zoneEl.classList.add('highlighted');
    }
  }
}

// Handle user marker (optional)
const userMarker = document.getElementById("userMarker");
const defaultPosition = { top: 180, left: 50 };

// Set marker at default position
userMarker.style.top = `${defaultPosition.top}px`;
userMarker.style.left = `${defaultPosition.left}px`;

// Update marker if Firebase sends a position
if (uid) {
  const userRef = db.ref(`users/${uid}`);
  userRef.on("value", (snapshot) => {
    const pos = snapshot.val();
    if (pos && pos.top !== undefined && pos.left !== undefined) {
      userMarker.style.top = `${pos.top}px`;
      userMarker.style.left = `${pos.left}px`;
    }
  }, (error) => {
    console.error("Firebase error:", error);
  });
} else {
  console.warn("No UID in URL. Using default marker position.");
}
