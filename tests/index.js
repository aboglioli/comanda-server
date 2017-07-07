const config = require('../src/config');

config.app.logging = false;
config.database.name = 'mercury-test';

const db = require('../src/core/db');
db.connection.dropDatabase();

const server = require('../src/server');
const request = require('./request');

module.exports = [server, Object.assign({}, require('./utils'), {
  request: request(server),
  simpleRequest: request()
})];
