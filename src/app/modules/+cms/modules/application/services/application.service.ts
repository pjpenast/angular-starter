import { Injectable } from '@angular/core';
import { Angular2Apollo } from 'angular2-apollo';
import { ApolloQueryResult, ApolloError } from 'apollo-client';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';

import { Application } from './application.interface';

/// Querys, Mutations and Fragments
import ApplicationFragment from './application.fragment.gql';
import ImageFragment from './image.fragment.gql';
import ApplicationQuery from './application.query.gql';
import ApplicationDeleteMutation from './applicationDelete.mutation.gql';

const fragments = {
    apps: ApplicationFragment,
    images: ImageFragment
}

const queryApps = gql`
    query {
        apps {
            ...appInfo
        }
    }
    ${fragments['apps']}
    ${fragments['images']}
`;

const queryApp = gql`
    query getApp($id: ID!) {
        app(id: $id) {
            ...appInfo
        }
    }
    ${fragments['apps']}
    ${fragments['images']}
`

const mutatioSaveApps = gql`
    mutation saveApp($app: AppInput!) {
        addApp(app: $app) {
            ...appInfo
        }
    }
    ${fragments['apps']}
    ${fragments['images']}
`;

@Injectable()
export class ApplicationService {

    private _app: Application;


    constructor(
        private client: Angular2Apollo
    ) { }

    get app(): Application {
        return this._app;
    }
    set app(app:Application) {
        this._app = app;

    }

    getApps(): any {
        return this.client.watchQuery({
            query: queryApps,
            forceFetch: true
        })
            .map(response => {
                const { data } = response;
                return data['apps'];
            })
    }

    getApp(id: string): Promise<any> {

        let promise = this.client.query({
            query: queryApp,
            forceFetch: true,
            variables: {
                id: id
            }
        }).toPromise();

        return new Promise((resolve, reject) => {
            promise
                .then(response => {
                    const { data } = response;

                    this._app = data['app'];

                    resolve(data['app']);
                })

        })
    }

    saveApp(app: Application): Observable<ApolloQueryResult<any>> {
        return this.client.mutate({
            mutation: mutatioSaveApps,
            variables: {
                app: app
            }
        })
            .do(response => {
                const { data } = response;
                return response;
            })
            .catch(this.handleError)
    }

    deleteApp(id: string): Promise<ApolloQueryResult<any>> {

        let promise = this.client.mutate({
            mutation: ApplicationDeleteMutation,
            variables: {
                id: id
            }
        }).toPromise();

        return new Promise((resolve, reject) => {
            promise
                .then((result) => {
                    const { data } = result;
                    this.getApps().refetch();
                    resolve(data);
                })
        })

    }

    private handleError(error: ApolloError) {
        return Observable.throw(error.message.replace('GraphQL error: ', ''))
    }

}