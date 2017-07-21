const {expect} = require('chai');
const _ = require('lodash');

const [server, utils] = require('./index');
const User = require('../src/models/user');

describe('Users', () => {
  let adminToken;
  let data;

  beforeEach(async () => {
    data = await utils.mockData();
    adminToken = await utils.login();
  });

  // Admin
	it('GET /users', async () => {
    const res = await utils.request.get('users')
      .set('Authorization', adminToken)
      .expect(200);

    expect(res.body.length).to.equal(2);
	});

	it('GET /users/{userId}', async () => {
    const res = await utils.request.get('users/' + data.user._id)
      .set('Authorization', adminToken)
      .expect(200);

    expect(String(res.body._id)).to.equal(String(data.user._id));
    expect(res.body).to.have.all.keys('_id', 'name', 'user', 'email', 'scope', 'created_at', 'updated_at');
    expect(res.body).to.not.have.all.keys('password');
	});

	it('POST /users', async () => {
    const res = await utils.request.post('users')
      .set('Authorization', adminToken)
      .send({
        name: 'Test',
        user: 'test',
        email: 'test@test.com',
        password: 'test'
      })
      .expect(201);

    expect(res.body).to.not.be.undefined;
    expect(res.body).to.have.all.keys('_id', 'name', 'user', 'email', 'scope', 'created_at', 'updated_at');
    expect(res.body.name).to.equal('Test');
    expect(res.body.email).to.equal('test@test.com');
	});

	it('PUT /users/{userId}', async () => {
    const res = await utils.request.put('users/' + data.user._id)
          .set('Authorization', adminToken)
          .send({
            name: 'UserName'
          })
          .expect(200);

    expect(res.body).to.not.be.undefined;
    expect(res.body).to.have.all.keys('_id', 'name', 'user', 'email', 'scope', 'created_at', 'updated_at');
    expect(res.body._id).to.equal(String(data.user._id));
    expect(res.body.name).to.equal('UserName');
    expect(res.body.email).to.equal('user@user.com');
	});

  // User
	it('GET /users/me', async () => {
    const res = await utils.request.get('users/me')
          .set('Authorization', adminToken)
          .expect(200);

    expect(res.body).to.not.be.undefined;
    expect(res.body).to.have.all.keys('_id', 'name', 'user', 'email', 'scope', 'created_at', 'updated_at');
    expect(res.body.name).to.equal('Admin');
    expect(res.body.user).to.equal('admin');
    expect(res.body.email).to.equal('admin@admin.com');
	});

	it('PUT /users/me', async () => {
    const res = await utils.request.put('users/me')
          .set('Authorization', adminToken)
          .send({
            name: 'NewName'
          })
          .expect(200);

    expect(res.body).to.not.be.undefined;
    expect(res.body).to.have.all.keys('_id', 'name', 'user', 'email', 'scope', 'created_at', 'updated_at');
    expect(res.body.name).to.equal('NewName');
    expect(res.body.user).to.equal('admin');
    expect(res.body.email).to.equal('admin@admin.com');
	});

});
