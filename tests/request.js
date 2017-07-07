const supertest = require('supertest-as-promised');
const request = require('request');

const config = require('../src/config');

const prefix = `/${config.app.routes.prefix}/${config.app.routes.version}`;
const httpActions = ['get', 'post', 'put', 'patch', 'delete'];

function requester(server) {
  if(!server) {
    // simple request
    return (options) => {
      const url = `http://localhost:${config.app.port}${prefix}`;

      options = Object.assign({}, {
        method: 'get',
        headers: {
          'content-type': 'application/json'
        },
        json: true
      }, options);

      options.url = `${url}/${options.url}`;

      return new Promise((resolve, reject) => {
        request(options, (err, response, body) => {
          resolve(body);
        });
      });
    };
  }

  // request with supertest
  const r = supertest(server.listener);

  return httpActions.reduce((methods, action) => {
    methods[action] = (endpoint) =>
      r[action](`${prefix}/${endpoint}`)
        .expect('Content-Type', /json/);

    return methods;
  }, {});
}

module.exports = requester;
