const socket = io();

socket.on('connect', function () {
  console.log('Connected to server.');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server.');
});

socket.on('newMessage', function (message) {
  const li = jQuery('<li></li>');
  li.text(`${message.created} ${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  sendMessage('User', jQuery('[name=message]').val());
  jQuery('#message-form').trigger('reset');
  jQuery('[name="message"]').focus();
});

function sendMessage (from, text) {
  socket.emit('createMessage', { from, text }, function (res) {
    console.log(res);
  });
}
