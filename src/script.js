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

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    // eslint-disable-next-line no-param-reassign
    input.value = "";
  });

  console.log(title, author, pages, summary);

  modal.style.display = "none";
});
