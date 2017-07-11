const RawProduct = require('../../models/raw-product');

async function post(request, reply) {
  const rawProduct = await RawProduct.create(request.payload);
  return reply(rawProduct).code(201);
}

module.exports = {
  post
};
