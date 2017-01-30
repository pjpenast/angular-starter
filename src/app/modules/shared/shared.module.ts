import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { TranslatePipe } from '../../services/translate';

import { AlertComponent, CheckboxComponent, InputComponent, LayoutComponent, InputFileComponent, SelectComponent, ItemComponent, ToggleComponent } from './components';

const EXPORTS_DECLARATIONS = [
  AlertComponent,
  CheckboxComponent,
  LayoutComponent,
  InputComponent,
  SelectComponent,
  InputFileComponent,
  ItemComponent,
  ToggleComponent,
  TranslatePipe  
];

const EXPORTS_IMPORTS = [
  CommonModule
]

@NgModule({
  imports: [
    ...EXPORTS_IMPORTS,
    RouterModule,
    FormsModule,
    DropdownModule.forRoot()
  ],
  declarations: [
    ...EXPORTS_DECLARATIONS
  ],
  exports: [
    ...EXPORTS_IMPORTS,
    ...EXPORTS_DECLARATIONS,
    DropdownModule
  ]
})
export class SharedModule {

}