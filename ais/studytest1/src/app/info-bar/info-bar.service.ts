import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Info } from './info-bar.interface';

@Injectable()
export class InfoBarService {

    constructor(private http: HttpClient) { }

    getInfo(): Observable<any> {
        return this.http.get('https://jsonplaceholder.typicode.com/todos/1');
    }

}
