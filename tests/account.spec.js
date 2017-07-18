const {expect} = require('chai');
const _ = require('lodash');

const [server, utils] = require('./index');
const User = require('../src/models/user');

describe('Account', () => {
  let adminToken;
  let data;

  beforeEach(async () => {
    data = await utils.mockData();
    adminToken = await utils.login();
  });

	it('POST /account/login', async () => {
    const res = await utils.request.post('account/login')
          .send({
            user: 'admin',
            password: 'admin123'
          })
          .expect(200);

    expect(res.body.authToken).to.not.be.undefined;
	});


});
