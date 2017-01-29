import { TranslateService } from './services/translate';
import { Component } from '@angular/core';


import '../assets/sass/general.scss';

@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private _translate: TranslateService
  ) {
    this._translate.use('es');
  }
}
