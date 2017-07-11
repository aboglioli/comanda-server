const url = require('url');

const config = require('./config');
const {buildRoutes} = require('./utils/routes');

const account = require('./resources/account');
const users = require('./resources/users');

const routes = {
  account,
  users
};

module.exports = buildRoutes(config.app.routes, routes);
