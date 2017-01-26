import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Angular2Apollo } from 'angular2-apollo';
import { ApolloQueryResult, ApolloError } from 'apollo-client';
import gql from 'graphql-tag';
import { Credential, User, UserInput } from './auth.interface';
import { LocalStorage } from '../../utils';
import { Observable } from 'rxjs';

/// Queries and Mutations
import logoutMutation from './logout.mutation.gql';
import loginMutation from './login.mutation.gql';
import createUserMutation from './createUser.mutation.gql';
import checkUserQuery from './checkUser.query.gql';
import forgetPasswordMutation from './forgetPassword.mutation.gql';

const AUTH_TOKEN_KEY = 'AUTH_TOKEN';
const AUTH_USER_KEY = 'AUTH_USER';

@Injectable()
export class AuthService {
  credential: Credential;
  user: User;
  localStorage: any;

  constructor(private client: Angular2Apollo, @Inject(LocalStorage) localStorage, private router: Router) {
    this.localStorage = localStorage;
  }
  logout(): Observable<ApolloQueryResult<any>> {

    let token = this.getCredential();

    return this.client.mutate({
      mutation: logoutMutation,
      variables: {
        token: token.token
      }
    })


  }
  checkUser(): Observable<ApolloQueryResult<any>> {
    return this.client.query({
      query: checkUserQuery
    })
  }
  forgetPassword(email: string): Observable<ApolloQueryResult<any>> {
    return this.client.mutate({
      mutation: forgetPasswordMutation,
      variables: {
        email: email
      }
    })
  }

  register(user: UserInput): Observable<ApolloQueryResult<any>> {
    return this.client.mutate({
      mutation: createUserMutation,
      variables: {
        user: {
          name: user.name,
          email: user.email,
          city: user.city,
          country: user.country,
          address: user.address,
          password: user.password
        }
      }
    })
  }

  login(user: UserInput): Observable<ApolloQueryResult<any>> {
    return this.client.mutate({
      mutation: loginMutation,
      variables: {
        email: user.email,
        password: user.password
      }
    })
    .map(result => {result.data})
    .catch(this.handleError)
  }
  private handleError(error: ApolloError) {
    

    console.log(error);

    console.log(error.message)



    console.log(new ApolloError({ networkError: error }));
    return Observable.throw(error.message.replace('GraphQL error: ', ''))
  }
  private setUser(user: User) {
    this.user = user;
    this.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  }

  public getUser(): User {
    return JSON.parse(this.localStorage.getItem(AUTH_USER_KEY));
  }

  private removeUser() {
    this.localStorage.removeItem(AUTH_USER_KEY);
  }

  private setCredential(cred: Credential) {
    this.localStorage.setItem(AUTH_TOKEN_KEY, cred.token);
    this.credential = cred;
  }

  public getCredential(): Credential {
    let cred: any = {}
    cred.token = this.localStorage.getItem(AUTH_TOKEN_KEY);
    return cred;
  }

  private removeCredential() {
    this.localStorage.removeItem(AUTH_TOKEN_KEY);
  }

}
