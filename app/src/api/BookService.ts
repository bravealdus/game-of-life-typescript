
import * as $ from 'jquery';

export let BookService = {

    getBooks: () => {
        return $.ajax({
            url: '/fixture/books.json'
        });
    }

}
