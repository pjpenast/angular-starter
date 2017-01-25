import { ErrorHandler } from '@angular/core';

export class ExceptionService implements ErrorHandler {
  handleError(error: any): void {
    console.log('ERROR');
    console.log(error);
  }
}

