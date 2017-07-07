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
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

function comparePasswords(password1, password2) {
  return bcrypt.compareSync(password1, password2);
}

module.exports = {
  authenticate,
  generateHash,
  comparePasswords
};
