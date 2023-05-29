let bookList = document.getElementById('book-list');
let inputTitle = document.getElementById('title');
let inputAuthor = document.getElementById('author');
let inputButton = document.getElementById('add-button');

let books =[];

function addBooks (event){

 event.preventDefault();
 const title = inputTitle.value;
 const author = inputAuthor.value;
 if (title !== '' && author !== ''){
    const book = {title, author};
    books.unshift(book);
    localStorage.setItem('book', JSON.stringify(books));
 }
}

inputButton.addEventListener('click', addBooks);