import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { HighlightDirective } from './highlight.directive';
import { SearchFilterPipe } from '../shared/search-filter.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TableComponent, HighlightDirective, SearchFilterPipe],
  exports: [TableComponent]
})
export class TableModule { }
