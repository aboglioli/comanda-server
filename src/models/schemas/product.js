const mongoose = require('mongoose');

const {PRODUCT_TYPES, MASS_UNITS, VOLUME_UNITS, UNIT} = require('../../core/enums');

const ALL_UNITS = [
  ...MASS_UNITS.map(unit => unit.unit),
  ...VOLUME_UNITS.map(unit => unit.unit)
];

const QuantitySchema = {
  value: {type: Number, required: true},
  unit: {
    type: String,
    required: true,
    enum: ALL_UNITS
  }
};

const ProductSchema = new mongoose.Schema({
  name: {type: String, required: true},
  type: {type: String, enum: PRODUCT_TYPES},
  price: {
    type: Number,
    required: function() {
      return ['raw', 'disposable', 'paper'].includes(this.type);
    }
  },
  unit: {type: QuantitySchema},
  subproducts: [{
    quantity: {type: QuantitySchema, required: true},
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}
  }]
});

module.exports = mongoose.model('Product', ProductSchema);
