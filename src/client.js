/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */

import 'whatwg-fetch';
import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as HotEnabler } from 'react-hot-loader';
import { ApolloProvider } from '@apollo/react-hooks';
import { loadableReady } from '@loadable/component';
import moment from 'moment';
import { ErrorBoundary } from '@tiket-com/react-ui';

import { i18n } from './core/lang';
import { createApolloClient, createApolloLink } from './core/apollo';
import cookie from './helpers/cookie';

import App from './App';

const isDev = process.env.NODE_ENV !== 'production';

const MOUNT_NODE = document.getElementById('app');

const {
  lang = cookie.get('userlang'),
  app
} = window.__data;
const { isMobile } = app || {};
const TOKEN = cookie.get('session_access_token');

const apolloClient = createApolloClient({
  ssrMode: true,
  options: {
    connectToDevTools: isDev,
    queryDeduplication: false,
  },
  link: createApolloLink({
    uri: CONFIG.GQLHost,
    debug: isDev,
    headers: {
      ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
    }
  }),
  ssrForceFetchDelay: 100,
  initialState: window.__cache,
});

const render = (TheApp) => {
  moment.locale(lang);

  global.CONFIG = window.CONFIG;
  global.i18n = i18n(lang);
  global.isMobile = isMobile;
  global.isDesktop = !isMobile;

  loadableReady(() => {
    ReactDOM.hydrate(
      <HotEnabler>
        <ApolloProvider client={apolloClient}>
          <ErrorBoundary>
            <TheApp />
          </ErrorBoundary>
        </ApolloProvider>
      </HotEnabler>,
      MOUNT_NODE);
  });
};

render(App);

if (module.hot) {
  // Accept changes to this file for hot reloading.
  module.hot.accept('./client.js');
  module.hot.accept('./routes', () => {
    return true;
  });
  module.hot.accept('./App', () => {
    render(require('./App').default);
  });
}
