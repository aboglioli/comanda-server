const joinUrl = require('url-join');

exports.buildRoutes = function (config, routes) {
  let endpoints = [];

  Object.keys(routes).forEach(key => {
    endpoints = [
      ...endpoints,
      ...routes[key].map(route => {
        if(route.path) {
          route.path = joinUrl(
            config.prefix,
            config.version,
            key,
            route.path
          );
        } else {
          route.path = joinUrl(
            config.prefix,
            config.version,
            key
          );
        }

        route.path = '/' + route.path;

        return route;
      })
    ];
  });

  return endpoints;
};
