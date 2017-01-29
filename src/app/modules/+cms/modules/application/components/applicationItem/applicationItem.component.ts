import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Application } from '../../services/application.interface';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'application-item',
  templateUrl: 'applicationItem.component.html',
  styleUrls: ['applicationItem.component.scss']
})
export class ApplicationItemComponent {
  @Input() app: Application;
  @Output() delete: EventEmitter<boolean> = new EventEmitter(); 


  constructor(
    private service: ApplicationService, 
    private router: Router
  ) {

  }
  deleteApp($event):void {
    this.service.deleteApp(this.app.id);
    this.delete.emit(true);
    $event.stopPropagation();
  }
  editApp($event) {
    this.router.navigate(['/apps/edit/', this.app.id]);
    $event.stopPropagation();
  }
  goToPages() {
    this.router.navigate(['/apps/' + this.app.id + '/pages']);
    console.log('/apps/' + this.app.id + '/pages');
  }
  getPlatform(platform: string) {
    if (platform === 'android') {
      return 'fa-android'
    }
    else if (platform === 'ios') {
      return 'fa-apple'
    }
    else {
      return 'fa-html5'
    }
  }

}
