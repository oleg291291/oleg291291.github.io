import { Component, Output, EventEmitter } from '@angular/core';
// import { Phone } from './phone.interface';
// import { phonesData } from './phones.const';
import { User } from '../shared/app.models';
import { usersConst } from '../shared/app.const';
// import { MoreThan25Pipe } from '../shared/moreThan25.pipe';
import { ProfileService } from '../shared/profile.service';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  users: User[] = usersConst;
  filterString = '';

  constructor(private profileService: ProfileService) { }

  // @Output() selectUser = new EventEmitter();

  //   onSelect(user): void {
  //     // this.selectUser.emit(user);
  //     this.profileService.setCurrentUser(user);

  //  }
  // setDefaultUser() {
  // this.profileService.setCurrentUser(this.defaultUser);
  // }
  onSelect(user: User): void {
    // send message to subscribers via observable subject
    this.profileService.setCurrentUser(user);
  }



  filterCheck(event): void {
    console.log(event);
    console.log(this.filterString);
    this.filterString = event.target.value;
  }

}
