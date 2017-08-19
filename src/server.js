const Hapi = require('hapi');
const corsHeaders = require('hapi-cors-headers');
const Nes = require('nes');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Jwt2 = require('hapi-auth-jwt2');

const config = require('./config');
const routes = require('./routes');
const { authenticate } = require('./core/authentication');

// Hapi server
const server = new Hapi.Server();

server.connection({
  host: config.app.host,
  port: config.app.port,
  routes: {
    cors: {
      origin: ['*'],
      credentials: true,
      additionalHeaders: ['Origin', 'Access-Control-Allow-Origin']
    }
  }
});

// config
if (config.app.logging) {
  server.ext({
    type: 'onRequest',
    method: (request, reply) => {
      const path = request.path;

      if(path.startsWith('/docs') || path.startsWith('/swagger'))
        return reply.continue();

      console.log(request.method.toUpperCase(), request.path, request.query);

      return reply.continue();
    }
  });
}

// register
server.register(require('hapi-async-handler'), function(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});

server.register([
  Inert,
  Vision,
  {
    register: HapiSwagger,
    options: config.swagger
  }
], (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});

server.register([
  Jwt2,
  Nes
], err => {
  if(err) {
    console.error(err);
    process.exit(1);
  }

  // set auth strategy
  server.auth.strategy('jwt', 'jwt', 'required', {
    key: config.app.jwtKey,
    validateFunc: authenticate,
    verifyOptions: {
      algorithms: ['HS256']
    }
  });

  // define routes
  server.route(routes);

  // subscriptions
  server.subscription('/hello', {
    auth: {
      mode: 'required'
    },
    filter (path, message, options, next) {
      console.log('user > ', options.credentials.user);
      return next(true);
    }
  });

  // start server
  server.start((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
  });
});

server.ext('onPreResponse', corsHeaders);

module.exports = server;
