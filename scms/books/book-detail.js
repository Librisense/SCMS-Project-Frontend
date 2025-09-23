const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get("bookId");
const db = firebase.database();

const cover = document.getElementById("book-cover");
const title = document.getElementById("book-title");
const author = document.getElementById("book-author");
const category = document.getElementById("book-category");
const rating = document.getElementById("book-rating");
const zone = document.getElementById("book-zone");

const borrowBtn = document.getElementById("borrow-btn");
const reserveBtn = document.getElementById("reserve-btn");
const mapBtn = document.getElementById("map-btn");

function loadBookData() {
  db.ref(`books/${bookId}`).once("value").then(snapshot => {
    if (!snapshot.exists()) {
      title.textContent = "Book not found.";
      return;
    }

    const book = snapshot.val();

    cover.src = book.cover || "https://via.placeholder.com/180x220";
    title.textContent = book.title;
    author.textContent = book.author || "Unknown";
    category.textContent = book.category || "Uncategorized";
    rating.textContent = book.rating || "N/A";
    zone.textContent = book.zone || "Unknown";

    // Set up buttons
    borrowBtn.onclick = () => {
      window.location.href = `borrow-book.html?bookId=${bookId}`;
    };

    reserveBtn.onclick = () => {
      window.location.href = `reserve-book.html?bookId=${bookId}`;
    };

    mapBtn.onclick = () => {
      window.location.href = `../../personal-map.html?bookId=${bookId}`;
    };
  });
}

loadBookData();
