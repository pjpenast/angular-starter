import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Page } from '../../services/page.interface';
import { PageService } from '../../services/page.service';

@Component({
    selector: 'page-item',
    templateUrl: 'pageItem.component.html',
    styleUrls: ['pageItem.component.scss']
})

export class PageItemComponent {
    @Input() page: Page;
    @Output() deletePage = new EventEmitter();

    constructor(private service: PageService) {
    }
    deleteHandler() {
        this.deletePage.emit(this.page);
    }


}
