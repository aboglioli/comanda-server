const url = require('url');

const config = require('./config');
const {buildRoutes} = require('./utils/routes');

const account = require('./resources/account');
const users = require('./resources/users');
const products = require('./resources/products');

const routes = {
  account,
  users,
  products
};

module.exports = buildRoutes(config.app.routes, routes);
