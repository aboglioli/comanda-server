const Units = require('./units');

function calculate(product) {
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

      return price + quantityObj.value * calculate(subproduct);
    }, 0);
}

module.exports = {
  calculate
};
