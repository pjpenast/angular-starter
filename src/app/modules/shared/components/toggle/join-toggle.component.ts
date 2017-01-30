import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const TOGGLE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ToggleComponent),
  multi: true
};

@Component({
  selector: 'join-toggle',
  templateUrl: 'join-toggle.component.html',
  styleUrls: ['join-toggle.component.scss'],
  providers: [ TOGGLE_CONTROL_VALUE_ACCESSOR ]
})
export class ToggleComponent implements ControlValueAccessor {
  @Input() name: string;

  private _innerValue: any;
  private propagateChange = (_: any) => { };

  get value() {
    return this._innerValue;
  }

  set value(val) {
    this._innerValue = val;
    console.log(this._innerValue);
    this.propagateChange(this._innerValue);
  }

  writeValue(value: any) {
    if (value !== this.value) {
      this.value = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {
  }

  toggleCheck() {
    this.value = !this.value;
  }

}