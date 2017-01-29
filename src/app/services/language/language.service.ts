import { Injectable, Inject } from '@angular/core';
import { Angular2Apollo } from 'angular2-apollo';
import { ApolloQueryResult } from 'apollo-client';
import { Observable } from 'rxjs'

import languageQuery from './language.query.gql';

@Injectable()
export class LanguageService {

    constructor(private service: Angular2Apollo) {

    }
    getLanguages(): Observable<any> {
        return this.service.query({
            query: languageQuery
        })
        .map(this.formatLanguages)
    }
    formatLanguages(response): Array<any> {

        const { data } = response;

        let languages = data['translations'];
        let array = [];

        for (let i = 0; i < languages.length; i++) {
            array.push({
                value: languages[i],
                name: languages[i]
            });
        }       
        return array

    }


}
