
import { BookService } from './api/BookService';
import { BookController } from './book/BookController';

window.onload = () => {
    console.log('Init App');

    let bookService = new BookService('/fixture/books.json');
    let bookController = new BookController();

    bookService.getBooks().then(res => {
        res.map(function(book: any) {
            bookController.createBook(book, false);
        });
    });

    document.getElementById('addButton').onclick = () =>{
      bookController.createBook({
        id: Math.floor((Math.random() * 100) + 1),
        name: 'No name',
        price: 0
      }, true);
    }

}
