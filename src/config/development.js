const package = require('../../package');

const env = process.env;

module.exports = {
  app: {
    host: env.APP_HOST || '0.0.0.0',
    port: env.APP_PORT || 3000,
    routes: {
      prefix: 'api',
      version: 'v1'
    },
    jwtKey: env.JWT_KEY || 'qwerty',
    logging: true,
    defaultAdmin: true
  },
  database: {
    host: env.DB_HOST || 'mongodb',
    port: env.DB_PORT || 27017,
    name: env.DB_NAME || 'comanda',
    user: env.DB_USER,
    password: env.DB_PASSWORD
  },
  swagger: {
    info: {
      title: 'Comanda API Documentation',
      version: package.version
    },
    basePath: '/api/v1',
    documentationPath: '/docs',
    grouping: 'tags'
  }
};
