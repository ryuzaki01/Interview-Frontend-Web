import logger from 'winston';
import { graphqlExpress } from 'apollo-server-express';
import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import NoIntrospection from 'graphql-disable-introspection';

import * as Queries from './queries';

import fetch from '../core/fetch';

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: { ...Queries },
  })
});

export default graphqlExpress((req, res, next) => {
  const { lang, userAgent, channelId, userId } = res.locals.data.app;
  const __PROD__ = process.env.NODE_ENV === 'production';

  const client = fetch({
    lang,
    userAgent,
    cookie: req.headers.cookie,
    "x-forwarded-for": req.headers['forwarded-for'] || req.headers['x-forwarded-for']|| null,
    "true-client-ip": req.headers['true-client-ip'] || null
  });

  return {
    schema,
    rootValue: {
      lang,
      userAgent,
      channelId,
      logger,
      client,
      userId,
      res
    },
    context: req,
    ...(__PROD__ ? { validationRules: NoIntrospection } : {}),
  };
});
