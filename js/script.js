let bookList = document.getElementById('book-list');
let inputTitle = document.getElementById('title');
let inputAuthor = document.getElementById('author');
let inputButton = document.getElementById('add-button');
let removeButoon = document.getElementById('remove-Button');

let books = JSON.parse(localStorage.getItem('book')) || [];


function addBooks (event){

 event.preventDefault();
 const title = inputTitle.value;
 const author = inputAuthor.value;
 if (title !== '' && author !== ''){
    const book = {title, author};
    books.unshift(book);
    localStorage.setItem('book', JSON.stringify(books));
 }
 displayBooks();
}
inputButton.addEventListener('click', addBooks);

function displayBooks(){
   bookList.innerHTML = '';
   for(let i = 0; i <books.length; i += 1){
      const listItemTitle = document.createElement('p');
      listItemTitle.textContent = books[i].title;
      bookList.appendChild(listItemTitle);
      const listItemAuthor = document.createElement('p');
      listItemAuthor.textContent = books[i].author;
      bookList.appendChild(listItemAuthor);
      const removeButoon = document.createElement('button');
      removeButoon.id = [i];
      removeButoon.textContent = 'remove';
      // removeButoon.setAttribute('data-index', i);
      bookList.appendChild(removeButoon);     
   }
}
displayBooks();

function removeBook(event) {
   books.splice(index, 1);
  
   displayBooks();
 }
 removeButoon.addEventListener('click', removeBook);