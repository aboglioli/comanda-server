exports.register = function (server, options, next) {
  const io = require('socket.io')(server.listener);

  console.log('Setting up socket.io');
  io.on('connection', (socket) => {
    console.log('connected');

    socket.emit('hola', {content: 'hola'});

    console.log(server);

    socket.on('chau', (data) => {
      console.log('chau > ', data);
    });
  });

  next();
};

exports.register.attributes = {
  name: 'socket'
};
