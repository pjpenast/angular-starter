import ApolloClient, { createNetworkInterface } from 'apollo-client';

const networkInterface = createNetworkInterface({ uri: 'http://localhost:5000/graphql' });

export function ClientGraphQL(): ApolloClient {

  networkInterface.use([{
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};  // Create the header object if needed.
      }
      
      // get the authentication token from local storage if it exists
      req.options.headers['Authorization'] = 'JWT ' + localStorage.getItem('AUTH_TOKEN') || '';
      next();
    }
  }]);

  const client: ApolloClient = new ApolloClient({
    networkInterface
  })

  return client;

}
