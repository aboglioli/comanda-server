const config = require('../config');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let dbConnection;

if(config.database.user && config.database.password) {
  dbConnection = mongoose.connect(`mongodb://${config.database.user}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.name}`);
} else {
  dbConnection = mongoose.connect(`mongodb://${config.database.host}:${config.database.port}/${config.database.name}`);
}

module.exports = dbConnection;

if(config.app.defaultAdmin) {
  const User = require('../models/user');

  User.create({
    name: 'Admin',
    user: 'admin',
    email: 'admin@admin.com',
    password: 'admin123',
    scope: ['admin']
  }).then(user => {
    console.log('Admin account created');
  }).catch(e => {
    console.log('Existing admin account');
  });
}
