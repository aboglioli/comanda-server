const Product = require('../../models/product');
const Units = require('../../core/units');
const ProductUtils = require('../../core/product');

async function get(request, reply) {
  const keys = Object.keys(request.query);
  let products;

  if(request.query) {
    if(keys.length === 1 && keys[0] === 'name') {
      products = await Product.findByName(request.query.name);
    } else {
      products = await Product.find(request.query);
    }
  }

  if(!products) {
    products = await Product.find();
  }

  return reply(ProductUtils.format(products.toObject()));
}

async function getById(request, reply) {
  let product = await Product.findById(request.params.productId);
  return reply(ProductUtils.format(product.toObject()));
}

async function post(request, reply) {
  let product = await Product.create(request.payload);
  return reply(ProductUtils.format(product.toObject())).code(201);
}

module.exports = {
  get,
  getById,
  post
};
