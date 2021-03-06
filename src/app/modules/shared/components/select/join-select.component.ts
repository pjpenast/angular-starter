import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const INPUT_SELECT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
};

export interface OptionsInput {
    value: string,
    name: string
}

@Component({
    selector: 'join-select',
    templateUrl: 'join-select.component.html',
    providers: [INPUT_SELECT_CONTROL_VALUE_ACCESSOR]
})
export class SelectComponent implements ControlValueAccessor {

    @Input('options') options: Array<OptionsInput>;
    private innerValue:Array<string> = [];
    private propagateChange = (_: any) => {};

    constructor() {
    }
    writeValue(value: Array<string>) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn: any) {
    }
    checkValue(value) {
        let index = this.innerValue.indexOf(value);

        if (index < 0) {
            return false;
        } else {
            return true
        }

    }

    updateValue(value) {

        let index = this.innerValue.indexOf(value);

        if (index < 0) {
            this.innerValue.push(value);
        } else {
            this.innerValue.splice(index, 1);
        }

        this.propagateChange(this.innerValue);
    }
}
