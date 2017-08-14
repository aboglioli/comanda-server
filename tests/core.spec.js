const {expect} = require('chai');

const [server, utils] = require('./index');
const {omitDeep} = require('./utils');
const routes = require('../src/routes');

const {buildRoutes} = require('../src/core/routes');
const {normalize} = require('../src/core/units');
const {calculatePrice, materialize} = require('../src/core/product');

describe('Core', () => {
  describe('Routes', () => {
    it('should generate routes with prefix and version', () => {
      expect(routes).to.be.an.instanceof(Array);
      expect(routes[0].path).to.include('/api/v1/');

      const routePaths = routes.map(r => r.path);
      expect(routePaths).to.include.members([
        'users'
      ].map(endpoint => '/api/v1/' + endpoint));
    });

    it('should buildRoutes()', () => {
      const endpoints = buildRoutes({prefix: 'prefix', version: 'version'}, {
        hello: [{
          path: ''
        }]
      });

      expect(endpoints[0].path).to.equal('/prefix/version/hello');
      expect(endpoints[0].path).to.not.equal('/prefix/version/hello/');
    });
  });

  describe('Units', () => {
    it('should convert between mass and volume units', () => {
      let value = normalize(2, 'kg');
      expect(value).to.equal(2000.0);

      value = normalize(2.3, 'kg');
      expect(value).to.equal(2300.0);

      value = normalize(0.3, 'kg');
      expect(value).to.equal(300.0);

      value = normalize(0.3, 'dag');
      expect(value).to.equal(3.0);

      value = normalize(0.3, 'l');
      expect(value).to.equal(0.3);

      value = normalize(20, 'ml');
      expect(value).to.equal(0.02);

      value = normalize(20, 'kl');
      expect(value).to.equal(20000.0);

      value = normalize(1, 'dm3');
      expect(value).to.equal(1.0);

      value = normalize(1, 'm3');
      expect(value).to.equal(1000.0);
    });
  });

  describe('Price', async () => {
    it('should calculatePrice() of product with subproducts (nested products)', async () => {
      const data = await utils.mockData();

      const raw1Price = data.raw1.price.value,
            raw2Price = data.raw2.price.value;

      const simple1Price = await calculatePrice(data.simple1),
            simple2Price = await calculatePrice(data.simple2),
            combinedPrice = await calculatePrice(data.combined);

      expect(simple1Price).to.equal(0.5 * raw1Price + 5 * raw2Price);
      expect(simple2Price).to.equal(2 * raw1Price);
      expect(combinedPrice).to.equal(3 * simple1Price + 2 * simple2Price);
    });
  });

  describe('Product', async () => {
    it('should materialize products', async () => {
      const data = await utils.mockData();

      const formatted = await materialize([data.raw1, data.raw2, data.simple1, data.simple2, data.combined]);

      expect(formatted.length).to.equal(5);
      expect(formatted[0].price).to.deep.equal(data.raw1.price);
      expect(formatted[1].price).to.deep.equal(data.raw2.price);

      const combinedPrice = 3 * (0.5 * 20 + 5 * 10) + 2 * (2 * 20);
      expect(formatted[4].price.value).to.equal(combinedPrice);
    });
  });
});
