const Joi = require('joi');

const ConfigurationHandler = require('./handlers');

module.exports = [
  {
    path: '',
    method: 'GET',
    config: {
      handler: {
        async: ConfigurationHandler.get
      },
      description: 'Get global configuration',
      tags: ['api', 'configuration'],
      validate: {
        headers: Joi.object({
          authorization: Joi.string().required()
        }).unknown()
      }
    }
  }
];
