const Product = require('../../models/product');
const Units = require('../../core/units');

async function get(request, reply) {
  const keys = Object.keys(request.query);

  if(request.query) {
    if(keys.length === 1 && keys[0] === 'name') {
      return reply(await Product.findByName(request.query.name));
    }

    return reply(await Product.find(request.query));
  }

  return reply(await Product.find());
}

async function getById(request, reply) {
  return reply(await Product.getById(request.params.productId));
}

async function post(request, reply) {
  let product = await Product.create(request.payload);
  product = product.toObject();

  product.total = product.rawProducts.reduce((price, rawProduct) => {
    const rawProductPrice = rawProduct.product.price;

    const rawProductUnitNormalized = Units.normalize({
      value: rawProductPrice.unit.value,
      unit: rawProductPrice.unit.name
    });
    const productUnitNormalized = Units.normalize({value: rawProduct.quantity, unit: rawProduct.unit});

    return price +
      productUnitNormalized.value * (rawProduct.product.price.value / rawProductUnitNormalized.value);
  }, 0);

  return reply(product).code(201);
}

module.exports = {
  get,
  getById,
  post
};
