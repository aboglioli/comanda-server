const {expect} = require('chai');

const [server, utils] = require('./index');
const User = require('../src/models/user');

describe('Users', () => {
  let adminToken;
  let user;

  beforeEach(async () => {
    await User.removeAll();

    await User.create({
      name: 'Admin',
      email: 'admin@admin.com',
      password: '123456',
      scope: ['admin']
    });

    user = await User.create({
      name: 'User',
      email: 'user@user.com',
      password: 'user123'
    });

    adminToken = await utils.login('admin@admin.com', '123456');
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
