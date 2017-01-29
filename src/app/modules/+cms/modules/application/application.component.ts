import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ApplicationService } from './services/application.service';
import { Application } from './services/application.interface';

@Component({
  selector: 'cms-application',
  templateUrl: 'application.component.html'
})
export class ApplicationComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private apps: any = [];
  constructor(
    private service: ApplicationService
  ) { }

  ngOnInit(): void {
    this.subscription = this.service.getApps().subscribe(
      res => {
        this.apps = res;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
