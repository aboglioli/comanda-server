const Joi = require('joi');

const UsersHandler = require('./handlers');

module.exports = [
  {
    path: '',
    method: 'GET',
    config: {
      handler: {
        async: UsersHandler.get
      },
      auth: {
        strategy: 'jwt',
        scope: 'admin'
      },
      description: 'Get all the users',
      tags: ['api', 'users'],
      validate: {
        headers: Joi.object({
          authorization: Joi.string().required()
        }).unknown()
      }
    }
  },
  {
    path: '/{userId}',
    method: 'GET',
    config: {
      handler: {
        async: UsersHandler.getById
      },
      auth: {
        strategy: 'jwt',
        scope: 'admin'
      },
      description: 'Get user by id',
      tags: ['api', 'users'],
      validate: {
        headers: Joi.object({
          authorization: Joi.string().required()
        }).unknown(),
        params: {
          userId: Joi.string().required()
        }
      }
    }
  },
  {
    path: '',
    method: 'POST',
    config: {
      handler: {
        async: UsersHandler.post
      },
      auth: {
        strategy: 'jwt',
        scope: 'admin'
      },
      description: 'Create user',
      tags: ['api', 'users'],
      validate: {
        payload: {
          name: Joi.string().optional(),
          email: Joi.string().email().required(),
          password: Joi.string().required(),
          scope: Joi.array().items(Joi.string()).optional()
        },
        headers: Joi.object({
          authorization: Joi.string().required()
        }).unknown()
      }
    }
  }
];
