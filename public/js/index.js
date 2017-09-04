const socket = io();

socket.on('connect', function () {
  console.log('Connected to server.');

  socket.emit('createMessage', {
    from: 'Bob',
    text: 'This is my createMessage.'
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server.');
});

socket.on('newMessage', function (message) {
  console.log('New message');
  console.log(JSON.stringify(message, null, 2));
});
