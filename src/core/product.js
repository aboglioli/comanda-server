const Units = require('./units');

exports.calculatePrice = (product) => {
  if(product.type === 'raw') {
    return product.price.value;
  }

  return product.subproducts
    .reduce((price, subproductItem) => {
      const subproduct = subproductItem.product;
      const quantityObj = subproductItem.quantity;

      if(subproduct.type === 'raw') {
        const subproductPrice = subproduct.price;
        const [subproductQuantity, subproductUnit] = Units.normalize(subproductPrice.quantity.value, subproductPrice.quantity.unit);
        const [quantity, unit] = Units.normalize(quantityObj.value, quantityObj.unit);

        if(unit !== subproductUnit) {
          throw new Error('Product and subproduct units are not equal');
        }

        return price + quantity * (subproductPrice.value / subproductQuantity);
      }

      return price + quantityObj.value * this.calculatePrice(subproduct);
    }, 0);
};

exports.materialize = (product) => {
  if(Array.isArray(product)) {
    return product.map(p => this.materialize(p));
  }

  if(product.type !== 'raw') {
    product.price = {
      value: this.calculatePrice(product),
      quantity: {
        value: 1,
        unit: 'u'
      }
    };
  }

  return product;
};
