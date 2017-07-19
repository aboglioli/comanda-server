const User = require('../../models/user');

// Admin
async function get(request, reply) {
  return reply(await User.getAll());
}

async function getById(request, reply) {
  return reply(await User.getById(request.params.userId));
}

async function post(request, reply) {
  try {
    const user = await User.create(request.payload);
    return reply(user).code(201);
  } catch(e) {
    reply(e).code(404);
  }
}

async function put(request, reply) {
  try {
    const user = await User.updateById(request.params.userId, request.payload);
    return reply(user).code(200);
  } catch(e) {
    return reply(e).code(404);
  }
}

async function deleteById(request, reply) {
  const user = await User.removeById(request.params.userId);
  return reply(user).code(200);
}

// User
async function getMe(request, reply) {
  return reply(await User.getById(request.auth.credentials.id));
}

async function putMe(request, reply) {
  try {
    const user = await User.updateById(request.auth.credentials.id, request.payload);
    return reply(user).code(200);
  } catch(e) {
    reply(e).code(404);
  }
}

module.exports = {
  get,
  getById,
  put,
  post,
  deleteById,
  getMe,
  putMe
};
