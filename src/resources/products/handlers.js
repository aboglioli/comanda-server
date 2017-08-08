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

  return reply(await ProductUtils.materialize(products));
};

exports.getById = async function (request, reply) {
  let product = await Product.getById(request.params.productId);
  return reply(await ProductUtils.materialize(product));
};

exports.post = async function (request, reply) {
  if(request.payload.type !== 'raw' && request.payload.price) {
    return reply({message: 'Only raw products can have price'}).code(400);
  }

  try {
    let product = await Product.create(request.payload);
    return reply(await ProductUtils.materialize(product)).code(201);
  } catch(e) {
    return reply({message: e.message}).code(400);
  }
};

exports.put = async function (request, reply) {
  try {
    let product = await Product.updateById(request.params.productId, request.payload);
    return reply(await ProductUtils.materialize(product)).code(200);
  } catch(e) {
    return reply({message: e.message}).code(400);
  }
};

exports.delete = async function (request, reply) {
  await Product.removeById(request.params.productId);
  return reply({removed: true}).reply(200);
};

exports.price = async function (request, reply) {
  const products = await Promise.all(request.payload.products.map(async (product) => {
    const productId = product.product;

    product.product = await Product.getById(productId);

    return product;
  }));

  const price = await ProductUtils.calculatePrice({
    subproducts: products
  });

  return reply({price}).reply(200);
};

exports.subproducts = async function (request, reply) {
  const product = await Product.getById(request.params.productId);

  const subproducts = await Promise.all(product.subproducts.map(async (subproduct) => {
    const product = await Product.getById(subproduct.product);
    return Object.assign({}, subproduct, {product});
  }));

  return reply(subproducts).reply(200);
};
