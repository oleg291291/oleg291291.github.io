import { database } from './database';
import { Record } from './record';
import { Injectable } from '@angular/core';


@Injectable()
export class RecordsService {
    
    records: Record[] = database

    getRecordsStatic() {

        return this.records

    }


    createRecord(title: string) {
        let record = new Record(title);
        this.records.push(record);
    }

    deleteRecord(record: Record) {
        let index = this.records.indexOf(record);
        if (index > -1) {
            this.records.splice(index, 1);
        }
    }

    toggleRecord(record: Record) {
        record.favorite = !record.favorite;
    }


}
