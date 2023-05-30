class Books {
  constructor(author,title, id) {
    this.author = author;
    this.title = title;
    this.id = id;
    this.bookList = document.getElementById('book-list');
    this.inputTitle = document.getElementById('title');
    this.inputAuthor = document.getElementById('author');
    this.inputButton = document.getElementById('add-button');
    this.inputButton.addEventListener('click', this.addBooks);    
    this.books = JSON.parse(localStorage.getItem('book')) || []; 
  }
  addBooks(event) {
    event.preventDefault();
    const title = this.inputTitle.value;
    const author = this.inputAuthor.value;
    if (title !== '' && author !== '') {
      const book = { id: Date.now(), title, author };
      this.books = [book, ...books];
      localStorage.setItem('book', JSON.stringify(books));
    }
    this.displayBooks();
    this.inputAuthor.value = '';
    this.inputTitle.value = '';
  }
  
  displayBooks() {
    bookList.innerHTML = '';
    for (let i = 0; i < this.books.length; i += 1) {
      const listItemTitle = document.createElement('p');
      listItemTitle.textContent = this.books[i].title;
      this.bookList.appendChild(listItemTitle);
      const listItemAuthor = document.createElement('p');
      listItemAuthor.textContent = this.books[i].author;
      this.bookList.appendChild(listItemAuthor);
      const removeButoon = document.createElement('button');
      removeButoon.id = `remove-button-${this.books[i].id}`;
      removeButoon.textContent = 'remove';
      removeButoon.setAttribute('data-index', i);
      this.bookList.appendChild(removeButoon);
      const line = document.createElement('hr');
      this.bookList.appendChild(line);
    }  
    this.attachRemoveButtonListeners();
  }

    attachRemoveButtonListeners() {
      const removeButtons = this.document.querySelectorAll("button[id^='remove-button-']");
      removeButtons.forEach((button) => {
      button.addEventListener('click', this.removeBook);
    });
  }

removeBook(event) {
  const bookIndex = this.event.target.dataset.index;
  this.books.splice(bookIndex, 1);
  localStorage.setItem('book', JSON.stringify(books));
  this.displayBooks();
 }
}








