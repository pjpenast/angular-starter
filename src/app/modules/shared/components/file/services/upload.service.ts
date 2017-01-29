import { Injectable } from '@angular/core';

@Injectable()
export class UploadService {
    private API_URL: string;

    constructor() {
        this.API_URL = 'http://localhost:5000/upload';

    }
    public upload(file:File): Promise<any> {
        return new Promise((resolve, reject) => {
            let xhr:XMLHttpRequest = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }  ;

            xhr.open('POST', this.API_URL, true);

            let formData = new FormData();
            formData.append('file', file, file.name);
            xhr.send(formData);
        });
    }
}
