import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable()
export class BooksService {

    items: Observable<any[]>;

    constructor(private afs: AngularFirestore) {
        this.items = afs.collection('books').valueChanges();
    }

    delete(record) {
        this.afs.collection('books').doc(`${record.author} - ${record.title}`).delete();
    }
    toggle(record) {
        this.afs.collection('books').doc(`${record.author} - ${record.title}`).set({
            ...record,
            favorite: !record.favorite
        })
    }
    addBook(record) {
        this.afs.collection('books').doc(`${record.author} - ${record.title}`).set(record)
    }


}
