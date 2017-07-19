const Joi = require('joi');

const UsersHandler = require('./handlers');

module.exports = [
  // Admin
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
          user: Joi.string().required(),
          password: Joi.string().required(),
          name: Joi.string().optional(),
          email: Joi.string().email().optional(),
          scope: Joi.array().items(Joi.string()).optional()
        },
        headers: Joi.object({
          authorization: Joi.string().required()
        }).unknown()
      }
    }
  },
  {
    path: '/{userId}',
    method: 'PUT',
    config: {
      handler: {
        async: UsersHandler.put
      },
      auth: {
        strategy: 'jwt',
        scope: 'admin'
      },
      description: 'Update user by id',
      tags: ['api', 'users'],
      validate: {
        payload: {
          user: Joi.string().optional(),
          name: Joi.string().optional(),
          email: Joi.string().email().optional(),
          password: Joi.string().optional(),
          scope: Joi.array().items(Joi.string()).optional()
        },
        params: {
          userId: Joi.string().required()
        },
        headers: Joi.object({
          authorization: Joi.string().required()
        }).unknown()
      }
    }
  },
  {
    path: '/{userId}',
    method: 'DELETE',
    config: {
      handler: {
        async: UsersHandler.delete
      },
      auth: {
        strategy: 'jwt',
        scope: 'admin'
      },
      description: 'Delete user by id',
      tags: ['api', 'users'],
      validate: {
        params: {
          userId: Joi.string().required()
        },
        headers: Joi.object({
          authorization: Joi.string().required()
        }).unknown()
      }
    }
  },
  // User
  {
    path: '/me',
    method: 'GET',
    config: {
      handler: {
        async: UsersHandler.getMe
      },
      auth: {
        strategy: 'jwt'
      },
      description: 'Get logged in user',
      tags: ['api', 'users'],
      validate: {
        headers: Joi.object({
          authorization: Joi.string().required()
        }).unknown()
      }
    }
  },
  {
    path: '/me',
    method: 'PUT',
    config: {
      handler: {
        async: UsersHandler.putMe
      },
      auth: {
        strategy: 'jwt'
      },
      description: 'Update logged in user',
      tags: ['api', 'users'],
      validate: {
        payload: {
          user: Joi.string().optional(),
          name: Joi.string().optional(),
          email: Joi.string().email().optional(),
          password: Joi.string().optional(),
          scope: Joi.array().items(Joi.string()).optional()
        },
        headers: Joi.object({
          authorization: Joi.string().required()
        }).unknown()
      }
    }
  },
];
