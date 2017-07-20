const url = require('url');

const config = require('./config');
const {buildRoutes} = require('./core/routes');

const configuration = require('./resources/configuration');
const account = require('./resources/account');
const users = require('./resources/users');
const products = require('./resources/products');

const routes = {
  configuration,
  account,
  users,
  products
};

module.exports = buildRoutes(config.app.routes, routes);
