import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Book } from '../shared/book';

@Component({
  selector: 'br-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  bookForm: FormGroup;

  @Output()
  createBook = new EventEmitter<Book>();

  submitForm() {
    this.createBook.emit({
      ...this.bookForm.value,
      rating: 1
    });
    this.bookForm.reset();
  }

  isInvalid(name: string) {
    const control = this.bookForm.get(name);
    return !control ? true : control.invalid && control.dirty;
  }

  hasError(name: string, errorCode: string) {
    const control = this.bookForm.get(name);
    return !control ? true : control.hasError(errorCode) && control.dirty;
  }

  ngOnInit() {
    this.bookForm = new FormGroup({
      isbn: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      title: new FormControl('', Validators.required),
      description: new FormControl('')
    });
  }

}
