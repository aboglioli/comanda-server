const _ = require('lodash');

const Product = require('../../models/product');
const Units = require('../../core/units');
const ProductUtils = require('../../core/product');

async function get(request, reply) {
  const filters = request.query || {};

  if(filters.name) {
    filters.name = {$regex: new RegExp(filters.name, 'i')};
  }

  const products = await Product.find(filters);

  return reply(ProductUtils.format(products));
}

async function getById(request, reply) {
  let product = await Product.getById(request.params.productId);
  return reply(ProductUtils.format(product));
}

async function post(request, reply) {
  if(request.payload.type !== 'raw' && request.payload.price) {
    return reply({message: 'Only raw products can have price'}).code(400);
  }

  let product = await Product.create(request.payload);
  return reply(ProductUtils.format(product)).code(201);
}

async function put(request, reply) {
  let product = await Product.updateById(request.params.productId, request.payload);
  return reply(ProductUtils.format(product)).code(200);
}


module.exports = {
  get,
  getById,
  post,
  put
};
