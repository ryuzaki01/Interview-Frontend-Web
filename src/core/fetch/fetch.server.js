import Promise from 'bluebird';
import http from 'http';
import https from 'https';
import config from 'config';
import fetch, {
  Headers,
  Request,
  Response,
  FetchError
} from 'node-fetch';
import { parse as parseURL } from 'url';

fetch.Promise = Promise;

let pool = {};

const localUrl = (url) => {
  if (url.startsWith('//')) {
    return `https:${url}`
  }

  if (url.startsWith('http')) {
    return url
  }

  return `${CONFIG.Hostname}`
};

const getAgent = (url) => {
  const URI = parseURL(url);
  const poolKey = `${URI.protocol}:${URI.host}`;
  const pooledAgent = pool[poolKey];

  if (pooledAgent) {
    return pooledAgent;
  }

  const proto = (/^https/.test(url) ? https : http);
  const agent = proto.Agent({
    keepAlive: true,
    keepAliveMsecs: 10 * 1000,
    maxSockets: config.MAX_REQUEST_SOCKET
  });

  pool[poolKey] = agent;

  return agent;
};

const localFetch = (url, options) => {
  return fetch(localUrl(url), {
    timeout: config.API_TIMEOUT,
    compress: true,
    agent: getAgent(url),
    ...options
  });
};

export {localFetch as default, Request, Headers, Response, FetchError}