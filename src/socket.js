exports.register = function (server, options, next) {
  const io = require('socket.io')(server.listener);

  console.log('Setting up socket.io');
  io.on('connection', (socket) => {
    console.log('New socket connection');

    socket.on('ping', () => {
      socket.emit('pong');
    });
  });

  next();
};

exports.register.attributes = {
  name: 'socket.io'
};
