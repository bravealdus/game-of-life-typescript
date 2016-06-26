
import * as $ from 'jquery';

export class BookService {

    baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    getBooks() {
        return $.ajax({
            url: '/fixture/books.json'
        });
    }
}
