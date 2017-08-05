const mongoose = require('mongoose');

const {PRODUCT_TYPES, MASS_UNITS, VOLUME_UNITS, UNIT} = require('../../core/enums');

const QuantitySchema = {
  value: {type: Number, required: true},
  unit: {type: String, required: true, enum: [...MASS_UNITS, ...VOLUME_UNITS, UNIT]}
};

const PriceSchema = {
  value: {type: Number, required: true},
  quantity: {type: QuantitySchema, required: function() {
    return this.type === 'raw';
  }}
};

const ProductSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: String,
  type: {type: String, enum: PRODUCT_TYPES},
  price: {type: PriceSchema, required: function() {
    return this.type === 'raw';
  }},
  subproducts: [{
    quantity: {type: QuantitySchema, required: true},
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}
  }]
});

// const populateSubproducts = function (next) {
//   this.populate('subproducts.product');
//   next();
// };

// ProductSchema
//   .pre('find', populateSubproducts)
//   .pre('findOne', populateSubproducts)
//   .pre('findById', populateSubproducts);

module.exports = mongoose.model('Product', ProductSchema);
