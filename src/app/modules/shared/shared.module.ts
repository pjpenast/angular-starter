import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TRANSLATION_PROVIDERS, TranslateService, TranslatePipe } from '../../services/translate';

import { AlertComponent, InputComponent } from './components';

const EXPORTS_DECLARATIONS = [
  AlertComponent,
  InputComponent,
  TranslatePipe,
];

const EXPORTS_IMPORTS = [
  CommonModule
]

@NgModule({
  imports: [
    ...EXPORTS_IMPORTS
  ],
  declarations: [
    ...EXPORTS_DECLARATIONS
  ],
  providers: [
    TRANSLATION_PROVIDERS,
    TranslateService
  ],
  exports: [
    ...EXPORTS_IMPORTS,
    ...EXPORTS_DECLARATIONS
  ]
})
export class SharedModule {

}
