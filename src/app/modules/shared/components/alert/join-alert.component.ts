import { Component, Input } from '@angular/core';

@Component({
  selector: 'join-alert',
  templateUrl: 'join-alert.component.html',
  styleUrls: ['join-alert.component.scss']
})
export class AlertComponent {
  @Input() message: string = null;
}
