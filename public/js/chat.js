const socket = io();
const converter = new showdown.Converter()

socket.on('connect', function () {
  const params = $.deparam(window.location.search);

  socket.emit('join', params, function(err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    }
    else {
      console.log('no err');
    }
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server.');
});

socket.on('updateUserList', function(users) {
  const ol = $('<ol></ol>');

  users.forEach(function(user) {
    ol.append($('<li></li>').text(user));
  });

  $('#users').html(ol);
});

socket.on('newMessage', function (message) {
  const template = $('#message-template').html();
  const formattedTime = moment(message.created).format('hh:mm:ss');
  let html = Mustache.render(template, {
    created: formattedTime,
    from: message.from,
    text: converter.makeHtml(message.text)
  });

  $('#messages').append(html);
  scrollToBottom();
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
  scrollToBottom();
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
  socket.emit('createMessage', { text }, function (res) {
    console.log(res);
  });
}

function clearForm () {
  jQuery('#message-form').trigger('reset');
  jQuery('[name="message"]').focus();
}

function scrollToBottom() {
  // Selectors
  const messages = $('#messages');
  const newMessage = messages.children('li:last-child');
  // Heights
  const clientHeight = messages.prop('clientHeight');
  const scrollTop = messages.prop('scrollTop');
  const scrollHeight = messages.prop('scrollHeight');
  const newMessageHeight = newMessage.innerHeight();
  const lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}
