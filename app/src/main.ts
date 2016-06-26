
import { BookService } from './api/BookService';
import { BookController } from './book/BookController';

window.onload = () => {
    console.log('Init App');

    BookService.getBooks().then(res => {
        res.map(function(book: any) {
            BookController.createBook(book, false);
        });
    });

    document.getElementById('addButton').onclick = () =>{
      BookController.createBook({
        id: Math.floor((Math.random() * 100) + 1),
        name: 'No name',
        price: 0
      }, true);
    }

}
