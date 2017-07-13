const {expect} = require('chai');
const _ = require('lodash');

const [server, utils] = require('./index');
const User = require('../src/models/user');
const DATA = require('./mock');

describe('Users', () => {
  let adminToken;
  let user;

  beforeEach(async () => {
    await User.removeAll();

    DATA.admin.password = 'admin123';
    await User.create(DATA.admin);
    user = await User.create(DATA.user);

    adminToken = await utils.login('admin@admin.com', 'admin123');
  });

	it('GET /users', async () => {
    const res = await utils.request.get('users')
      .set('Authorization', adminToken)
      .expect(200);

    expect(res.body.length === 2).to.be.true;
	});

	it('GET /users/{userId}', async () => {
    const res = await utils.request.get('users/' + user._id)
      .set('Authorization', adminToken)
      .expect(200);

    expect(String(res.body._id)).to.equal(String(user._id));
    expect(res.body).to.have.all.keys('_id', 'name', 'email', 'scope', 'created_at', 'updated_at');
    expect(res.body).to.not.have.all.keys('password');
	});

	it('POST /users', async () => {
    const res = await utils.request.post('users')
      .set('Authorization', adminToken)
      .send({
        name: 'Test',
        email: 'test@test.com',
        password: 'test'
      })
      .expect(201);

    expect(res.body).to.not.be.undefined;
    expect(res.body).to.have.all.keys('_id', 'name', 'email', 'scope', 'created_at', 'updated_at');
    expect(res.body.name).to.equal('Test');
    expect(res.body.email).to.equal('test@test.com');
	});

});
