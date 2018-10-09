import { Component, Output, EventEmitter } from '@angular/core';
import { Phone } from './phone.interface';
import { phonesData } from './phones.const';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  phones: Phone[] = phonesData;

  constructor() { }
  
  @Output() selectPhone = new EventEmitter();

  onSelect(phone, event) {
    console.log(phone, event);
    this.selectPhone.emit(phone);
  }



}
