const socket = io();

socket.on('connect', function () {
  console.log('Connected to server.');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server.');
});

socket.on('newMessage', function (message) {
  console.log(`${message.created} ${message.from}: ${message.text}`);
});

function sendMessage (from, text) {
  socket.emit('createMessage', { from, text });
}
