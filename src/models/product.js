const ProductSchema = require('./schemas/product');

async function create(data) {
  const product = new ProductSchema(data);
  await product.save();

  return await findById(product._id);
}

async function updateById(productId, data) {
  await ProductSchema
    .findByIdAndUpdate(productId, {
      $set: data
    }) ;

  return await findById(productId);
}

async function findById(productId) {
  return await ProductSchema
    .findById(productId)
    .select('-__v')
    .exec();
}

async function find(filters = {}) {
  return await ProductSchema
    .find(filters)
    .select('-__v')
    .exec();
}

async function findByName(name) {
  return await ProductSchema
    .find({
      name: {$regex: new RegExp(name, 'i')}
    })
    .select('-__v')
    .exec();
}

async function removeById(productId) {
  return await ProductSchema.findById(productId).remove();
}

async function removeAll() {
  return await ProductSchema.find({}).remove();
}

module.exports = {
  create,
  updateById,
  findById,
  find,
  findByName
};
