import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'join-item',
    templateUrl: 'join-item.component.html',
    styleUrls: ['join-item.component.scss']
})
export class ItemComponent {
    @Input('image') image: string;
    @Input('title') title: string;
    @Output() link = new EventEmitter();

    constructor() {
    }
    linkHandler() {
        this.link.emit();
    }
}
