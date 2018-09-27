import { Component } from '@angular/core';
import { RecordsService } from '../shared/records.service';

@Component({
    selector: 'records-form',
    templateUrl: 'records-form.component.html',
})
export class RecordsFormComponent {
    title: string;
    
    constructor(private recordsService: RecordsService){
    }

    onSubmit() {
        this.recordsService.createRecord(this.title);
    }
}