import { Component, Input, OnInit } from '@angular/core';
import { User } from '../shared/app.models';
import { ProfileService } from '../shared/profile.service';
import { Observable, Subscription } from 'rxjs';
import { usersConst } from '../shared/app.const';


@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class HeaderComponent implements OnInit {

  // selectedUser;
  // @Input() selectedPhone;

  // constructor(private profileService: ProfileService) {
  //   this.selectedUser = this.profileService.getCurrentUser();
  // }

  user: User = usersConst[0];
  subscription: Subscription;

  constructor(private profileService: ProfileService) {
    // subscribe to home component users
    // this.subscription = this.profileService.getCurrentUser().subscribe(user => { this.user = user; });
  }
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
    this.subscription = this.profileService.getCurrentUser().subscribe(user => { this.user = user; });

  }
}
