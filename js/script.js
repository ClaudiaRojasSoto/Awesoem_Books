import Book from './book.js';

class BookList {
  constructor() {
    this.bookList = document.getElementById('book-list');
    this.inputTitle = document.getElementById('title');
    this.inputAuthor = document.getElementById('author');
    this.inputButton = document.getElementById('add-button');
    this.listButton = document.getElementById('contact-section');
    this.newButton = document.getElementById('form-section');
    this.books = JSON.parse(localStorage.getItem('book')) || [];
    this.inputButton.addEventListener('click', (event) => this.addBooks(event));
    this.displayBooks();

    this.listLink = document.getElementById('list');
    this.addLink = document.getElementById('new');
    this.contactLink = document.getElementById('contact');

    this.listLink.addEventListener('click', () => this.showSection('div-list'));
    this.addLink.addEventListener('click', () => this.showSection('form-section'));
    this.contactLink.addEventListener('click', () => this.showSection('contact-section'));

    this.displayDate();
  }

  addBooks(event) {
    event.preventDefault();
    const title = this.inputTitle.value;
    const author = this.inputAuthor.value;
    if (title !== '' && author !== '') {
      const book = new Book(Date.now(), title, author);
      this.books = [book, ...this.books];
      localStorage.setItem('book', JSON.stringify(this.books));
    }
    this.displayBooks();
    this.inputAuthor.value = '';
    this.inputTitle.value = '';
  }

  showSection = (sectionId) => {
    const sections = document.getElementsByClassName('list-section');

    for (let i = 0; i < sections.length; i += 1) {
      const content = sections[i];
      if (content.id === sectionId) {
        content.classList.remove('hidden');
      } else {
        content.classList.add('hidden');
      }
    }
  }

  displayDate = () => {
    const dateElement = document.getElementById('date');

    const updateTime = () => {
      const today = new Date();
      const options = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      };
      const format = today.toLocaleTimeString('en-US', options);

      dateElement.textContent = format;
    };
    updateTime();
    setInterval(updateTime, 1000);
  }

  displayBooks() {
    this.bookList.innerHTML = '';
    const list = document.createElement('ul');
    list.classList.add('list-container');

    for (let i = 0; i < this.books.length; i += 1) {
      const book = this.books[i];

      const listItem = document.createElement('li');

      const booksInfo = document.createElement('span');
      booksInfo.textContent = `${book.title} by ${book.author}`;
      listItem.classList.add(i % 2 === 0 ? 'even' : 'odd');
      listItem.appendChild(booksInfo);
      const removeButoon = document.createElement('button');
      removeButoon.id = `remove-button-${this.books[i].id}`;

      removeButoon.textContent = 'remove';
      removeButoon.setAttribute('data-index', i);

      listItem.appendChild(removeButoon);
      list.appendChild(listItem);
    }
    this.bookList.appendChild(list);
    this.attachRemoveButtonListeners();
  }

  attachRemoveButtonListeners() {
    const removeButtons = document.querySelectorAll("button[id^='remove-button-']");
    removeButtons.forEach((button) => {
      button.addEventListener('click', this.removeBook.bind(this));
    });
  }

  removeBook(event) {
    const bookIndex = event.target.dataset.index;
    this.books.splice(bookIndex, 1);
    localStorage.setItem('book', JSON.stringify(this.books));
    this.displayBooks();
  }
}

const bookList = new BookList();
bookList.displayBooks();
