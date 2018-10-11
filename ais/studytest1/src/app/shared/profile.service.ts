import { Injectable } from '@angular/core';
import { User } from './app.models';
import { usersConst } from '../shared/app.const';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  //   currentUser = usersConst[0];
  //   users = usersConst;


  // constructor() {
  //   this.setCurrentUser(this.users[0]);
  // }
  // getSelectedUser() {
  //   return this.currentUser;
  // }
  // setCurrentUser(user) {
  //   this.currentUser = user;
  //   console.log(this.currentUser);
  // }

  private subject = new Subject<any>();
  usersData = usersConst;
  constructor() {
    // this.subject.next(usersConst[0]);
    console.log(this.usersData[0]);
    console.log(this.subject);
    this.setCurrentUser(this.usersData[0]);
  }

  setCurrentUser(user: User) {
    this.subject.next(user);
  }

  // clearMessage() {
  //   this.subject.next();
  // }

  getCurrentUser(): Observable<any> {
    return this.subject.asObservable();
  }

}
