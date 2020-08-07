class Book {
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList (book)
  {
    const list = document.getElementById('book-list');

    //create tr element
    const row = document.createElement('tr');

    //insert columns
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">x<a></td>
    `;

    list.appendChild(row);
  }
  showAlert(msg, className)
  {
    //create a div
    const div = document.createElement('div');
    //Add class
    div.className = `alert ${className}`;
    //Add text
    div.appendChild(document.createTextNode(msg));

    //Get parent
    const container = document.querySelector('.container');

    const form = document.querySelector('#book-form');

    //Insert alert
    container.insertBefore(div, form);

    //Timeout after 2 secs
    setTimeout(function () {
      document.querySelector('.alert').remove()
    }, 2000);
  }
  deleteBook(target)
  {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }
  clearFields()
  {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

//Local Storage Class
class Store
{
  static getBooks()
  {
    let books;
    if (localStorage.getItem('books') === null)
    {
      books = [];
    }
    else 
    {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static disaplayBooks()
  {
    const books = Store.getBooks();
    
    books.forEach(function(book){
      const ui = new UI;

      //Add book to UI
      ui.addBookToList(book);
    })
  }

  static addBook(book)
  {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn)
  {
    const books = Store.getBooks();

    books.forEach(function (book, index){
      if (book.isbn === isbn)
      {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// DOM Even Loader
document.addEventListener('DOMContentLoaded', Store.disaplayBooks);

// Event Listener to add book
document.getElementById('book-form').addEventListener('submit', function (e) {
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  //Initialize book
  const book = new Book(title, author, isbn);

  //Initialize UI
  const ui = new UI();

  console.log(ui);

  //Validate Entered Values
  if (title === '' || author === '', isbn === '') {
    //error alert
    ui.showAlert('Please Fill all fields', 'error')
  }
  else {
    //Add book to list
    ui.addBookToList(book);
    
    //Add to Local Storage
    Store.addBook(book);

    //Success alert
    ui.showAlert('Book Added Successfully', 'success');

    //Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

//Event Listener for delete
document.getElementById('book-list').addEventListener('click', function (e) {

  //Initialize UI
  const ui = new UI();

  ui.deleteBook(e.target);

  //Remove from Local Storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  //Show delete alert
  ui.showAlert('Book Removed', 'success');

  e.preventDefault();
});