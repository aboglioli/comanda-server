const bcrypt = require('bcrypt');

const UserSchema = require('../models/schemas/user');

async function authenticate(decoded, request, callback) {
  try {
    const user = await UserSchema.findById(decoded.id);

    if(!user) {
      return callback(null, false);
    }

    return callback(null, true, user);
  } catch(err) {
    return callback(null, false);
  }
}

function generateHash(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      resolve(hash);
    });
  });
}

function comparePasswords(password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      resolve(result);
    });
  });
}

module.exports = {
  authenticate,
  generateHash,
  comparePasswords
};
