const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get("bookId");
const db = firebase.database();

const form = document.getElementById("borrowForm");
const statusMessage = document.getElementById("statusMessage");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const uid = document.getElementById("uid").value.trim();
  const duration = parseInt(document.getElementById("duration").value);

  const bookRef = db.ref(`borrowed/${uid}/${bookId}`);

  // Check if book is already borrowed
  bookRef.once("value").then(snapshot => {
    if (snapshot.exists()) {
      statusMessage.textContent = "You’ve already borrowed this book.";
      statusMessage.style.color = "red";
    } else {
      const now = Date.now();
      const due = now + duration * 24 * 60 * 60 * 1000;

      bookRef.set({
        borrowedAt: now,
        dueAt: due
      }).then(() => {
        statusMessage.textContent = "Book successfully borrowed!";
        statusMessage.style.color = "green";
        form.reset();
      });
    }
  });
});
