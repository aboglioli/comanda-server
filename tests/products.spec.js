const {expect} = require('chai');

const [server, utils] = require('./index');
const User = require('../src/models/user');
const Product = require('../src/models/product');
const DATA = require('./mock');

describe('Product', () => {
  let adminToken;
  let data;

  before(async () => {
    data = await utils.mockData();
    adminToken = await utils.login();
  });

  it('GET /products', async () => {
    const res = await utils.request.get('products')
      .set('Authorization', adminToken)
      .expect(200);

    expect(res.body.length).to.equal(5);
    expect(res.body[0].name).to.equal(data.raw1.name);
    expect(res.body[1].name).to.equal(data.raw2.name);
    expect(res.body[4].name).to.equal(data.combined.name);

    const combinedPrice = 3 * (0.5 * 20 + 5 * 10) + 2 * (2 * 20);
    expect(res.body[4].price.value).to.equal(combinedPrice);
  });

  it('GET /products/{productId}', async () => {
    const res = await utils.request.get('products/' + data.combined._id)
      .set('Authorization', adminToken)
      .expect(200);

    expect(res.body.name).to.equal('Combination');
  });

  it('GET /products?name=%', async () => {
    const res = await utils.request.get('products?name=raw')
      .set('Authorization', adminToken)
      .expect(200);

    expect(res.body.length).to.equal(2);
    expect(res.body[0].name).to.equal('Raw1');
    expect(res.body[1].name).to.equal('Raw2');
  });

  it('GET /products?type=%', async () => {
    const res = await utils.request.get('products?type=single')
      .set('Authorization', adminToken)
      .expect(200);

    expect(res.body.length).to.equal(2);
    expect(res.body[0].name).to.equal('Single1');
    expect(res.body[1].name).to.equal('Single2');
  });

  it('GET /products?type=%&name=%', async () => {
    let res = await utils.request.get('products?type=raw&name=raw2')
      .set('Authorization', adminToken)
      .expect(200);

    expect(res.body.length).to.equal(1);
    expect(res.body[0].name).to.equal('Raw2');

    res = await utils.request.get('products?type=product')
          .set('Authorization', adminToken)
          .expect(200);

    expect(res.body.length).to.equal(3);
    res.body.forEach(product => {
      expect(product.type).to.match(/(single|combination)/)
    });
  });

  it('POST /products', async () => {
    const newProduct = {
      name: 'Single3',
      type: 'single',
      subproducts: [{
        quantity: {
          value: 2,
          unit: 'kg'
        },
        product: data.raw1._id
      }, {
        quantity: {
          value: 800,
          unit: 'ml'
        },
        product: data.raw2._id
      }]
    };

    const res = await utils.request.post('products')
      .set('Authorization', adminToken)
      .send(newProduct)
      .expect(201);

    expect(res.body._id).to.not.be.undefined;
    expect(res.body.name).to.equal(newProduct.name);
    expect(res.body.type).to.equal(newProduct.type);
    expect(res.body.price.value).to.equal(2 * 20 + 0.8 * 10);
    expect(res.body.subproducts[0].product._id.toString()).to.equal(data.raw1._id.toString());
  });

  it('PUT /products', async () => {
    // Create new product
    const newProduct = {
      name: 'NewProduct',
      type: 'single',
      subproducts: [{
        quantity: {
          value: 2,
          unit: 'kg'
        },
        product: data.raw1._id
      }, {
        quantity: {
          value: 800,
          unit: 'ml'
        },
        product: data.raw2._id
      }]
    };

    let res = await utils.request.post('products')
      .set('Authorization', adminToken)
      .send(newProduct)
      .expect(201);

    // Update product
    const productId = res.body._id;

    res = await utils.request.put('products/' + productId)
      .set('Authorization', adminToken)
      .send({
        name: 'NewName',
        description: 'Description',
        subproducts: [{
          quantity: {
            value: 30,
            unit: 'hg'
          },
          product: data.raw1._id
        }]
      })
      .expect(200);

    expect(res.body.name).to.equal('NewName');
    expect(res.body.description).to.equal('Description');
    expect(res.body.price.value).to.equal(3 * data.raw1.price.value);

    // Update subproduct
    await utils.request.put('products/' + data.raw1._id)
      .set('Authorization', adminToken)
      .send({
        price: {
          value: 15,
          quantity: {
            value: 0.5,
            unit: 'kg'
          }
        }
      })
      .expect(200);

    res = await utils.request.get('products/' + productId)
      .set('Authorization', adminToken)
      .expect(200);

    expect(res.body.price.value).to.equal(3 / 0.5  * 15);
  });

});
