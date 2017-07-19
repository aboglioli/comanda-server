const Price = require('./price');

exports.format = function format(product) {
  if(Array.isArray(product)) {
    return product.map(p => format(p));
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
