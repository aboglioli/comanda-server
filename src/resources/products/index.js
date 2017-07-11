const Joi = require('joi');

const ProductHandler = require('./product.handler');
const RawProductHandler = require('./raw-product.handler');

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
          name: Joi.string().required()
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
          subproducts: Joi.array().items(Joi.object({
            quantity: Joi.number(),
            product: Joi.string()
          })).optional(),
          rawProducts: Joi.array().items(Joi.object({
            quantity: Joi.number(),
            unit: Joi.string(),
            product: Joi.string()
          })).optional()
        },
        headers: Joi.object({
          authorization: Joi.string().required()
        }).unknown()
      }
    }
  },
  {
    path: '/raw',
    method: 'POST',
    config: {
      handler: {
        async: RawProductHandler.post
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
          price: Joi.object({
            value: Joi.number().required(),
            unit: Joi.object({
              value: Joi.number().required(),
              name: Joi.string().required()
            }).required()
          }).required()
        },
        headers: Joi.object({
          authorization: Joi.string().required()
        }).unknown()
      }
    }
  }
];
