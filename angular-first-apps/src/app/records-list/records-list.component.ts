import { Component, OnInit } from '@angular/core';

import { Record } from '../shared/record';

import { RecordsService } from '../shared/records.service';

@Component({
    selector: 'records-list',
    templateUrl: 'records-list.component.html',
})
export class RecordsListComponent implements OnInit {

    filterString: string;

    records: Record[];

    constructor(private recordsService: RecordsService) {
        this.filterString = ''
        this.records = this.recordsService.getRecordsStatic();
    }

    ngOnInit() {
        this.records = this.recordsService.getRecordsStatic();
    }

    toggle(record: Record) {
        this.recordsService.toggleRecord(record);

    }

    delete(record: Record) {
        this.recordsService.deleteRecord(record);

    }

    changeFilter(value) {
        this.filterString = value;
    }

}