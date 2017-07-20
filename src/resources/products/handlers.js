const _ = require('lodash');

const Product = require('../../models/product');
const Units = require('../../core/units');
const ProductUtils = require('../../core/product');

exports.get = async function (request, reply) {
  const filters = request.query || {};

  if(filters.name) {
    filters.name = {$regex: new RegExp(filters.name, 'i')};
  }

  const products = await Product.find(filters);

  return reply(ProductUtils.materialize(products));
};

exports.getById = async function (request, reply) {
  let product = await Product.getById(request.params.productId);
  return reply(ProductUtils.materialize(product));
};

exports.post = async function (request, reply) {
  if(request.payload.type !== 'raw' && request.payload.price) {
    return reply({message: 'Only raw products can have price'}).code(400);
  }

  let product = await Product.create(request.payload);
  return reply(ProductUtils.materialize(product)).code(201);
};

exports.put = async function (request, reply) {
  let product = await Product.updateById(request.params.productId, request.payload);
  return reply(ProductUtils.materialize(product)).code(200);
};
