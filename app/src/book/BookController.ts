
import { Book } from './BookModel';

export class BookController {

    book: Book;
    isEditActive: boolean;

    // HTML elements
    editButton: HTMLElement;
    removeButton: HTMLElement;
    nameInput: HTMLTextAreaElement;
    priceInput: HTMLTextAreaElement;

    constructor(book: Book, forceEdit: boolean) {
        this.book = book;
        this.isEditActive = false;
        this.createNewElement();

        if (forceEdit) this.toggleEdit();
    }

    bookTemplate(book: any) {
        return `
            <img src="/images/book.png" alt="" />
            <textarea id="${book.id}-name" class="name" disabled>${book.name}</textarea>
            <label for="price">USD</label>
            <input id="${book.id}-price" class="price" name="price"
            type="text" value="${book.price}" disabled="disabled">
            <br><hr>
            <div id="${book.id}-edit" class="edit">Edit</div>
            <div id="${book.id}-remove" class="remove">Remove</div>
            `;
    }

    toggleEdit() {
        this.isEditActive = !this.isEditActive;

        this.nameInput.disabled = !this.isEditActive;
        this.priceInput.disabled = !this.isEditActive;

        if (this.isEditActive) {
            this.nameInput.focus();
            this.editButton.textContent = 'Save';
        } else {
            this.editButton.textContent = 'Edit';
        }
    }

    createNewElement() {
        let elem = document.createElement('div');
        elem.className = 'book';
        elem.id = this.book.id;
        elem.innerHTML = this.bookTemplate(this.book);
        document.getElementById('books').appendChild(elem);

        this.editButton = this.getElem('edit');
        this.removeButton = this.getElem('remove');
        this.nameInput = this.getEditableElem('name');
        this.priceInput = this.getEditableElem('price');

        this.editButton.onclick = () => {
            this.toggleEdit();
        };

        this.removeButton.onclick = () => {
            let child = document.getElementById(this.book.id);
            document.getElementById('books').removeChild(child);
        };
    }

    private getEditableElem(id: string){
      return (<HTMLTextAreaElement>document.
        getElementById(`${this.book.id}-${id}`));
    }

    private getElem(id: string){
      return (<HTMLElement>document.
        getElementById(`${this.book.id}-${id}`));
    }

}
