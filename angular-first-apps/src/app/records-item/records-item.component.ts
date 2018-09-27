import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Record } from '../shared/record';

import { CardHighlightDirective } from '../shared/card-highlight.directive'



@Component({
    selector: 'records-item',
    templateUrl: 'records-item.component.html',
    styleUrls: ['records-item.component.sass']
})
export class RecordsItemComponent {

    cardHighLightColor: string = 'lightgreen';
    
    @Input() record: Record
    @Output() delete = new EventEmitter();
    @Output() toggle = new EventEmitter();
    onToggle(){
        this.toggle.emit(this.record);
    }
    onDelete(){
        this.delete.emit(this.record);
    }
}