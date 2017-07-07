const {expect} = require('chai');

const [server, utils] = require('./index');
const User = require('../src/models/user');

describe('Account', () => {
  let admin;
  let user;

  beforeEach(async () => {
    await User.removeAll();

    admin = await User.create({
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
  });

	it('GET /account', async () => {
    let res = await utils.request.post('account/login')
          .send({email: 'user@user.com', password: 'user123'})
          .expect(200);

    expect(res.body.authToken).to.not.be.undefined;

    const authToken = res.body.authToken;

    res = await utils.request.get('account')
        .set('Authorization', authToken)
        .expect(200);

    expect(res.body).to.have.all.keys('_id', 'name', 'email', 'scope', 'created_at', 'updated_at');
    expect(res.body.name).to.equal(user.name);
    expect(res.body.email).to.equal(user.email);
    expect(res.body.scope).to.be.an('array');
    expect(res.body.scope.length).to.equal(0);
	});


	it('PUT /account', async () => {
    let res = await utils.request.post('account/login')
        .send({email: 'user@user.com', password: 'user123'})
        .expect(200);

    expect(res.body.authToken).to.not.be.undefined;

    const authToken = res.body.authToken;

    // Update 'name'
    res = await utils.request.put('account')
      .set('Authorization', authToken)
      .send({name: 'NewName'})
      .expect(200);

    expect(res.body).to.have.all.keys('_id', 'name', 'email', 'scope', 'created_at', 'updated_at');
    expect(res.body).to.not.have.all.keys('password');
    expect(res.body.name).to.equal('NewName');
    expect(res.body.email).to.equal('user@user.com');

    // Update 'email'
    res = await utils.request.put('account')
      .set('Authorization', authToken)
      .send({email: 'newemail@user.com'})
      .expect(200);

    expect(res.body).to.have.all.keys('_id', 'name', 'email', 'scope', 'created_at', 'updated_at');
    expect(res.body).to.not.have.all.keys('password');
    expect(res.body.name).to.equal('NewName');
    expect(res.body.email).to.equal('newemail@user.com');

    // Update 'password' and re-login
    res = await utils.request.put('account')
      .set('Authorization', authToken)
      .send({password: 'newpassword'})
      .expect(200);

    expect(res.body).to.not.be.undefined;

    res = await utils.request.post('account/login')
      .send({email: 'newemail@user.com', password: 'user123'})
      .expect(400);

    res = await utils.request.post('account/login')
      .send({email: 'newemail@user.com', password: 'newpassword'})
      .expect(200);

    expect(res.body.authToken).to.not.be.undefined;
	});

	it('POST /account/login', async () => {
    let res = await utils.request.post('account/login')
      .send({email: 'admin@admin.com', password: '123456'})
      .expect(200);

    expect(res.body.authToken).to.not.be.undefined;
    expect(res.body.authToken.length > 20).to.equal(true);

    res = await utils.request.post('account/login')
      .send({email: 'admin@admin.com', password: '123457'}) // wrong password
      .expect(400);

    expect(res.body.authToken).to.be.undefined;
    expect(res.body.message).to.not.be.undefined;
	});

	it('POST /account/register new user', async () => {
    let res = await utils.request.post('account/register')
      .send({name: 'Test', email: 'test@test.com', password: 'test123'})
      .expect(201);

    expect(res.body).to.have.keys('_id', 'name','email', 'scope', 'created_at', 'updated_at');

    res = await utils.request.post('account/login')
      .send({email: 'test@test.com', password: '123456'}) // wrong password
      .expect(400);

    expect(res.body.message).to.not.be.undefined;

    res = await utils.request.post('account/login')
      .send({email: 'test@test.com', password: 'test123'})
      .expect(200);

    expect(res.body.authToken).to.not.be.undefined;
    expect(res.body.authToken.length > 20).to.equal(true);
	});

	it('POST /account/register existing email', async () => {
    let res = await utils.request.post('account/register')
        .send({name: 'Test', email: 'user@user.com', password: 'test123'})
        .expect(409);

    expect(res.body.message).to.not.be.undefined;
	});
});
