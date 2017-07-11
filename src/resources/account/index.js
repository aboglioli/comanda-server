const Joi = require('joi');

const AccountHandler = require('./handlers');

module.exports = [
  {
    path: '',
    method: 'GET',
    config: {
      handler: {
        async: AccountHandler.get
      },
      auth: {
        strategy: 'jwt'
      },
      description: 'Get user account details',
      tags: ['api', 'account'],
      validate: {
        headers: Joi.object({
          authorization: Joi.string().required()
        }).unknown()
      }
    }
  },
  {
    path: '',
    method: 'PUT',
    config: {
      handler: {
        async: AccountHandler.put
      },
      auth: {
        strategy: 'jwt'
      },
      description: 'Update account',
      tags: ['api', 'account'],
      validate: {
        payload: {
          name: Joi.string().optional(),
          email: Joi.string().email().optional(),
          password: Joi.string().optional()
        },
        headers: Joi.object({
          authorization: Joi.string().required()
        }).unknown()
      }
    }
  },
  {
    path: '/login',
    method: 'POST',
    config: {
      handler: {
        async: AccountHandler.login
      },
      description: 'Create login session',
      tags: ['api', 'account'],
      validate: {
        payload: {
          email: Joi.string().email().required(),
          password: Joi.string().required()
        }
      }
    }
  },
  {
    path: '/register',
    method: 'POST',
    config: {
      handler: {
        async: AccountHandler.register
      },
      description: 'Register a new account',
      tags: ['api', 'account'],
      validate: {
        payload: {
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          password: Joi.string().min(6).required()
        }
      }
    }
  },
]
