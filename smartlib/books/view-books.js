// File location: smartlib/books/view-books.js

window.addEventListener("DOMContentLoaded", async function () {
  const container = document.getElementById("books-container");
  const searchInput = document.getElementById("search-input");
  const categorySelect = document.getElementById("category-filter");

  let allBooks = [];

  try {
    const snapshot = await firebase.database().ref("books").once("value");
    const books = snapshot.val();

    if (!books) {
      container.innerHTML = "<p>No books found.</p>";
      return;
    }

    allBooks = Object.values(books);
    renderBooks(allBooks);

    function filterBooks() {
      const query = searchInput.value.toLowerCase();
      const selectedCategory = categorySelect.value;
      const filtered = allBooks.filter(book =>
        (book.title.toLowerCase().includes(query) ||
         book.author.toLowerCase().includes(query) ||
         book.zone.toLowerCase().includes(query)) &&
        (selectedCategory === "all" || book.category === selectedCategory)
      );
      renderBooks(filtered);
    }

    searchInput.addEventListener("input", filterBooks);
    categorySelect.addEventListener("change", filterBooks);

  } catch (error) {
    console.error("Error loading books:", error);
    container.innerHTML = "<p>Failed to load books.</p>";
  }

  function renderBooks(bookList) {
    container.innerHTML = "";

    const grouped = {};
    bookList.forEach(book => {
      const cat = book.category || "Uncategorized";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(book);
    });

    for (const category in grouped) {
      const section = document.createElement("section");
      section.innerHTML = `<h2>${category}</h2>`;
      grouped[category].forEach(book => {
        const div = document.createElement("div");
        div.className = "book-card";
        div.innerHTML = `
          ${book.coverUrl ? `<img src="${book.coverUrl}" alt="${book.title}" style="width:100px;height:150px;object-fit:cover;border-radius:6px;margin-bottom:8px;">` : ''}
          <h3>${book.title}</h3>
          <p><strong>Author:</strong> ${book.author}</p>
          <p><strong>Rating:</strong> ${book.rating}</p>
          <p><strong>Zone:</strong> ${book.zone}</p>
        `;
        section.appendChild(div);
      });
      container.appendChild(section);
    }
  }
});
