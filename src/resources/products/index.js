const Joi = require('joi');

const ProductHandler = require('./handlers');

module.exports = [
  {
    path: '',
    method: 'GET',
    config: {
      handler: {
        async: ProductHandler.get
      },
      description: 'Get all the products',
      tags: ['api', 'products'],
      validate: {
        query: {
          name: Joi.string().optional(),
          type: Joi.string().valid('raw', 'single', 'combination').optional()
        }
      }
    }
  },
  {
    path: '/{productId}',
    method: 'GET',
    config: {
      handler: {
        async: ProductHandler.getById
      },
      description: 'Get product by id',
      tags: ['api', 'products'],
      validate: {
        params: {
          productId: Joi.string().required()
        }
      }
    }
  },
  {
    path: '',
    method: 'POST',
    config: {
      handler: {
        async: ProductHandler.post
      },
      auth: {
        strategy: 'jwt',
        scope: 'admin'
      },
      description: 'Create product',
      tags: ['api', 'products'],
      validate: {
        payload: {
          name: Joi.string().required(),
          description: Joi.string().optional(),
          type: Joi.string().valid('raw', 'single', 'combination').required(),
          price: Joi.object({
            value: Joi.number().required(),
            quantity: Joi.object({
              value: Joi.number().required(),
              unit: Joi.string().required()
            }).required()
          }).optional(),
          subproducts: Joi.array().items(Joi.object({
            quantity: Joi.object({
              value: Joi.number().required(),
              unit: Joi.string().required()
            }).required(),
            product: Joi.string().required()
          })).optional()
        },
        headers: Joi.object({
          authorization: Joi.string().required()
        }).unknown()
      }
    }
  }
];
