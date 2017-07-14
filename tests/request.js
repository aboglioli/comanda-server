const supertest = require('supertest-as-promised');

const config = require('../src/config');

const prefix = `/${config.app.routes.prefix}/${config.app.routes.version}`;
const httpActions = ['get', 'post', 'put', 'patch', 'delete'];

module.exports = (server) => {
  // request with supertest
  const r = supertest(server.listener);

  return httpActions.reduce((methods, action) => {
    methods[action] = (endpoint) =>
      r[action](`${prefix}/${endpoint}`)
        .expect('Content-Type', /json/);

    return methods;
  }, {});
};
