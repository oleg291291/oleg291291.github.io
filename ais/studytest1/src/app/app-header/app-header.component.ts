import { Component, Input } from '@angular/core';
import { User } from '../shared/app.models';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class HeaderComponent {
  @Input() selectedUser: User;
}
