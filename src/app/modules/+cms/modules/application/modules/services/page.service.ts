import { Injectable } from '@angular/core';
import { Angular2Apollo, ApolloQueryObservable } from 'angular2-apollo';
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

const queryPage = gql`
    query getPage($id: ID!) {
        page(id: $id) {
            ...pageInfo
        }
    }
    ${fragments['page']}
`;

const mutationSavePage = gql`
    mutation savePage($page: PageInput!) {
        addPage(page: $page) {
            ...pageInfo
        }
    }
    ${fragments['page']}
`;

const mutationDeletePage = gql`
    mutation deletePage($id: ID!) {
        deletePage(id: $id) {
            status
        }
    }
`

@Injectable()
export class PageService {
    constructor(
        private client: Angular2Apollo
    ) {

    }
    public getPages(appId: string): any {
        return this.client.watchQuery({
            query: queryPages,
            variables: {
                app: appId
            },
            forceFetch: true
        })
            .map(response => {
                const { data } = response;

                return data['pages']
            })
    }

    public getPage(id: string): Promise<any> {

        let promise = this.client.query({
            query: queryPage,
            forceFetch: true,
            variables: {
                id: id
            }
        }).toPromise();

        return new Promise((resolve, reject) => {
            promise
                .then(response => {
                    const { data } = response;
                    resolve(data['page']);
                })

        })
    }

    public savePage(page: Page, appId: string): Promise<any> {

        let promise = this.client.mutate({
            mutation: mutationSavePage,
            variables: {
                page: page
            }
        }).toPromise();

        return new Promise((resolve, reject) => {
            promise
                .then(response => {
                    const { data } = response;
                    resolve(response);
                })
                .catch(error => {
                    throw new Error(error);
                })
        });

    }

    public deletePage(id: string, app: string): Promise<any> {

        let promise = this.client.mutate({
            mutation: mutationDeletePage,
            variables: {
                id: id
            }
        }).toPromise();

        return new Promise((resolve, reject) => {
            promise
                .then(response => {
                    const { data } = response;
                    resolve(response);
                })
                .catch(error => {
                    throw new Error(error);
                })

        })

    }


}