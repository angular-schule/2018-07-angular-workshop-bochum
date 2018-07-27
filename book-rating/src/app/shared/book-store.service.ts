import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Book } from './book';
import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  constructor(private http: HttpClient) { }

  get(isbn: string): Observable<Book> {
    return this.http
      .get<Book>('https://api.angular.schule/book/' + isbn);
  }

  getAll(): Observable<Book[]> {

    return this.http
      .get<Book[]>('https://api.angular.schule/books')
      .pipe(

        map(books => [...books, {
          isbn: '000',
          title: 'Aufkleber',
          description: '',
          rating: 0
        }]),

        retry(3),

        catchError((err: HttpErrorResponse)  => {
          console.log('Ich reagiere auf den Fehler');
          return of([
            {
              isbn: '000',
              title: 'Keine Bücher da!',
              description: 'Da hat was nicht geklappt, hier ein Dummy Buch - ' + err.status,
              rating: 1
            }
          ]);
        })

      );
  }
}
