const socket = io();

socket.on('connect', function () {
  console.log('Connected to server.');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server.');
});

socket.on('newMessage', function (message) {
  const template = $('#message-template').html();
  const formattedTime = moment(message.created).format('hh:mm:ss');
  let html = Mustache.render(template, {
    created: formattedTime,
    from: message.from,
    text: message.text
  });
  $('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {
  const template = $('#location-message-template').html();
  const formattedTime = moment(message.created).format('hh:mm:ss');
  let html = Mustache.render(template, {
    created: formattedTime,
    from: message.from,
    url: message.url
  });
  $('#messages').append(html);
  // const li = jQuery('<li></li>');
  // const a = jQuery('<a target="_blank">My current location</a>');
  // const formattedTime = moment(message.created).format('hh:mm:ss');
  // li.text(`[${formattedTime}] ${message.from}: `);
  // a.attr('href', message.url);
  // li.append(a);
  // jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  sendMessage('User', jQuery('[name=message]').val());
  clearForm();
});

const locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }, function (res) {
      console.log(res);
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  });
  clearForm();
});

function sendMessage (from, text) {
  socket.emit('createMessage', { from, text }, function (res) {
    console.log(res);
  });
}

function clearForm () {
  jQuery('#message-form').trigger('reset');
  jQuery('[name="message"]').focus();
}
