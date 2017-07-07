const url = require('url');

const config = require('./config');
const {buildRoutes} = require('./utils/routes');

const users = require('./resources/users');

const routes = {
  users
};

module.exports = buildRoutes(config.app.routes, routes);
