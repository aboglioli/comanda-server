const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {type: String, required: true},
  subproducts: [{
    quantity: {type: Number, required: true},
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}
  }],
  rawProducts: [{
    quantity: {type: Number, required: true},
    unit: String,
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'RawProduct'}
  }]
});

module.exports = mongoose.model('Product', productSchema);
