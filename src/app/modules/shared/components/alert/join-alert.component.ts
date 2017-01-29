import { Component, Input } from '@angular/core';

@Component({
    selector: 'join-alert',
    templateUrl: 'join-alert.component.html',
    styleUrls: ['join-alert.component.scss']
})
export class AlertComponent {
    @Input() icon: string;
    @Input() mode: string;
    @Input() message: string;
    @Input() show: boolean;

    constructor() {

    }
    getIcon() {
        return 'fa-'+this.icon;
    }
    getMode() {
        return 'alert-'+this.mode;
    }
    closeHandler() {
        this.show = false;
    }
}