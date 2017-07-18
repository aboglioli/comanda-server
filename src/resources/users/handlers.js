const User = require('../../models/user');

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
    reply(e).code(404);
  }
}


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
  getMe,
  put,
  putMe,
  post
};
