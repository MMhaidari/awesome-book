/* eslint-disable no-use-before-define */
class Books {
  constructor() {
    this.bookList = [];
  }
  
  static fetchBooks() {
    const getBooks = localStorage.getItem('books');
    return getBooks ? JSON.parse(getBooks) : [];
  }

  static updateBooks(books) {
    localStorage.setItem('books', JSON.stringify(books));
  }

  static getBooksList() {
    if (Books.fetchBooks()) {
      this.bookList = Books.fetchBooks();
    }
  }

  addBook(book) {
    this.bookList = Books.fetchBooks();
    this.bookList.push(book);
    Books.updateBooks(this.bookList);
  }

  remove(e) {
    const id = parseInt(e.target.id, 10);
    this.bookList = Books.fetchBooks();
    this.bookList = this.bookList.filter((item) => item.id !== id);
    e.target.parentElement.remove();
    Books.updateBooks(this.bookList);
  }
}

const addbookBtn = document.getElementById('add-book');

addbookBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const bookTitle = document.querySelector('#book-title').value;
  const bookAuthor = document.querySelector('#book-author').value;
  Books.bookList = Books.fetchBooks() ? Books.fetchBooks() : [];
  let id = 0;
  if (Books.bookList && Books.bookList.length > 0) {
    id = Books.bookList[Books.bookList.length - 1].id + 1;
  }

  if (bookTitle && bookAuthor) {
    const book = { id: id += 1, title: bookTitle, author: bookAuthor };
    const bookObject = new Books();
    bookObject.addBook(book);
    createNewBook(book);
    clearValue();
  }
});

const clearValue = () => {
  const bookTitle = document.querySelector('#book-title');
  const bookAuthor = document.querySelector('#book-author');
  bookTitle.value = '';
  bookAuthor.value = '';
};

function createNewBook(book) {
  const bookContainer = document.querySelector('.book-container');
  const newBookContainer = document.createElement('div');
  newBookContainer.setAttribute('class', 'new-book-container');
  newBookContainer.setAttribute('id', book.id);
  const bookDetails = document.createElement('div');
  bookDetails.setAttribute('class', 'book-details');
  bookDetails.innerText = `"${book.title}" by ${book.author}`;
  const removeBtn = document.createElement('button');
  removeBtn.setAttribute('class', 'removeBtn');
  removeBtn.setAttribute('id', book.id);
  removeBtn.innerText = 'Remove';

  newBookContainer.append(bookDetails, removeBtn);
  bookContainer.appendChild(newBookContainer);
  const removeBtns = document.querySelectorAll('.removeBtn');
  removeBtns.forEach((elem) => {
    elem.addEventListener('click', (event) => {
      const bookObject = new Books();
      bookObject.remove(event);
    });
  });
}

const displayBooks = () => {
  Books.getBooksList();
  if (Books.bookList) {
    Books.bookList.forEach((book) => {
      createNewBook(book);
    });
  }
};

displayBooks();
