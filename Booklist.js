// Book Class : Represents a Book
class Book
{
    constructor(_title, _author, _isbn)
    {
        this.title = _title;
        this.author = _author;
        this.isbn = _isbn;
    }
}
//UI class :Handle UI Tasks
class UI{
    static displayBooks() {
        const books = Storebook.getBooks();   
        books.forEach((book) => UI.addBookFn(book));
    }
    static addBookFn(book){
        const tbl = document.getElementsByTagName('table')[0];
        const row = document.createElement('tr');
        row.innerHTML = '<td>'+book.title+'</td><td>'
            +book.author+'</td><td>'+book.isbn+
            '</td ><td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>';
        tbl.appendChild(row);
    }
    static showAlert(massage, className) {
        const div = document.createElement('div');
        div.className = 'alert alert-'+className;
        div.appendChild(document.createTextNode(massage));
        const container = document.querySelector('.container');
        const form = document.getElementById('formid');
        container.insertBefore(div, form);
        //Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
    static clearinput() {
        document.getElementById('titleid').value = '';
        document.getElementById('authorid').value = '';
        document.getElementById('isbnid').value = '';
    }
    static removeElement(e) {
        if (e.classList.contains('delete')) {
            e.parentElement.parentElement.remove();
            UI.showAlert('Book Removed Successfully', 'success');
        }
    }

}
//Store Class :Handles Storage
class Storebook {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book) {
        const books = Storebook.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn) {
        const books = Storebook.getBooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}
//Event :Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);


//Event :Add Book
document.addEventListener('submit', (e) => {
    
    const title = document.getElementById('titleid').value;
    const author = document.getElementById('authorid').value;
    const isbn = document.getElementById('isbnid').value;
    
    if (title === '' || author === '' || isbn === '') {
        if (title === '') {
            document.getElementById('titleid').style.borderColor = 'red';
        }
        if (author === '') {
            document.getElementById('authorid').style.borderColor = 'red';
        }
        if (isbn === '') {
            document.getElementById('isbnid').style.borderColor = 'red';
        }

        UI.showAlert('please fill in all fields', 'danger');
    }
    else
    {
        document.getElementById('titleid').removeAttribute("style");
        document.getElementById('authorid').removeAttribute("style");
        document.getElementById('isbnid').removeAttribute("style");
        const newBook = new Book(title, author, isbn); 

        //Add Book to UI
        UI.addBookFn(newBook);
        //Add Book to local Storage
        Storebook.addBook(newBook);
        //show success massage
        UI.showAlert('Book Added Successfully', 'success');
        //Clear fields
        UI.clearinput();
    }
});
//Event :Remove a Book from UI
document.getElementById('formid').addEventListener('click', (e) => {
    UI.removeElement(e.target);
    //Event :Remove a Book from Local storage
    //console.log(e.target.parentElement.previousElementSibling.textContent);
    Storebook.removeBook(e.target.parentElement.previousElementSibling.textContent);
});

