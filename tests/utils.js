const _ = require('lodash');

const request = require('request');
const User = require('../src/models/user');

exports.login = async () => {
  const options = {
    method: 'post',
    url: 'http://localhost:3000/api/v1/account/login',
    headers: {
      'content-type': 'application/json'
    },
    json: true,
    form: {user: 'admin', password: 'admin123'}
  };

  return new Promise((resolve, reject) => {
    request(options, (err, response, body) => {
      adminToken = body.authToken;
      resolve(adminToken);
    });
  });
};

exports.omitDeep = (collection, excludeKeys) => {
  function omitFn(value) {
    if (value && typeof value === 'object') {
      excludeKeys.forEach((key) => {
        delete value[key];
      });
    }
  }

  return _.cloneDeepWith(collection, omitFn);
};
