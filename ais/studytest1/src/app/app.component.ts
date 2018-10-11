import { Component } from '@angular/core';
import { usersConst } from './shared/app.const';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  users = usersConst;

  selectedUser = usersConst[0];
  isModalOpened = false;
  // selectedPhone;

  constructor() { }

  // onSelectChange(event): void {
  //   usersConst.find(item => {
  //     if (item.userName === event.target.value) {
  //       this.selectedUser = item;
  //       return true;
  //     }
  //   });
  // }

  openModal(id: string): void {
    this.isModalOpened = true;
  }

  closeModal(): void {
    this.isModalOpened = false;
  }

  selectUser(user): void {
    this.selectedUser = user;
  }

}
