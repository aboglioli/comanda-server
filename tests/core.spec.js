const {expect} = require('chai');

const {omitDeep} = require('./utils');
const routes = require('../src/routes');

const {buildRoutes} = require('../src/core/routes');
const {normalize} = require('../src/core/units');
const {calculate} = require('../src/core/price');


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
      let [value, unit] = normalize(2, 'kg');
      expect(value).to.equal(2000.0);
      expect(unit).to.equal('g');

      [value, unit] = normalize(2.3, 'kg');
      expect(value).to.equal(2300.0);
      expect(unit).to.equal('g');

      [value, unit] = normalize(0.3, 'kg');
      expect(value).to.equal(300.0);
      expect(unit).to.equal('g');

      [value, unit] = normalize(0.3, 'dag');
      expect(value).to.equal(3.0);
      expect(unit).to.equal('g');

      [value, unit] = normalize(0.3, 'l');
      expect(value).to.equal(0.3);
      expect(unit).to.equal('l');

      [value, unit] = normalize(20, 'ml');
      expect(value).to.equal(0.02);
      expect(unit).to.equal('l');

      [value, unit] = normalize(20, 'kl');
      expect(value).to.equal(20000.0);
      expect(unit).to.equal('l');
    });
  });

  describe('Price', () => {
    it('should calculate price of product with subproducts (nested products)', () => {
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

      const raw1Price = calculate(raw1),
            raw2Price = calculate(raw2),
            single1Price = calculate(single1),
            single2Price = calculate(single2),
            combinedPrice = calculate(combined);

      expect(raw1Price).to.equal(20);
      expect(raw2Price).to.equal(10);
      expect(single1Price).to.equal(0.5 * raw1Price + 5 * raw2Price);
      expect(single2Price).to.equal(2 * raw1Price);
      expect(combinedPrice).to.equal(3 * single1Price + 2 * single2Price);
    });
  });
});
