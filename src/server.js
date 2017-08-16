const Hapi = require('hapi');
const corsHeaders = require('hapi-cors-headers');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');

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

// socket.io server
server.register(require('./socket'), function (err) {
  if (err) {
    console.error(err);
    process.exit(1);
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
  }], (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });

server.register(require('hapi-auth-jwt2'), err => {
  if(err) {
    console.error(err);
    process.exit(1);
  }

  server.auth.strategy('jwt', 'jwt', {
    key: config.app.jwtKey,
    validateFunc: authenticate,
    verifyOptions: {
      algorithms: ['HS256']
    }
  });

  server.route(routes);
});

server.ext('onPreResponse', corsHeaders);

server.start((err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Server running at:', server.info.uri);
});

module.exports = server;
