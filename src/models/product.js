const ProductSchema = require('./schemas/product');

async function create(data) {
  const product = new ProductSchema(data);
  await product.save();

  return await findById(product._id);
}

async function findById(productId) {
  return await ProductSchema
    .findById(productId);
}

async function find(filters = {}) {
  return await ProductSchema
    .find(filters);
}

async function findByName(name) {
  return await ProductSchema
    .find({
      name: {$regex: new RegExp(name, 'i')}
    });
}

async function removeById(productId) {
  return await ProductSchema.findById(productId).remove();
}

async function removeAll() {
  return await ProductSchema.find({}).remove();
}

module.exports = {
  create,
  findById,
  find,
  findByName
};
