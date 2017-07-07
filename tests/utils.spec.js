const {expect} = require('chai');

const {omitDeep} = require('./utils');
const {buildRoutes} = require('../src/utils/routes');
const {makeTree} = require('../src/utils/collections');
const routes = require('../src/routes');

class CollectionId {
  constructor(id) {
    this.id = id;
  }

  equals(parent) {
    return this.id === parent.id;
  }
}

describe('Utils', () => {
  describe('Routes', () => {
    it('should generate routes with prefix and version', () => {
      expect(routes).to.be.an.instanceof(Array);
      expect(routes[0].path).to.include('/api/v1/');

      const routePaths = routes.map(r => r.path);
      expect(routePaths).to.include.members([
        'account',
        'users',
        'products',
        'collections'
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

    it('should makeTree() of collections', () => {
      const id1 = new CollectionId('1'),
            id2 = new CollectionId('2'),
            id3 = new CollectionId('3'),
            id4 = new CollectionId('4');

      const collections = [{
        _id: id1,
        name: 'Parent1'
      }, {
        _id: id2,
        name: 'Child1',
        parent: id1
      }, {
        _id: id3,
        name: 'Child2',
        parent: id2
      }, {
        _id: id4,
        name: 'Parent2'
      }];

      let tree = makeTree(collections);

      expect(tree.length === 2).to.be.true;

      tree = omitDeep(tree, ['_id', 'parent']);

      expect(tree).to.deep.equal([{
        name: 'Parent1',
        children: [{
          name: 'Child1',
          children: [{
            name: 'Child2'
          }]
        }]
      }, {
        name: 'Parent2'
      }]);
    });
  });
});
