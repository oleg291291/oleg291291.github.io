import { Component } from '@angular/core';

import { BooksService } from '../shared/books.service';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { CardHighlightDirective } from '../shared/card-highlight.directive'


@Component({
    selector: 'books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.sass']
})

export class BooksComponent {

    cardHighLightColor: string = 'lightgreen';

    books: Observable<any[]>;

    newBook: {} = { author: '', title: '' };

    constructor(private afs: AngularFirestore, private booksService: BooksService) {
        this.books = afs.collection('books').valueChanges();
    }

    delete(book) {
        this.booksService.delete(book);
    }
    toggle(book) {
        this.booksService.toggle(book);
    }
    addBook() {
        this.booksService.addBook(this.newBook)
    }

}