import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable()
export class ChatService {

    chatItems: Observable<any[]>;

    constructor(private afs: AngularFirestore) {
        this.chatItems = afs.collection('chat').valueChanges()
    }

    sendMsg(userName, userMsg) {
        this.afs.collection('chat')
            .doc(Date.now().toString())
            .set({ name: userName, msg: userMsg })
    }
    scrollToBottom(chatList) {
        chatList.nativeElement.scrollTop = chatList.nativeElement.scrollHeight;
    }


}
