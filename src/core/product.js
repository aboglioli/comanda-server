const Price = require('./price');

exports.materialize = function materialize(product) {
  if(Array.isArray(product)) {
    return product.map(p => materialize(p));
  }

  if(product.type !== 'raw') {
    product.price = {
      value: Price.calculate(product),
      quantity: {
        value: 1,
        unit: 'u'
      }
    };
  }

  return product;
};
