const mongoose = require('mongoose');

const {PRODUCT_TYPES, MASS_UNITS, CAPACITY_UNITS, VOLUME_UNITS, UNIT} = require('../../core/enums');

const QuantitySchema = {
  value: {type: Number, required: true},
  unit: {
    type: String,
    required: true,
    enum: [...MASS_UNITS, ...CAPACITY_UNITS, ...VOLUME_UNITS, UNIT]
  }
};

const PriceSchema = {
  value: {type: Number, required: true},
  quantity: {type: QuantitySchema}
};

const ProductSchema = new mongoose.Schema({
  name: {type: String, required: true},
  type: {type: String, enum: PRODUCT_TYPES},
  price: {type: PriceSchema, required: function() {
    return ['raw', 'disposable', 'paper'].includes(this.type);
  }},
  subproducts: [{
    quantity: {type: QuantitySchema, required: true},
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}
  }]
});

module.exports = mongoose.model('Product', ProductSchema);
