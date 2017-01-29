import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'join-layout',
    templateUrl: 'join-layout.component.html',
    styleUrls: ['join-layout.component.scss']
})

export class LayoutComponent {
    @Input() title: string;
    @Input() icon: string;
    @Input() breadcrumbs: any;


    constructor(
        private router: Router
    ) {}
    link() {
        this.router.navigate([this.router.url])
    }
    showIcon() {
        return 'fa-'+this.icon;
    }
}