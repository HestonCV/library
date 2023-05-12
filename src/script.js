const books = [];

function updateSideBar() {
  const totalBooksDisplay = document.getElementById("total-books");
  const totalPagesDisplay = document.getElementById("total-pages");
  /*  const percentBooksReadDisplay = document.getElementById("percent-books-read");
  const percentPagesReadDisplay = document.getElementById("percent-pages-read");
 */
  // update total books
  const totalBooks = books.length;
  totalBooksDisplay.textContent = `Total Books: ${totalBooks}`;

  // update total
  const totalPages = books.reduce(
    (sum, book) => sum + parseInt(book.pages, 10),
    0
  );
  totalPagesDisplay.textContent = `Total Pages: ${totalPages}`;
}

function deleteBookCard(id) {
  const deleteButton = document.getElementById(`${id}`);
  deleteButton.parentNode.remove();
  for (let i = 0; i < books.length; i += 1) {
    if (books[i].id === parseInt(id, 10)) {
      books.splice(i, 1);
      return;
    }
  }
}

function addBookCard(book) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("large-book");

  // add delete button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-book");
  deleteButton.id = book.id;
  const deleteButtonSpan = document.createElement("span");
  deleteButtonSpan.textContent = "-";
  deleteButton.appendChild(deleteButtonSpan);
  bookCard.appendChild(deleteButton);
  deleteButton.addEventListener("click", () => {
    deleteBookCard(deleteButton.id);
    updateSideBar();
  });

  // add title info
  const title = document.createElement("p");
  title.classList.add("title");
  title.textContent = book.title;
  bookCard.appendChild(title);

  // add author info
  const author = document.createElement("p");
  author.classList.add("author");
  author.textContent = `By ${book.author}`;
  bookCard.appendChild(author);

  // add pages info
  const pages = document.createElement("p");
  pages.classList.add("pages");
  pages.textContent = `Page Count: ${book.pages}`;
  bookCard.appendChild(pages);

  // add summary header
  const summaryHeader = document.createElement("p");
  summaryHeader.classList.add("summary-title");
  summaryHeader.textContent = "Summary";
  bookCard.appendChild(summaryHeader);

  // add summary info
  const summary = document.createElement("p");
  summary.classList.add("summary");
  summary.textContent = book.summary;
  bookCard.appendChild(summary);

  const booksContainer = document.getElementById("books-container");
  booksContainer.appendChild(bookCard);
}

function Book(id, title, author, pages, summary, read = false) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.summary = summary;
  this.read = read;
}

Book.prototype.addBook = function () {
  books.push(this);
  addBookCard(this);
  updateSideBar();
};

const modal = document.querySelector(".add-book-modal");
modal.addEventListener("click", () => {
  modal.style.display = "none";
});

const bookInfo = document.querySelector(".book-info");
bookInfo.addEventListener("click", (e) => {
  e.stopPropagation();
});

const clearLibraryButton = document.querySelector("#clear-library");

const addBookButton = document.querySelector("#add-book");
addBookButton.addEventListener("click", () => {
  modal.style.display = "block";
});

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const summary = document.getElementById("summary").value;
  let read = document.getElementById("read").value;
  read = read === "on";
  let id = books.length;
  // eslint-disable-next-line no-loop-func
  while (books.some((book) => book.id === id)) {
    id += 1;
  }

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    // eslint-disable-next-line no-param-reassign
    input.value = "";
  });
  modal.style.display = "none";
  console.log(id, title, author, pages, summary, read);
  const book = new Book(id, title, author, pages, summary, read);
  book.addBook();
});

function addPlaceholderBook() {
  const hobbit = new Book(
    0,
    "The Hobbit",
    "J.R.R Tolkien",
    "304",
    `'The Hobbit' is a timeless fantasy novel by J.R.R. Tolkien. It
    follows the adventure of Bilbo Baggins, a humble and unassuming
    hobbit, who is unexpectedly swept into an epic quest by the wizard
    Gandalf and a group of dwarves. Their mission: to reclaim a lost
    dwarf kingdom and its treasure from the fearsome dragon Smaug.
    Along the journey, Bilbo encounters many trials and creatures of
    Middle-Earth, and discovers his own unexpected bravery and
    cunning. It's a story of adventure, friendship, and personal
    growth in a world filled with magic and mystery.`,
    true
  );
  hobbit.addBook();
}

addPlaceholderBook();
