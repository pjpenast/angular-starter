import { Component, Input, ElementRef, ViewChild, Renderer, forwardRef } from '@angular/core';
import { UploadService } from './services';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


export const INPUT_FILE_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputFileComponent),
    multi: true
};

@Component({
    selector: 'join-input-file',
    templateUrl: 'join-input-file.component.html',
    styleUrls: ['join-input-file.component.scss'],
    providers: [INPUT_FILE_CONTROL_VALUE_ACCESSOR, UploadService ]
})

export class InputFileComponent implements ControlValueAccessor {
    @Input('message') message: string;
    @Input('name') name: string;
    @Input('maxSize') maxSize: number;
    @Input('placeholder') placeholder: string;
    @Input() formats: Array<string>;
    @Input('image') image: String;
    @ViewChild('fileInput') fileInput:ElementRef;
    @Input() _innerValue: any = '';
    private fileName: String = null;
    private propagateChange = (_: any) => {};

    get innerValue() {
        return this._innerValue;
    }

    set innerValue(val) {
        this._innerValue = val;
        this.propagateChange(this._innerValue);
    }

    constructor(private renderer:Renderer, private service: UploadService) {

    }
    writeValue(value: any) {
        if (value) {
            this.fileName = value;
        }

        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn: any) {
    }
    uploadHandler() {
        let event = new MouseEvent('click', {bubbles: true});
        this.renderer.invokeElementMethod(this.fileInput.nativeElement, 'dispatchEvent', [event]);
    }
    changeFile(e) {
        let f = e.target.files[0];
        if (!f) {
           return false;
       }

       if (this.checkSupport(f)) {
           this.uploadImage((e.srcElement || e.target).files[0]);
       }

    }
    private checkSupport(f) {
        let array = [];

        for (var i = 0; i < this.formats.length; i++) {
            if (!f.type.match('image/' + this.formats[i] + '*')) {
                array.push(1);
            } else {
                array.push(0);
            }
        }
        if (array.indexOf(0) === -1) {
            return false;
        } else {
            return true;
        }
    }
    private uploadImage(file) {

        let reader = new FileReader();

        this.service.upload(file)
            .then((response) => {
                console.log(response);
                this.innerValue = response.data.file;
            })

        reader.onload = (onLoadEvent:any) => {
            if (file.size > this.maxSize) {
                return false;
            }

            this.image = onLoadEvent.target.result;
            this.fileName = file.name;
        };

        reader.readAsDataURL(file);
    }


}
