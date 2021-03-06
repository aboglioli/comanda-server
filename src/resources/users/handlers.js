const User = require('../../models/user');

// Admin
exports.get = async function (request, reply) {
  return reply(await User.find());
};

exports.getById = async function (request, reply) {
  return reply(await User.getById(request.params.userId));
};

exports.post = async function (request, reply) {
  try {
    const user = await User.create(request.payload);
    return reply(user).code(201);
  } catch(e) {
    reply({message: e.message}).code(400);
  }
};

exports.put = async function (request, reply) {
  try {
    const user = await User.updateById(request.params.userId, request.payload);
    return reply(user).code(200);
  } catch(e) {
    return reply({message: e.message}).code(400);
  }
};

exports.delete = async function (request, reply) {
  await User.removeById(request.params.userId);
  return reply({removed: true}).code(200);
};

// User
exports.getMe = async function (request, reply) {
  return reply(await User.getById(request.auth.credentials.id));
};

exports.putMe = async function (request, reply) {
  try {
    const user = await User.updateById(request.auth.credentials.id, request.payload);
    return reply(user).code(200);
  } catch(e) {
    reply({message: e.message}).code(400);
  }
};
