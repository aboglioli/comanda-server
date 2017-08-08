const JWT = require('jsonwebtoken');
const _ = require('lodash');

const config = require('../../config');
const User = require('../../models/user');
const {comparePasswords} = require('../../core/authentication');

exports.login = async function (request, reply) {
  const user = await User.findOne({user: request.payload.user}, true);

  if(!user) {
    return reply({message: 'The user does not exist'}).code(404);
  }

  const equalPasswords = await comparePasswords(request.payload.password, user.password);

  if(!equalPasswords) {
    return reply({message: 'Invalid credentials'}).code(400);
  }

  return reply({
    authToken: JWT.sign({
      id: user._id
    }, config.app.jwtKey)
  });
};
