const _ = require('lodash');

const User = require('../src/models/user');
const Product = require('../src/models/product');

const data = {};

exports.mockData = async () => {
  // Users
  await User.removeAll();

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
  await Product.removeAll();

  data.raw1 = await Product.create({
    name: 'Raw1',
    type: 'raw',
    price: {
      value: 20,
      quantity: {
        value: 1,
        unit: 'kg'
      }
    }
  });
  data.raw2 = await Product.create({
    name: 'Raw2',
    type: 'raw',
    price: {
      value: 10,
      quantity: {
        value: 1,
        unit: 'l'
      }
    }
  });
  data.single1 = await Product.create({
    name: 'Single1',
    type: 'single',
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
  data.single2 = await Product.create({
    name: 'Single2',
    type: 'single',
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
      product: data.single1._id
    }, {
      quantity: {
        value: 2,
        unit: 'u'
      },
      product: data.single2._id
    }]
  });

  return _.cloneDeep(data);
};
