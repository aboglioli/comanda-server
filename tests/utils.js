const _ = require('lodash');

const request = require('./request')();

async function login(email, password) {
  const body = await request({
    method: 'post',
    url: 'account/login',
    form: {email, password}
  });

  return body.authToken;
}

function omitDeep(collection, excludeKeys) {
  function omitFn(value) {
    if (value && typeof value === 'object') {
      excludeKeys.forEach((key) => {
        delete value[key];
      });
    }
  }

  return _.cloneDeepWith(collection, omitFn);
}

module.exports = {
  omitDeep,
  login
};
