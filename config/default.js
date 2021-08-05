const path = require('path');
const pkg = require('../package.json');

if (!process.env.NODE_ENV) {
  throw new Error('env NODE_ENV not defined');
}

let config = {
  env: process.env.NODE_ENV,
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  secret: process.env.SECRET,
  version: pkg.version,
  Hostname: process.env.APPHOST || `http://${process.env.HOST}:${process.env.PORT}`,
  domain: process.env.APPDOMAIN,
  GQL_HOST: process.env.GQL_HOST || `http://localhost:${process.env.PORT}/graphql`,
  cookie: {
    domain: `.${process.env.APPDOMAIN}`,
    path: '/',
    maxAge: 24 * 60 * 60 * 1000
  },
  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base: path.resolve(__dirname, '..'),
  dir_client: 'src',
  dir_build: 'build',
  dir_public: 'build/public/',
  dir_server: 'build',

  utils_paths: {
    base: () => path.resolve(config.path_base, arguments)
  }
};

config.logDir = process.env.LOGDIR || config.path_base;
config.logFileName = `${pkg.name}.log`;

config.compiler_public_path = process.env.PUBLIC_PATH || `${config.Hostname}/assets/`;

const base = (...args) => path.resolve(...[config.path_base, ...args]);

config.utils_paths = {
  base,
  client: base.bind(null, config.dir_client),
  build: base.bind(null, config.dir_build),
  public: base.bind(null, config.dir_public)
};

config.globals = {
  // Global Configuration Here
  Hostname: config.Hostname,
  GQLHost: process.env.GQL_HOST || '/graphql',
  domain: config.domain
};

module.exports = config;
