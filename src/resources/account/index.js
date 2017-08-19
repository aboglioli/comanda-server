const Joi = require('joi');

const AccountHandler = require('./handlers');

module.exports = [
  {
    path: '/login',
    method: 'POST',
    config: {
      handler: {
        async: AccountHandler.login
      },
      auth: {
        strategy: 'jwt',
        mode: 'try'
      },
      description: 'Create login session',
      tags: ['api', 'account'],
      validate: {
        payload: {
          user: Joi.string().required(),
          password: Joi.string().required()
        }
      }
    }
  }
];
