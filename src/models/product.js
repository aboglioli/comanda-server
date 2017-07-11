const ProductSchema = require('./schemas/product');

async function create(data) {
  const product = new ProductSchema(data);
  await product.save();

  return getById(product._id);
}

async function getById(productId) {
  return await ProductSchema
    .findById(productId)
    .populate('subproducts.product')
    .populate('rawProducts.product');
}

async function find(filters = {}) {
  return await ProductSchema
    .find(filters)
    .populate('subproducts.product')
    .populate('rawProducts.product');
}

async function findByName(name) {
  return await ProductSchema
    .find({
      name: {$regex: new RegExp(name, 'i')}
    })
    .populate('subproducts.product')
    .populate('rawProducts.product');
}

module.exports = {
  create,
  getById,
  find,
  findByName
};
