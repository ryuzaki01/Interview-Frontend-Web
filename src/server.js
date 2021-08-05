import express from "express";
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import userAgent from "express-useragent";
import winston from "winston";
import config from "config";

import "winston-logrotate";

import initMiddleware from "./middlewares/init";
import AppServer from "./AppServer";
import graphql from './graphql';

const __PROD__ = process.env.NODE_ENV === 'production';

global.CONFIG = config.globals;

// Configure Default Logger
winston.configure({
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
      humanReadableUnhandledException: true,
      json: process.env.PRETTY_LOG === 'true',
    }),
  ],
  exitOnError: false,
});

if (__PROD__) {
  winston.remove(winston.transports.Console);
  winston.add(winston.transports.Rotate, {
    file: `${config.logDir}/${config.logFileName}`,
    colorize: false,
    timestamp: true,
    size: process.env.LOG_SIZE || '100m',
    keep: process.env.LOG_KEEP || 5,
    compress: false,
    json: true,
  });
} else {
  winston.add(winston.transports.File, {
    filename: config.logFileName,
    handleExceptions: true,
    json: true,
  });
}

const server = express();

process.on('uncaughtException', winston.error);
process.on('unhandledRejection', winston.error);

server.use(express.static(config.utils_paths.public(), { maxAge: '1y' }));

if (__PROD__) {
  server.set('trust proxy', 1);
  server.disable('x-powered-by');
}

server.use(cookieParser(config.secret, config.cookie));
server.use(express.urlencoded({ extended: true }));
server.use(userAgent.express());
server.use(initMiddleware);

server.use('/health', (req, res) => {
  return res.send('OK');
});

server.use('/graphql',
  bodyParser.json({ limit: '5mb' }),
  graphql
);

if (!__PROD__) {
  const { graphiqlExpress } = require('apollo-server-express');

  server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
}

server.use(AppServer);

server.use((_, res) => res.status(404).send('Not Found'));

process.on('SIGINT', () => {
  winston.info('Received SIGINT exiting');
  process.exit();
});

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  server.hot = module.hot;
  module.hot.accept();
} else {
  server.listen(config.port, err => {
    if (err) {
      winston.error(err);
    } else {
      winston.info(`Server is up and listening at ${config.host}:${config.port} env:${process.env.NODE_ENV}`);
    }
  });
}

export default server;
