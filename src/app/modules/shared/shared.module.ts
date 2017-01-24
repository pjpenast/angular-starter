import { NgModule } from '@angular/core';
import { TRANSLATION_PROVIDERS, TranslateService, TranslatePipe } from '../../services/translate';

@NgModule({
    imports: [

    ],
    declarations: [
        TranslatePipe
    ],
    providers: [
        TRANSLATION_PROVIDERS,
        TranslateService
    ],
    exports: [
        TranslatePipe
    ]
})
export class SharedModule {

}