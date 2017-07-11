const JWT = require('jsonwebtoken');
const _ = require('lodash');

const config = require('../../config');
const User = require('../../models/user');
const {comparePasswords} = require('../../core/authentication');

async function get(request, reply) {
  return reply(await User.getById(request.auth.credentials.id));
}

async function login(request, reply) {
  const {email, password} = request.payload;

  const user = await User.getByEmail(email);

  if(!user || !comparePasswords(password, user.password)) {
    return reply({message: 'Invalid credentials'}).code(400);
  }

  return reply({
    authToken: JWT.sign({
      id: user._id
    }, config.app.jwtKey)
  });
}

async function register(request, reply) {
  try {
    const user = await User.create(request.payload);
    return reply(user).code(201);
  } catch(e) {
    return reply({message: e.message}).code(409);
  }
}

async function put(request, reply) {
  const user = await User.updateById(request.auth.credentials.id, request.payload);
  return reply(user).code(200);
}

module.exports = {
  get,
  login,
  register,
  put
};
