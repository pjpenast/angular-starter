import { Component, Input, forwardRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


export const INPUT_CUSTOM_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
};

@Component({
    selector: 'join-input',
    templateUrl: 'join-input.component.html',
    styleUrls: ['join-input.component.scss'],
    providers: [INPUT_CUSTOM_CONTROL_VALUE_ACCESSOR]
})
export class InputComponent implements ControlValueAccessor {
    @Input('icon') icon: string;
    @Input('label') label: string;
    @Input('placeholder') placeholder: string;
    @Input('type') type: string;
    @Input('name') name: string;
    @Input('error') error: boolean;
    @Input('errormessage') errorMessage: string;
    private input: FormControl;
    private _innerValue: any;
    private propagateChange = (_: any) => {};

    constructor() {
    }
    get value () {
        return this._innerValue;
    }

    set value (val) {
        this._innerValue = val;
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
    getIcon() {
        return 'fa' + this.icon;
    }
}
