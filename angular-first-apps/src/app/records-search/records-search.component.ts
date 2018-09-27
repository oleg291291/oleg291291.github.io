import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'records-search',
    templateUrl: 'records-search.component.html'
})
export class RecordsSearchComponent {
    searchString: string;

    constructor() {}

    @Output() changeFilter = new EventEmitter();
    onChangeFilter() {
        this.changeFilter.emit(this.searchString);
    }

}