import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './app-header/app-header.component';
import { InfoBarComponent } from './info-bar/info-bar.component';
import { InfoBarService } from './info-bar/info-bar.service';
import { ModalComponent } from './modal/modal.component';
import { TableModule } from './table/table.module';
import { MoreThan25Pipe } from './shared/moreThan25.pipe';
import { appRoutes } from './router/router.const';
import { ReactFormComponent } from './react-form/react-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InfoBarComponent,
    ReactFormComponent,
    ModalComponent,
    MoreThan25Pipe,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    TableModule,
  ],
  providers: [InfoBarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
