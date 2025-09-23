// File location: smartlib/books/add-book.js

// STEP 2: Wait for DOM to load
window.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("add-book-form");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // STEP 3: Get all form values
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const category = document.getElementById("category").value.trim();
    const rating = document.getElementById("rating").value.trim();
    const zone = document.getElementById("zone").value.trim();

    // STEP 4: Use placeholder image instead
    const downloadURL = "https://via.placeholder.com/150";

    try {
      // STEP 5: Create book object
      const bookData = {
        title,
        author,
        category,
        rating,
        zone,
        coverUrl: downloadURL,
        addedAt: new Date().toISOString()
      };

      // STEP 6: Save to Firebase Realtime Database
      const newBookRef = firebase.database().ref("books").push();
      await newBookRef.set(bookData);

      alert("✅ Book added successfully!");
      form.reset();
    } catch (error) {
      console.error("Error adding book:", error);
      alert("❌ Failed to add book: " + error.message);
    }
  });
});
