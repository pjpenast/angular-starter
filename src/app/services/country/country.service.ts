import { Injectable } from '@angular/core';
import { Angular2Apollo, ApolloQueryObservable } from 'angular2-apollo';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';

import { TranslateService } from '../translate';


@Injectable()
export class CountryService {

    constructor(
        private service: Angular2Apollo,
        private translate: TranslateService
    ) {

    }
    getCountries(): Observable<any> {
        return this.service.query({
            query: gql`
            query GetCountries {
                countries {
                    name,
                    code,
                    translations {
                            ${this.translate.currentLang}
                    }
                }
            }
        `
        })
        .map(response => {

            let countries = response.data['countries'];

            let array = [];
            for (var i = 0; i < countries.length; i++) {
                array.push({
                    name: countries[i].translations[this.translate.currentLang],
                    code: countries[i].code
                })
            }

            return array;

        })
    }


}