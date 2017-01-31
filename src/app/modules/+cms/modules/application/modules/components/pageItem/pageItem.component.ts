import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

    constructor(
        private service: PageService,
        private router: Router,
        private currentRoute: ActivatedRoute
    ) {
    }
    deleteHandler() {
        this.service.deletePage(this.page.id, this.page.app);
        this.deletePage.emit(true);
    }

    editPage() {
        this.router.navigate(['edit', this.page.id], { relativeTo: this.currentRoute })
    }


}
