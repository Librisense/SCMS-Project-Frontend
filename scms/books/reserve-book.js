const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get("bookId");
const db = firebase.database();

const form = document.getElementById("reserveForm");
const statusMessage = document.getElementById("statusMessage");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const uid = document.getElementById("uid").value.trim();

  db.ref(`reservations/${uid}/${bookId}`).set(true).then(() => {
    statusMessage.textContent = "Book reserved successfully!";
    statusMessage.style.color = "green";
    form.reset();
  }).catch(() => {
    statusMessage.textContent = "Reservation failed. Try again.";
    statusMessage.style.color = "red";
  });
});
