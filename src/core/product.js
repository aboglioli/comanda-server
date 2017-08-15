const {MASS_UNITS, VOLUME_UNITS, UNIT} = require('./enums');

const Units = require('./units');
const Product = require('../models/product');

exports.calculatePrice = async (product) => {
  if(product.type === 'raw') {
    return product.price;
  }

  return product.subproducts.reduce(async (price, subproductItem) => {
    const subproduct =  await Product.getById(subproductItem.product);
    const quantityObj = subproductItem.quantity;

    if(subproduct.type === 'raw') {
      const subproductQuantity = Units.normalize(subproduct.unit.value, subproduct.unit.unit);
      const quantity = Units.normalize(quantityObj.value, quantityObj.unit);

      const unitName1 = subproduct.unit.unit;
      const unitName2 = quantityObj.unit;

      const sameTypeOfUnits = Units.isUnitOfType(MASS_UNITS, unitName1, unitName2) ||
                              Units.isUnitOfType(VOLUME_UNITS, unitName1, unitName2);

      if(!sameTypeOfUnits) {
        throw new Error('Product and subproduct units are not of same type');
      }

      return await price + quantity * (subproduct.price / subproductQuantity);
    }

    return await price + quantityObj.value * await this.calculatePrice(subproduct);
  }, Promise.resolve(0));
};

exports.materialize = async (product) => {
  if(Array.isArray(product)) {
    return Promise.all(product.map(async (p) => await this.materialize(p)));
  }

  if(product.type !== 'raw') {
    product.price = await this.calculatePrice(product);
  }

  if(!product.unit) {
    product.unit = {
      value: 1,
      unit: 'u'
    };
  }

  return product;
};
