const mongoose = require('mongoose');

const rawProductSchema = new mongoose.Schema({
  name: {type: String, required: true},
  price: {
    value: {type: Number, required: true},
    unit: {
      value: {type: Number, required: true},
      name: {type: String, required: true}
    }
  }
});

module.exports = mongoose.model('RawProduct', rawProductSchema);
