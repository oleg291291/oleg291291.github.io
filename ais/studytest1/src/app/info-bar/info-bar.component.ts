import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InfoBarService } from './info-bar.service';
import { Info } from './info-bar.interface';

@Component({
    selector: 'app-info-bar',
    templateUrl: './info-bar.component.html',
    styleUrls: ['./info-bar.component.scss']
})
export class InfoBarComponent implements OnInit {

    info: Info;
    filteredInfo;

    constructor(private http: HttpClient, private infoBarService: InfoBarService) { }
    ngOnInit(): void {
        this.infoBarService.getInfo().subscribe(
            (data: Info) => {
                this.info = data;
            },
            () => { const x = new Info(); x.title = 'error'; this.info = x; }
        );
    }

}
