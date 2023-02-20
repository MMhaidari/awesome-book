/* eslint-disable no-restricted-globals */
/* eslint-disable no-use-before-define */
function Books(id, title, author) {
  this.id = id;
  this.title = title;
  this.author = author;
}

const bookList = [];
const bookContainer = document.querySelector('.new-book-container');
const addbookBtn = document.getElementById('add-book');
const getBooks = JSON.parse(localStorage.getItem('books'));

let id = 0;

addbookBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const bookTitle = document.querySelector('#book-title').value;
  const bookAuthor = document.querySelector('#book-author').value;
  const book = new Books(id += 1, bookTitle, bookAuthor);
  bookList.push(book);
  localStorage.setItem('books', JSON.stringify(bookList));
  createNewBook(book);
});

function createNewBook(item) {
  const newbookContainer = document.createElement('div');
  newbookContainer.setAttribute('id', item.id);
  const bookTitle = document.createElement('p');
  bookTitle.innerText = item.title;
  const bookAuthor = document.createElement('p');
  bookAuthor.innerText = item.author;
  const removeBtn = document.createElement('button');
  removeBtn.setAttribute('class', 'removeBtn');
  removeBtn.setAttribute('id', item.id);
  removeBtn.innerText = 'Remove';
  newbookContainer.append(bookTitle, bookAuthor, removeBtn);
  bookContainer.appendChild(newbookContainer);
  removeBook();
}

const booksList = () => {
  if (getBooks !== null) {
    getBooks.forEach((ele) => {
      createNewBook(ele);
    });
  }
};

booksList();
