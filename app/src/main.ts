
import { BookService } from './api/BookService';
import { BookController } from './book/BookController';
import { Book } from './book/BookModel';

window.onload = () => {
    console.log('Init App');

    let bookService = new BookService('/fixture/books.json');

    bookService.getBooks().then(res => {
        res.map(function(book: Book) {
            new BookController(book, false);
        });
    });

    document.getElementById('addButton').onclick = () => {
        let book = {
            id: `${Math.floor((Math.random() * 100) + 1)}-book`,
            name: 'Book name',
            price: 0.00,
            obj: function() { return this; }
        };
        new BookController(<Book>book.obj(), true);
    }

}
