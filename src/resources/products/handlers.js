const _ = require('lodash');

const Product = require('../../models/product');
const Units = require('../../core/units');
const ProductUtils = require('../../core/product');
const Enums = require('../../core/enums');

exports.get = async function (request, reply) {
  const filters = request.query || {};

  if(filters.name) {
    filters.name = {$regex: new RegExp(filters.name, 'i')};
  }

  const products = await Product.find(filters);

  // TODO: exmaple of notification
  request.server.publish('/hello', {msg: 'Product retrieved'});
  request.server.broadcast('welcome!');

  return reply(await ProductUtils.materialize(products));
};

exports.getById = async function (request, reply) {
  let product = await Product.getById(request.params.productId);
  return reply(await ProductUtils.materialize(product));
};

exports.post = async function (request, reply) {
  let productData = request.payload;

  if(!Enums.RAW_TYPES.includes(productData.type) && productData.price) {
    productData = _.omit(productData, 'price');
  }

  try {
    let product = await Product.create(productData);
    return reply(await ProductUtils.materialize(product)).code(201);
  } catch(e) {
    return reply({message: e.message}).code(400);
  }
};

exports.put = async function (request, reply) {
  let productData = request.payload;

  const productInDb = await Product.getById(request.params.productId);

  if(!productInDb) {
    return reply({message: 'Product does not exist'}).code(404);
  }

  if(!(Enums.RAW_TYPES.includes(productData.type) ||
       Enums.RAW_TYPES.includes(productInDb.type)) &&
     productData.price) {
    productData = _.omit(productData, 'price');
  }

  try {
    let product = await Product.updateById(request.params.productId, productData);
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
