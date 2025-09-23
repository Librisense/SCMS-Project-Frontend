const uid = "demo-user"; // Replace with dynamic UID in future

const db = firebase.database();

const suggestedList = document.getElementById("suggested-list");
const popularList = document.getElementById("popular-list");
const topRatedList = document.getElementById("top-rated-list");
const categoryList = document.getElementById("category-list");

// Helper: Create a book card element
function createBookCard(bookId, book) {
  const card = document.createElement("div");
  card.className = "book-card";

  card.innerHTML = `
    <img src="${book.cover || 'https://via.placeholder.com/100x140?text=No+Image'}" alt="${book.title}" class="book-thumb" />
    <div class="book-title">${book.title}</div>
    <div class="book-author">${book.author || "Unknown Author"}</div>
    <div class="book-rating">⭐ ${book.rating ? book.rating.toFixed(1) : 'N/A'}</div>
  `;

  card.addEventListener("click", () => {
    window.location.href = `../books/book-detail.html?bookId=${bookId}`;
  });

  return card;
}

async function getAllBooks() {
  const snapshot = await db.ref("books").once("value");
  const booksData = snapshot.val() || {};
  // Add ID inside each book object for convenience
  Object.entries(booksData).forEach(([id, book]) => {
    book.id = id;
  });
  return booksData;
}

async function getUserRecentBooks(uid) {
  const snapshot = await db.ref(`users/${uid}/recentBooks`).once("value");
  return snapshot.val() || [];
}

function renderBookList(bookData, container) {
  container.innerHTML = "";
  Object.entries(bookData).forEach(([bookId, book]) => {
    const card = createBookCard(bookId, book);
    container.appendChild(card);
  });
}

function renderCategories(books) {
  categoryList.innerHTML = "";
  const categories = {};

  Object.entries(books).forEach(([id, book]) => {
    const cat = book.category || "Other";
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push({ id, ...book });
  });

  Object.entries(categories).forEach(([categoryName, books]) => {
    const card = document.createElement("div");
    card.className = "category-card";
    card.textContent = `${categoryName} (${books.length})`;
    card.style.cursor = "pointer";
    card.style.padding = "10px";
    card.style.border = "1px solid #ccc";
    card.style.borderRadius = "5px";
    card.style.backgroundColor = "#fff";

    card.addEventListener("click", () => {
      // For now, show filtered books in the popular list section
      const filteredBooks = Object.fromEntries(
        books.map((b) => [b.id, b])
      );
      renderBookList(filteredBooks, popularList);
      window.scrollTo({ top: popularList.offsetTop, behavior: "smooth" });
    });

    categoryList.appendChild(card);
  });
}

async function loadDashboard() {
  const allBooks = await getAllBooks();
  const recentBooks = await getUserRecentBooks(uid);

  // Suggested books
  const suggested = {};
  recentBooks.forEach((id) => {
    if (allBooks[id]) suggested[id] = allBooks[id];
  });

  // Popular books (simulate with random sorting)
  const popular = Object.entries(allBooks)
    .sort(() => 0.5 - Math.random())
    .slice(0, 5)
    .reduce((obj, [id, book]) => {
      obj[id] = book;
      return obj;
    }, {});

  // Top rated books
  const topRated = Object.entries(allBooks)
    .sort(([, a], [, b]) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5)
    .reduce((obj, [id, book]) => {
      obj[id] = book;
      return obj;
    }, {});

  renderBookList(suggested, suggestedList);
  renderBookList(popular, popularList);
  renderBookList(topRated, topRatedList);
  renderCategories(allBooks);
}

loadDashboard();
