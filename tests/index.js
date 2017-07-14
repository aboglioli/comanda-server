const config = require('../src/config');

// Test database
config.app.logging = false;
config.database.name = 'comanda-test';

const db = require('../src/core/db');
db.connection.dropDatabase();

// Start the server
const server = require('../src/server');

module.exports = [
  server,
  Object.assign({}, require('./utils'), require('./mock'), {request: require('./request')(server)})
];
