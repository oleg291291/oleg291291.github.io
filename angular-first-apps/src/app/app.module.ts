import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppComponent } from './app.component';

import { RecordsFormComponent } from './records-form/records-form.component';
import { RecordsSearchComponent } from './records-search/records-search.component';
import { RecordsListComponent } from './records-list/records-list.component';
import { RecordsItemComponent } from './records-item/records-item.component';
import { BooksComponent } from './books/books.component';
import { ChatComponent } from './chat/chat.component';
import { TimerComponent } from './timer/timer.component';

import { RecordsService } from './shared/records.service';
import { BooksService } from './shared/books.service';
import { ChatService } from './shared/chat.service';
import { TimerService } from './timer/timer.service';

import { MyFilterPipe } from './shared/search.pipe';

import { CardHighlightDirective } from './shared/card-highlight.directive';

import { RouterModule, Routes } from '@angular/router';


import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';

import { timerStore } from './timer/timer.reducer';

const appRoutes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: 'recordsFromStatic', component: RecordsListComponent },
  { path: 'booksFromServer', component: BooksComponent },
  { path: 'timer', component: TimerComponent },
  { path: '', redirectTo: '/recordsFromStatic', pathMatch: 'full' },
];


const firebaseConfig = {
  apiKey: "AIzaSyDaaOPsbnsXw_vDvkinliw2AYAKmLtbf4A",
  authDomain: "angular-freestyle-app.firebaseapp.com",
  databaseURL: "https://angular-freestyle-app.firebaseio.com",
  projectId: "angular-freestyle-app",
  storageBucket: "angular-freestyle-app.appspot.com",
  messagingSenderId: "1058360591913"
};


@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    StoreModule.forRoot({ timerStore }),

  ],
  declarations: [
    AppComponent,
    RecordsFormComponent,
    RecordsSearchComponent,
    RecordsListComponent,
    RecordsItemComponent,
    BooksComponent,
    MyFilterPipe,
    ChatComponent,
    TimerComponent,
    CardHighlightDirective
  ],
  providers: [RecordsService, ChatService, BooksService, TimerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
