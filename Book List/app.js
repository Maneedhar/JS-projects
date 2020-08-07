//Book Constructor - create a book
function Book(title, author, isbn)
{
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Constructor - methods to  add, delete the book 

function UI() { }

UI.prototype.addBookToList = function(book){
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

//Error Alert
UI.prototype.showAlert = function(msg, className)
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

  //Timeout after 3 secs
  setTimeout(function(){
    document.querySelector('.alert').remove()
  }, 2000);
}

//Delete Book
UI.prototype.deleteBook = function(target){
  if(target.className === 'delete')
  {
    target.parentElement.parentElement.remove();
  }
}

//Clear Fields
UI.prototype.clearFields= function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// Event Listener to add book
document.getElementById('book-form').addEventListener('submit', function(e){
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  //Initialize book
  const book = new Book(title, author, isbn);

  //Initialize UI
  const ui = new UI();

  //Validate Entered Values
  if(title === '' || author === '', isbn === '')
{
  //error alert
  ui.showAlert('Please Fill all fields', 'error')
}
else 
{
  //Add book to list
  ui.addBookToList(book);

  //Success alert
  ui.showAlert('Book Added Successfully', 'success');

  //Clear fields
  ui.clearFields();
}

  e.preventDefault();
});

//Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
  
  //Initialize UI
  const ui = new UI();
  
  ui.deleteBook(e.target);

  //Show delete alert
  ui.showAlert('Book Removed', 'success');

  e.preventDefault();
});
