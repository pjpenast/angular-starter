import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const INPUT_CHECK_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxComponent),
  multi: true
};

@Component({
  selector: 'join-checkbox',
  templateUrl: 'join-checkbox.component.html',
  styleUrls: ['join-checkbox.component.scss'],
  providers: [INPUT_CHECK_CONTROL_VALUE_ACCESSOR]
})
export class CheckboxComponent implements ControlValueAccessor {
  private _innerValue: any;
  private propagateChange = (_: any) => { };
  constructor() {
  }

  get innerValue() {
    return this._innerValue;
  }

  set innerValue(val) {
    this._innerValue = val;
    this.propagateChange(this._innerValue);
  }
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }
  registerOnChange(fn) {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any) {
  }
  toggleCheck() {
    console.log(this.innerValue);
    this.innerValue = !this.innerValue;
    console.log(this.innerValue);
  }
}
