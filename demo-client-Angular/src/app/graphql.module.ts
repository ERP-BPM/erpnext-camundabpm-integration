import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';
import { environment } from 'src/environments/environment';

const uri = environment.gql;
const key = environment.gqlkey;

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {


  const auth = setContext((operation, context) => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        'x-hasura-access-key': key
      }
    };
  });

  const link = ApolloLink.from([auth, httpLink.create({ uri })]);
  // const cache = new InMemoryCache();

  return {
    link, // httpLink.create({uri}),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {
}
