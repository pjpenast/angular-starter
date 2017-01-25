import { ErrorHandler, NgModule } from '@angular/core';
import { ExceptionService } from './exception.service';

@NgModule({
  providers: [
    {
      provide: ErrorHandler,
      useClass: ExceptionService
    }
  ]
})
export class ExceptionModule {}
