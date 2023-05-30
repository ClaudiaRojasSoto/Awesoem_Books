class Book {
    constructor(id, title, author) {
        this.author = author;
        this.title = title;
        this.id = id;
    }
}

class BookList {
    constructor() {
        this.bookList = document.getElementById("book-list");
        this.inputTitle = document.getElementById("title");
        this.inputAuthor = document.getElementById("author");
        this.inputButton = document.getElementById("add-button");
        this.books = JSON.parse(localStorage.getItem("book")) || [];

        this.inputButton.addEventListener("click", (event) => this.addBooks(event));
        this.displayBooks();
    }

    addBooks(event) {
        event.preventDefault();
        const title = this.inputTitle.value;
        const author = this.inputAuthor.value;
        if (title !== "" && author !== "") {
            const book = new Book(Date.now(), title, author);
            this.books = [book, ...this.books];
            localStorage.setItem("book", JSON.stringify(this.books));
        }
        this.displayBooks();
        this.inputAuthor.value = "";
        this.inputTitle.value = "";
    }

    displayBooks() {
        this.bookList.innerHTML = "";
        const list = document.createElement("ul");

        for (let i = 0; i < this.books.length; i += 1) {
            const book = this.books[i];

            const listItem = document.createElement("li");

            const booksInfo = document.createElement("span");
            booksInfo.textContent = `${book.title} by ${book.author}`;

            listItem.appendChild(booksInfo);
            const removeButoon = document.createElement("button");
            removeButoon.id = `remove-button-${this.books[i].id}`;

            removeButoon.textContent = "remove";
            removeButoon.setAttribute("data-index", i);

            listItem.appendChild(removeButoon);
            list.appendChild(listItem);

            //  "title" by "aruthor"
            // const listItemTitle = document.createElement("p");
            // listItemTitle.textContent = this.books[i].title;

            // this.bookList.appendChild(listItemTitle);
            // const listItemAuthor = document.createElement("p");

            // listItemAuthor.textContent = this.books[i].author;
            // this.bookList.appendChild(listItemAuthor);

            // this.bookList.appendChild(removeButoon);
            // const line = document.createElement("hr");
        }
        this.bookList.appendChild(list);
        this.attachRemoveButtonListeners();
    }

    attachRemoveButtonListeners() {
        const removeButtons = document.querySelectorAll("button[id^='remove-button-']");
        removeButtons.forEach((button) => {
            button.addEventListener("click", this.removeBook.bind(this));
        });
    }

    removeBook(event) {
        const bookIndex = event.target.dataset.index;
        this.books.splice(bookIndex, 1);
        localStorage.setItem("book", JSON.stringify(this.books));
        this.displayBooks();
    }
}

const bookList = new BookList();
