const {expect} = require('chai');

const [server, utils] = require('./index');

describe('Products', () => {
  before((done) => {
    done();
  });

	it('GET /products', (done) => {
    utils.request.get('products')
      .expect(200)
      .end((err ,res) => {
        done(err);
      });
	});

});
