import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './app-header/app-header.component';
import { InfoBarComponent } from './info-bar/info-bar.component';
import { InfoBarService } from './info-bar/info-bar.service';
import { ModalComponent } from './modal/modal.component';
import { TableModule } from './table/table.module';
// import { TableComponent } from "src/app/table/table.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InfoBarComponent,
    ModalComponent,
    // TableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TableModule,
  ],
  providers: [InfoBarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
