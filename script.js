// Firebase v10 modular import
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Firebase config (your real project settings)
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

// Initialize Firebase and Realtime Database
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const usersRef = ref(db, "users");

// Reference to the container
const mapContainer = document.getElementById("map-container");

// Store markers by userId
const markers = {};

// Create a marker at a given position
function createMarker(userId, top, left) {
  const marker = document.createElement("div");
  marker.className = "marker";
  marker.style.top = `${top}px`;
  marker.style.left = `${left}px`;
  marker.title = userId; // Tooltip on hover
  mapContainer.appendChild(marker);
  markers[userId] = marker;  // Save marker reference
}

// Update marker position smoothly
function updateMarkerPosition(userId, top, left) {
  const marker = markers[userId];
  if (marker) {
    marker.style.top = `${top}px`;
    marker.style.left = `${left}px`;
  } else {
    createMarker(userId, top, left);
  }
}

// Realtime update from Firebase with debug logs
onValue(usersRef, snapshot => {
  const users = snapshot.val();
  console.log("Firebase data:", users);  // Debug log

  if (users) {
    Object.entries(users).forEach(([userId, pos]) => {
      console.log(`User: ${userId}, Position:`, pos);  // Debug each user
      if (pos.top !== undefined && pos.left !== undefined) {
        updateMarkerPosition(userId, pos.top, pos.left);
      }
    });
  } else {
    console.log("No users found in database.");
  }
});
