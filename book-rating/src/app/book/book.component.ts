import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';

@Component({
  selector: 'br-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent {

  @Input()
  book: Book;

  @Output()
  rate = new EventEmitter<Book>();

  constructor(private bookRatingService: BookRatingService) {
  }

  rateUp() {
    const ratedBook = this.bookRatingService.rateUp(this.book);
    this.rate.emit(ratedBook);
  }

  rateDown() {
    const ratedBook = this.bookRatingService.rateDown(this.book);
    this.rate.emit(ratedBook);
  }
}
