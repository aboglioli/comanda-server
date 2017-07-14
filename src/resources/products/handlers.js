const _ = require('lodash');

const Product = require('../../models/product');
const Units = require('../../core/units');
const ProductUtils = require('../../core/product');

async function get(request, reply) {
  let products;

  if(!_.isEmpty(request.query)) {
    const keys = Object.keys(request.query);

    if(keys.length === 1 && keys[0] === 'name') {
      products = await Product.findByName(request.query.name);
    } else {
      products = await Product.find(request.query);
    }
  } else {
    products = await Product.find();
  }

  return reply(ProductUtils.format(products));
}

async function getById(request, reply) {
  let product = await Product.findById(request.params.productId);
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
