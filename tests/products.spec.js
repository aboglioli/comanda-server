const {expect} = require('chai');

const [server, utils] = require('./index');
const User = require('../src/models/user');
const Product = require('../src/models/product');
const DATA = require('./mock');

describe('Product', () => {
  let adminToken;

  before(async () => {
    // await utils.mockData();
    // adminToken = await utils.login();
  });

  describe('Model', () => {
    it('should create', async () => {

      // const products = await Product.find();
      // expect(products.length).to.equal(5);
      // expect(single1.subproducts[0].product.toObject()).to.deep.equal(raw1.toObject());
      // expect(combined.subproducts[0].product.toObject()).to.deep.equal(single1.toObject());
    });
  });

  describe('Resource', () => {
  });

  // it('POST /products/raw', async () => {
  //   const raw = {
  //     name: 'Raw1',
  //     price: {
  //       value: 15,
  //       unit: {
  //         value: 1,
  //         name: 'kg'
  //       }
  //     }
  //   };

  //   const res = await utils.request.post('products/raw')
  //         .set('Authorization', adminToken)
  //         .send(raw)
  //         .expect(201);

  //   expect(res.body._id).to.not.be.undefined;
  //   expect(res.body.name).to.deep.equal(raw.name);
  //   expect(res.body.price).to.deep.equal(raw.price);
  // });

  // it('POST /products with raw product', async () => {
  //   const raw = {
  //     name: 'Raw1',
  //     price: {
  //       value: 15,
  //       unit: {
  //         value: 1,
  //         name: 'kg'
  //       }
  //     }
  //   };

  //   let res = await utils.request.post('products/raw')
  //         .set('Authorization', adminToken)
  //         .send(raw)
  //         .expect(201);

  //   let rawProductId = res.body._id;

  //   const product = {
  //     name: 'Product1',
  //     rawProducts: [{
  //       quantity: 2.5,
  //       unit: 'kg',
  //       product: rawProductId
  //     }]
  //   };

  //   res = await utils.request.post('products')
  //       .set('Authorization', adminToken)
  //       .send(product)
  //       .expect(201);

  //   expect(res.body.total).to.equal(37.5);
  // });

});
