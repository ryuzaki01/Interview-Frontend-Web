import React from 'react';
import { MockedProvider } from "@apollo/react-testing";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";
import { createApolloClient, createApolloLink } from "../core/apollo";
import { MemoryRouter } from "react-router-dom";

const mockApolloClient = createApolloClient({
  addTypename: false,
  ssrMode: true,
  options: {
    connectToDevTools: false,
    queryDeduplication: true,
  },
  link: createApolloLink({
    uri: CONFIG.GQL_HOST,
    debug: true,
    fetchOptions: {
      redirect: "manual",
    },
  }),
  initialState: window.__cache,
});

const generateWrapper = (Components, props, mocks) => {

  return (<MemoryRouter>
    <MockedProvider mocks={mocks} addTypename={false}>
      <ApolloHooksProvider client={mockApolloClient}>
        <Components {...props}/>
      </ApolloHooksProvider>
    </MockedProvider>
  </MemoryRouter>);
};

export default generateWrapper;