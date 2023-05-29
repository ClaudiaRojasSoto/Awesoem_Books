let bookList = document.getElementById("book-list");
let inputTitle = document.getElementById("title");
let inputAuthor = document.getElementById("author");
let inputButton = document.getElementById("add-button");
let removeButoon = document.getElementById("remove-Button");

let books = JSON.parse(localStorage.getItem("book")) || [];

function addBooks(event) {
    event.preventDefault();
    const title = inputTitle.value;
    const author = inputAuthor.value;
    if (title !== "" && author !== "") {
        const book = { title, author };
        books.unshift(book);
        localStorage.setItem("book", JSON.stringify(books));
    }
    displayBooks();
    inputAuthor.value = "";
    inputTitle.value = "";
}
inputButton.addEventListener("click", addBooks);

function displayBooks() {
    bookList.innerHTML = "";
    for (let i = 0; i < books.length; i += 1) {
        const listItemTitle = document.createElement("p");
        listItemTitle.textContent = books[i].title;
        bookList.appendChild(listItemTitle);
        const listItemAuthor = document.createElement("p");
        listItemAuthor.textContent = books[i].author;
        bookList.appendChild(listItemAuthor);
        const removeButoon = document.createElement("button");
        removeButoon.id = `remove-button-${i}`;
        removeButoon.textContent = "remove";
        removeButoon.setAttribute("data-index", i);
        bookList.appendChild(removeButoon);
        const line = document.createElement("hr");
        bookList.appendChild(line);
    }

    attachRemoveButtonListeners();
}
displayBooks();

function attachRemoveButtonListeners() {
    const removeButtons = document.querySelectorAll("button[id^='remove-button-']");
    removeButtons.forEach(function (button) {
        button.addEventListener("click", removeBook);
    });
}

function removeBook(event) {
    var bookIndex = event.target.dataset.index;
    books.splice(bookIndex, 1);
    localStorage.setItem("book", JSON.stringify(books));
    displayBooks();
}
