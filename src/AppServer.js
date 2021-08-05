import React, { useState } from "react";
import { renderRoutes } from "react-router-config";
import { StaticRouter } from "react-router";
import { renderToNodeStream } from "react-dom/server";
import { getDataFromTree } from "@apollo/react-ssr";
import { ApolloProvider } from "@apollo/react-hooks";
import { ChunkExtractor } from "@loadable/server";
import winston from "winston";
import moment from "moment";
import { ErrorBoundary } from '@tiket-com/react-ui';

import upperHTML from "./core/html/start";
import lowerHTML from "./core/html/end";
import getStaticAsset from "./core/assets";
import { LocalDataContext } from './core/context';

import routes from "./routes";

const statsFile = getStaticAsset('./build/loadable-stats.json', true);

export default (req, res) => {
  const { data, apolloClient } = res.locals;
  const { lang = 'id', isMobile } = data || {};
  const chunkExtractor = new ChunkExtractor({ statsFile, entrypoints: ['client'] });

  moment.locale(lang);
  global.isMobile = isMobile;
  global.isDesktop = !isMobile;

  const writeLowerHtml = (preloadedState, scriptTags) => {
    res.write(lowerHTML(preloadedState, scriptTags));

    return res.end();
  };

  const hydrateOnClient = () => {
    const htmlStates = {
      initState: { ...res.locals.data },
      initCacheState: apolloClient.extract(),
    };

    const scriptTags = chunkExtractor.getScriptTags();
    const linkTags = chunkExtractor.getLinkTags();
    const styleTags = chunkExtractor.getStyleTags();

    res.type('html');
    res.write(upperHTML({ linkTags, styleTags }));

    writeLowerHtml(htmlStates, scriptTags);
  };

  const App = () => {
    const [ localData, setLocalData ] = useState(res.locals.data);

    return (
      <ApolloProvider client={apolloClient}>
        <ErrorBoundary>
          <LocalDataContext.Provider value={[localData, setLocalData]}>
            <StaticRouter location={req.url}>
              {renderRoutes(routes)}
            </StaticRouter>
          </LocalDataContext.Provider>
        </ErrorBoundary>
      </ApolloProvider>
    );
  };

  const jsx = chunkExtractor.collectChunks(<App />);

  return getDataFromTree(jsx)
    .then(() => {
      const htmlStates = {
        initState: { ...res.locals.data },
        initCacheState: apolloClient.extract(),
      };

      const scriptTags = chunkExtractor.getScriptTags();
      const linkTags = chunkExtractor.getLinkTags();
      const styleTags = chunkExtractor.getStyleTags();

      res.type('html');
      res.write(upperHTML({ linkTags, styleTags }));

      const html = renderToNodeStream(jsx);

      html.pipe(res, { end: false });
      html.on('end', () => {
        writeLowerHtml(htmlStates, scriptTags)
      });
    })
    .catch(mountError => {
      const { graphQLErrors, networkError, message } = mountError;
      const hasGraphQLErrors = graphQLErrors && graphQLErrors.length > 0;
      const hasNetworkError = networkError && networkError.response;
      const hasErrorMessage = !!message;

      winston.error('MOUNT ERROR', mountError, {
        url: req.originalUrl,
        ...( hasErrorMessage ? { errorMessage : message } : { }),
        ...( hasNetworkError ? {
          requestURL: networkError.response.url,
          status: networkError.response.statusText,
          code: networkError.statusCode,
        } : {}),
        ...(hasGraphQLErrors ? { errors : graphQLErrors } : {}),
        ...(!hasNetworkError && !hasGraphQLErrors && !hasErrorMessage ?
          { errorMessage: mountError } : {})
      });

      hydrateOnClient();
    });
}
