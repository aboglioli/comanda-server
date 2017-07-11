const {expect} = require('chai');

const {omitDeep} = require('./utils');
const {buildRoutes} = require('../src/utils/routes');
const {normalize} = require('../src/core/units');
const routes = require('../src/routes');

describe('Utils', () => {
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
      let res = normalize({unit: 'kg', value: 2});
      expect(res.unit).to.equal('g');
      expect(res.value).to.equal(2000.0);

      res = normalize({unit: 'kg', value: 2.3});
      expect(res.unit).to.equal('g');
      expect(res.value).to.equal(2300.0);

      res = normalize({unit: 'kg', value: 0.3});
      expect(res.unit).to.equal('g');
      expect(res.value).to.equal(300.0);

      res = normalize({unit: 'dag', value: 0.3});
      expect(res.unit).to.equal('g');
      expect(res.value).to.equal(3.0);

      res = normalize({unit: 'l', value: 0.3});
      expect(res.unit).to.equal('l');
      expect(res.value).to.equal(0.3);

      res = normalize({unit: 'ml', value: 20});
      expect(res.unit).to.equal('l');
      expect(res.value).to.equal(0.02);

      res = normalize({unit: 'kl', value: 20});
      expect(res.unit).to.equal('l');
      expect(res.value).to.equal(20000.0);
    });
  });
});
