import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

export default function createApolloClient({ options = {}, link, initialState }) {
  if (!link) {
    throw Error('Please pass a network interface to be used on apollo client');
  }

  const cache = new InMemoryCache({
    dataIdFromObject: result =>
      // you might see o => o.id commonly with Apollo.
      // If the IDs are only unique per type (this is typical if an ID is just an
      // ID out of a database table), you can use the `__typename` field to scope it.
      // This is a GraphQL field that's automatically available, but you do need
      // to query for it also. @SEE: http://dev.apollodata.com/angular2/cache-updates.html#dataIdFromObject
      // eslint-disable-next-line no-underscore-dangle
      result.id && result.__typename ? `${result.__typename}${result.id}` : null,
    addTypename: false,
  });

  return new ApolloClient({
    link,
    cache: initialState ? cache.restore(initialState) : cache,
    ...options,
  });
}
