console.log("✅ book-assign.js loaded");

// Elements
const tagUidEl = document.getElementById("tagUid");
const bookInfoEl = document.getElementById("bookInfo");
const assignSection = document.getElementById("assignSection");
const bookSelect = document.getElementById("bookSelect");
const msg = document.getElementById("msg");
const simulateBtn = document.getElementById("simulateBtn");

let currentUid = "";

// ---- DEMO MODE: Simulate a scanned tag ----
simulateBtn.addEventListener("click", () => {
  // Generate a fake UID
  const fakeUid = "TAG" + Math.floor(Math.random() * 10000);
  currentUid = fakeUid;

  // Show tag
  tagUidEl.textContent = fakeUid;
  msg.textContent = "";
  bookInfoEl.innerHTML = "<p>No book assigned to this tag (demo).</p>";

  // Show dropdown with books
  showBookOptions();
});

// ---- Load books from Firebase into dropdown ----
async function showBookOptions() {
  assignSection.classList.remove("hidden");

  const booksSnap = await db.ref("books").once("value");
  console.log("📚 Books from Firebase:", booksSnap.val());

  bookSelect.innerHTML = "";
  booksSnap.forEach(child => {
    const option = document.createElement("option");
    option.value = child.key;
    option.textContent = `${child.val().title} (${child.key})`;
    bookSelect.appendChild(option);
  });

  if (!bookSelect.options.length) {
    const opt = document.createElement("option");
    opt.textContent = "⚠ No books available in Firebase";
    bookSelect.appendChild(opt);
  }
}

// ---- Fake Assign (just UI, no DB write) ----
document.getElementById("assignBtn").addEventListener("click", () => {
  if (!currentUid || !bookSelect.value) return;

  const selectedText = bookSelect.options[bookSelect.selectedIndex].textContent;

  msg.textContent = `✅ [Demo] Tag ${currentUid} assigned to ${selectedText}`;
  msg.className = "message success";

  assignSection.classList.add("hidden");
});
