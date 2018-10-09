import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  constructor() { }
  @Output() closeModal = new EventEmitter();

  onClick() {
    this.closeModal.emit();
  }

}
