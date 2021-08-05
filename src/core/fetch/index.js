import URL from 'url';
import winston from 'winston';
import qs from 'querystring';
import newrelic from 'newrelic';
import { sync as uid } from 'uid-safe';

import fetch from './fetch.server';

const NS_PER_MS = 1e6;

export const normalizeUrl = uri => {
  const url = URL.parse(uri);

  if (typeof url === 'object') {
    if (typeof url.format === 'function') {
      return url.format();
    }

    return '';
  }

  return url;
};

export const formatGetURL = (url, content) => {
  return `${url}${content ? `?${qs.stringify(content)}` : ''}`;
};

const request = (context) => (url, options) => {
  let start = process.hrtime();

  newrelic.setTransactionName(url);

  const URI = normalizeUrl(url);
  const isGetMethod = options.method === 'GET';
  const isDeleteMethod = options.method === 'DELETE';

  const finalURL =
    isGetMethod || isDeleteMethod || options.queryURL ?
      formatGetURL(URI, (options.queryURL || options.data)) : URI;

  const requestId = uid(32);

  const finalOptions = {
    body,
    redirect: 'manual',
    credentials: 'include',
    ...options,
    headers: {
      'User-Agent': context.userAgent || 'tix-payment',
      Origin: CONFIG.Hostname,
      cookie: context.cookie,
      ...options.headers,
      ...(context["true-client-ip"] ? {"true-client-ip": context["true-client-ip"]} : {}),
      ...(context['x-forwarded-for'] ? {"x-forwarded-for": context['x-forwarded-for']} : {})
    },
  };

  return fetch(finalURL, finalOptions)
    .then(async res => {
      const end = process.hrtime(start) ;
      const { body, secureLogging, ...restOptions} = finalOptions;

      winston.info({
        executionTime: (end[0] * 1000) + (end[1]/NS_PER_MS),
        url,
        requestId,
        options: {
          ...(secureLogging ? {} : { body }),
          ...restOptions
        },
        ok: res.ok,
        status: res.status,
        statusText: res.statusText
      });

      if (res.ok) {
        if (options.rawResponse) {
          return res;
        }

        let response = '{}';

        try {
          if (typeof res.text === 'function') {
            response = await res.text();
          }

          response = JSON.parse(response);
        } catch(e) {
          response = {};

          return new Error(`[${res.status}] ${res.statusText} - ${e.message} - ${response}`);
        }

        return response;
      } else {
        return new Error(`[${res.status}] ${res.statusText}`);
      }
    }).catch(e => {
      const { message, ...restError } = e;

      // Log the real error
      winston.error(message, requestId, url, restError);

      // Send error message that will be exposed to client
      throw new Error('Failed to fetch data');
    });
};

export default request;
