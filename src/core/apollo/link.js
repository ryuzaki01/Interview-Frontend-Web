import fetch from 'isomorphic-fetch';
import { ApolloLink } from 'apollo-link';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { RetryLink } from 'apollo-link-retry';
import { onError } from 'apollo-link-error';

export default function createLink({ uri = '', headers = {}, debug }) {
  const retryLink = new RetryLink({
    delay: {
      initial: 300,
      max: Infinity,
      jitter: true
    },
    attempts: {
      max: 1,
      retryIf: (error, _operation) => !!error
    }
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
      );
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });

  const consoleLink = new ApolloLink((operation, forward) => {
    operation.setContext({ start: new Date() });
    console.groupCollapsed(`Starting request for ${operation.operationName}`);
    console.log(operation);
    console.log('variables', operation.variables);
    console.groupEnd();

    return forward(operation).map(data => {
      const time = new Date() - operation.getContext().start;

      console.groupCollapsed(`End request for ${operation.operationName} in ${time}ms`);
      console.log(`data`, data);
      console.groupEnd();

      return data;
    });
  });

  const requestLink = new BatchHttpLink({
    fetch,
    uri,
    headers,
    credentials: 'include',
    fetchOptions: {
      redirect: 'manual'
    }
  });

  const links = [retryLink, debug ? errorLink : null, debug ? consoleLink : null, requestLink].filter(l => l);

  return ApolloLink.from(links);
}
