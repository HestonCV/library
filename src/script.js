/* eslint-disable max-classes-per-file */
/* eslint-disable  no-underscore-dangle */

class Book {
  constructor(title, author, pages, summary, read, card) {
    this.title = title;
    this.author = author;
    this.pages = parseInt(pages, 10);
    this.summary = summary;
    this.read = read === "on";
    this.card = card;
  }
}

class UIController {
  constructor(library) {
    this.Library = library;
    this.container = document.getElementById("books-container");
    this.initEventListeners();
  }

  initEventListeners() {
    // clear library button
    const clearLibraryButton = document.getElementById("clear-library");
    clearLibraryButton.addEventListener("click", () => {
      this.Library.clearLibrary();
    });

    // add book button and modal
    const addBookButton = document.getElementById("add-book");
    const addBookModal = document.querySelector(".add-book-modal");
    addBookButton.addEventListener("click", () => {
      addBookModal.style.display = "flex";
    });
    addBookModal.addEventListener("click", (e) => {
      if (e.target === addBookModal) {
        addBookModal.style.display = "none";
      }
    });
    const closeModalButton = document.getElementById("close-modal");
    closeModalButton.addEventListener("click", () => {
      addBookModal.style.display = "none";
    });

    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.processFormInfo();
      form.reset();
      addBookModal.style.display = "none";
    });
  }

  processFormInfo() {
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const pages = document.getElementById("pages");
    const summary = document.getElementById("summary");
    const read = document.getElementById("read");

    this.Library.addBook(
      title.value,
      author.value,
      pages.value,
      summary.value,
      read.value
    );
  }

  updateTotalPagesDisplay() {}

  updateTotalBooksDisplay() {}

  updatePercentBooksReadDisplay() {}

  updatePercentPagesReadDisplay() {}

  updateSideBar() {}

  addCard(info) {
    // returns a new created element for manipulating DOM
    function createElement(element, className, textContent) {
      const newElement = document.createElement(element);
      if (className) newElement.classList.add(className);
      newElement.textContent = textContent;
      return newElement;
    }

    // appends a list of elements to a parent
    function appendElementsToCard(elements, parent) {
      for (let i = 0; i < elements.length; i += 1) {
        parent.appendChild(elements[i]);
      }
    }

    // create card
    const bookCard = createElement("div", "large-book", "");

    // create delete button and add event listener
    const deleteButton = createElement("button", "delete-book", "-");
    deleteButton.addEventListener("click", (e) => {
      // get the parent of the clicked button and remove the card
      const card = e.target.parentNode;
      UIController.removeCard(card);
      this.Library.removeBook(card);
    });

    const title = createElement("p", "title", info.title);
    const author = createElement("p", "author", `By ${info.author}`);
    const pages = createElement("p", "pages", `Page Count: ${info.pages}`);
    const summaryHeader = createElement("p", "summary-title", "Summary");
    const summary = createElement("p", "summary", info.summary);

    appendElementsToCard(
      [deleteButton, title, author, pages, summaryHeader, summary],
      bookCard
    );

    // append card to card container
    this.container.appendChild(bookCard);

    return bookCard;
  }

  static removeCard(bookCard) {
    bookCard.remove();
  }
}

class Library {
  constructor() {
    this.books = [];
    this.totalPages = 0;
    this.UIController = new UIController(this);
  } // end constructor

  addBook(title, author, pages, summary, read) {
    // create new book
    const info = { title, author, pages, summary, read };
    const newBook = new Book(
      title,
      author,
      pages,
      summary,
      read,
      this.UIController.addCard(info)
    );

    // update total pages
    this.totalPages += parseInt(newBook.pages, 10);

    // add new book to books
    this.books.push(newBook);
  } // end addBook

  removeBook(bookCard) {
    for (let i = 0; i < this.books.length; i += 1) {
      if (this.books[i].card === bookCard) {
        // subtract pages from total
        this.totalPages -= this.books[i].pages;

        // remove book from books
        this.books.splice(i, 1);
      }
    }
  } // end removeBook

  clearLibrary() {
    // copy this.books so that the for loop is not
    // out of order as it deletes the books
    const tempBooks = this.books.map((book) => book);
    for (let i = 0; i < tempBooks.length; i += 1) {
      this.removeBook(tempBooks[i].card);
      UIController.removeCard(tempBooks[i].card);
    }
  }
}

const library = new Library();

library.addBook(
  "The Hobbit",
  "JRR Tolkien",
  "304",
  `"The Hobbit" is a timeless
fantasy novel by J.R.R. Tolkien. It follows the adventure of Bilbo Baggins,
a humble and unassuming hobbit, who is unexpectedly swept into an epic quest
by the wizard Gandalf and a group of dwarves. Their mission: to reclaim a lost
dwarf kingdom and its treasure from the fearsome dragon Smaug. Along the journey,
Bilbo encounters many trials and creatures of Middle-Earth, and discovers his own
unexpected bravery and cunning. It's a story of adventure, friendship, and
personal growth in a world filled with magic and mystery.`,
  true
);

library.addBook(
  "The Hobbit",
  "JRR Tolkien",
  "304",
  `"The Hobbit" is a timeless
fantasy novel by J.R.R. Tolkien. It follows the adventure of Bilbo Baggins,
a humble and unassuming hobbit, who is unexpectedly swept into an epic quest
by the wizard Gandalf and a group of dwarves. Their mission: to reclaim a lost
dwarf kingdom and its treasure from the fearsome dragon Smaug. Along the journey,
Bilbo encounters many trials and creatures of Middle-Earth, and discovers his own
unexpected bravery and cunning. It's a story of adventure, friendship, and
personal growth in a world filled with magic and mystery.`,
  true
);
