import url from 'url';
import config from 'config';
import { createApolloClient, createApolloLink } from '../core/apollo';
import { i18n, sanitizeLang } from '../core/lang';

export default function initMiddleware(req, res, next) {
  const isDev = process.env.NODE_ENV !== 'production';
  const lang = sanitizeLang(req.headers.lang || req.cookies.lang);
  const URL = url.parse(config.GQL_HOST);
  const Host = URL.host;
  const TOKEN = req.cookies.session_access_token;

  const apolloClient = createApolloClient({
    options: {
      ssrMode: true,
    },
    link: createApolloLink({
      uri: config.GQL_HOST,
      debug: isDev,
      headers: {
        origin: config.Hostname,
        ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
        ...req.headers,
        Host,
      },
    }),
  });

  res.locals = {
    apolloClient,
    data: {
      app: {
        lang,
        query: req.query,
        pathname: req.path,
        params: req.params,
        userAgent: req.headers['user-agent'],
        isMobile: req.useragent.isMobile,
        originalUrl: req.referrer,
      },
    },
  };

  global.i18n = i18n(lang);

  return next();
}
