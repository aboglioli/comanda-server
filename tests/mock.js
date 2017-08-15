const _ = require('lodash');

const User = require('../src/models/user');
const Product = require('../src/models/product');

const data = {};

exports.mockData = async () => {
  // Users
  await User.remove();

  data.admin = await User.create({
    name: 'Admin',
    user: 'admin',
    email: 'admin@admin.com',
    password: 'admin123',
    scope: ['admin']
  });

  data.user = await User.create({
    name: 'User',
    user: 'user',
    email: 'user@user.com',
    password: 'user123'
  });

  // Products
  await Product.remove();

  data.raw1 = await Product.create({
    name: 'Raw1',
    type: 'raw',
    price: 20,
    unit: {
      value: 1,
      unit: 'kg'
    }
  });
  data.raw2 = await Product.create({
    name: 'Raw2',
    type: 'raw',
    price: 10,
    unit: {
      value: 1,
      unit: 'l'
    }
  });
  data.simple1 = await Product.create({
    name: 'Simple1',
    type: 'simple',
    subproducts: [{
      quantity: {
        value: 500,
        unit: 'g'
      },
      product: data.raw1._id
    }, {
      quantity: {
        value: 0.5,
        unit: 'dal'
      },
      product: data.raw2._id
    }]
  });
  data.simple2 = await Product.create({
    name: 'Simple2',
    type: 'simple',
    subproducts: [{
      quantity: {
        value: 2,
        unit: 'kg'
      },
      product: data.raw1._id
    }]
  });
  data.combined = await Product.create({
    name: 'Combination',
    type: 'combination',
    subproducts: [{
      quantity: {
        value: 3,
        unit: 'u'
      },
      product: data.simple1._id
    }, {
      quantity: {
        value: 2,
        unit: 'u'
      },
      product: data.simple2._id
    }]
  });

  return _.cloneDeep(data);
};
