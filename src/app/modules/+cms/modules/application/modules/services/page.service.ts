import { Injectable } from '@angular/core';
import { Angular2Apollo } from 'angular2-apollo';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

import { Page } from './page.interface';

/// Fragments, Query and Mutations
import pageFragment from './page.fragment.gql';

const fragments = {
    page: pageFragment
}

const queryPages = gql`
    query getPages($app: ID!) {
        pages(app: $app) {
            ...pageInfo
        }
    }
    ${fragments['page']}
`;

@Injectable()
export class PageService {
    constructor(
        private client: Angular2Apollo
    ) {

    }
    public getPages(appId: string): Observable<any> {
        return this.client.watchQuery({
            query: queryPages,
            variables: {
                app: appId
            },
            forceFetch: true
        })
    }


}