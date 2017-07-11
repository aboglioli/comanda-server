const RawProductSchema = require('./schemas/raw-product');

async function create(data) {
  const rawProduct = new RawProductSchema(data);
  await rawProduct.save();

  return getById(rawProduct._id);
}

async function getById(productId) {
  return await RawProductSchema
    .findById(productId);
}

async function find(filters = {}) {
  return await RawProductSchema
    .find(filters);
}

async function findByName(name) {
  return await RawProductSchema
    .find({
      name: {$regex: new RegExp(name, 'i')}
    });
}

module.exports = {
  create,
  getById,
  find,
  findByName
};
