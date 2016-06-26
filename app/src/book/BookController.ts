
export class BookController {

    bookTemplate(book: any) {
        return `
            <img src="/images/book.png" alt="" />
            <textarea id="${book.id}-name" class="name" disabled>${book.name}</textarea>
            <label for="price">USD</label>
            <input id="${book.id}-price" class="price" name="price"
            type="text" value="${book.price}" disabled="disabled">
            <br><hr>`;
    }

    enableEdit(id: string) {
        let name = (<HTMLTextAreaElement>document.getElementById(`${id}-name`));
        name.disabled = !name.disabled;

        let price = (<HTMLTextAreaElement>document.getElementById(`${id}-price`));
        price.disabled = !price.disabled;

        let edit = (<HTMLTextAreaElement>document.getElementById(`${id}-edit`));
        if (!name.disabled) {
          name.focus();
          edit.textContent = 'Save';
        }else{
          edit.textContent = 'Edit';
        }
    }

    createBook(book: any, focus: boolean) {
        let elem = document.createElement('div');
        elem.className = 'book';
        elem.id = book.id;
        elem.innerHTML = this.bookTemplate(book);

        let edit = document.createElement('div');
        edit.className = 'edit';
        edit.id = book.id + '-edit';
        edit.textContent = 'Edit';
        edit.onclick = () => {
            this.enableEdit(book.id);
        };
        elem.appendChild(edit);

        let remove = document.createElement('div');
        remove.className = 'remove';
        remove.textContent = 'Remove';
        remove.onclick = () => {
            let child = document.getElementById(book.id);
            document.getElementById('books').removeChild(child);
        };
        elem.appendChild(remove);

        document.getElementById('books').appendChild(elem);

        if(focus) this.enableEdit(book.id);
    }

}
