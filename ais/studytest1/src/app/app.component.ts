import { Component } from '@angular/core';
import { usersConst } from './shared/app.const';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'studytest1';


  users = usersConst;
  selectedUser = usersConst[0];

  onSelectChange(event): void {
    usersConst.find(item => {
      if (item.userName === event.target.value) {
        this.selectedUser = item;
        return true
      }
    })
  }
}
