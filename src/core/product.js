const Units = require('./units');
const Product = require('../models/product');

exports.calculatePrice = async (product) => {
  if(product.type === 'raw') {
    return product.price.value;
  }

  return product.subproducts.reduce(async (price, subproductItem) => {
    const subproduct =  await Product.getById(subproductItem.product);
    const quantityObj = subproductItem.quantity;

    if(subproduct.type === 'raw') {
      const subproductPrice = subproduct.price;
      const [subproductQuantity, subproductUnit] = Units.normalize(subproductPrice.quantity.value, subproductPrice.quantity.unit);
      const [quantity, unit] = Units.normalize(quantityObj.value, quantityObj.unit);

      if(unit !== subproductUnit) {
        throw new Error('Product and subproduct units are not equal');
      }

      return await price + quantity * (subproductPrice.value / subproductQuantity);
    }

    return await price + quantityObj.value * await this.calculatePrice(subproduct);
  }, Promise.resolve(0));
};

exports.materialize = async (product) => {
  if(Array.isArray(product)) {
    return Promise.all(product.map(async (p) => await this.materialize(p)));
  }

  if(product.type !== 'raw') {
    const priceValue = await this.calculatePrice(product);
    product.price = {
      value: priceValue,
      quantity: {
        value: 1,
        unit: 'u'
      }
    };
  }

  return product;
};
