const config = require('./development');

config.database.host = 'ds163612.mlab.com';
config.database.port = 63612;
config.database.name = 'sushibox-db';

module.exports = config;
