import { Component, ViewChild, AfterViewChecked } from '@angular/core';

import { ChatService } from '../shared/chat.service';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';


@Component({
    selector: 'chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.sass']
})

export class ChatComponent implements AfterViewChecked {

    @ViewChild('chatList') chatList;

    userName: string;
    userMsg: string;

    chatItems: Observable<any[]>;

    constructor(private afs: AngularFirestore, private chatService: ChatService) {

        this.chatItems = afs.collection('chat').valueChanges()

    }

    ngAfterViewChecked() {
        this.chatService.scrollToBottom(this.chatList);
    }

    sendMsg() {
        this.chatService.sendMsg(this.userName, this.userMsg);
        this.userMsg = '';
    }

}