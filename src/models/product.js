const ProductSchema = require('./schemas/product');

exports.create = async function (data) {
  const product = new ProductSchema(data);
  await product.save();

  return await this.getById(product._id);
};

exports.updateById = async function (productId, data) {
  await ProductSchema
    .findByIdAndUpdate(productId, {
      $set: data
    }) ;

  return await this.getById(productId);
};

exports.getById = async function (productId) {
  return await ProductSchema
    .findById(productId)
    .select('-__v')
    .lean();
};

exports.find = async function (filters = {}) {
  return await ProductSchema
    .find(filters)
    .select('-__v')
    .lean();
};

exports.removeById = async function(productId) {
  return await ProductSchema.findById(productId).remove();
};

exports.removeAll = async function(filters = {}) {
  return await ProductSchema.find().remove();
};
