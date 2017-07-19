const bcrypt = require('bcrypt');

const UserSchema = require('../models/schemas/user');

exports.authenticate = async function (decoded, request, callback) {
  try {
    const user = await UserSchema.findById(decoded.id);

    if(!user) {
      return callback(null, false);
    }

    return callback(null, true, user);
  } catch(err) {
    return callback(null, false);
  }
};

exports.generateHash = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      resolve(hash);
    });
  });
};

exports.comparePasswords = function (password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      resolve(result);
    });
  });
};
