const admin = {
  name: 'Admin',
  email: 'admin@admin.com',
  password: 'admin123',
  scope: ['admin']
},
user = {
  name: 'User',
  email: 'user@user.com',
  password: 'user123'
};

const raw1 = {
  type: 'raw',
  price: {
    value: 20,
    quantity: {
      value: 1,
      unit: 'kg'
    }
  }
},
raw2 = {
  type: 'raw',
  price: {
    value: 10,
    quantity: {
      value: 1,
      unit: 'l'
    }
  }
},
single1 = {
  type: 'single',
  subproducts: [{
    quantity: {
      value: 500,
      unit: 'g'
    },
    product: raw1
  }, {
    quantity: {
      value: 0.5,
      unit: 'dal'
    },
    product: raw2
  }]
},
single2 = {
  type: 'single',
  subproducts: [{
    quantity: {
      value: 2,
      unit: 'kg'
    },
    product: raw1
  } ]
},
combined = {
  type: 'combination',
  subproducts: [{
    quantity: {
      value: 3,
      unit: 'u'
    },
    product: single1
  }, {
    quantity: {
      value: 2,
      unit: 'u'
    },
    product: single2
  }]
};


module.exports = {
  admin, user,
  raw1, raw2, single1, single2, combined
}
