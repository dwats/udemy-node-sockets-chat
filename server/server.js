const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const _ = require('lodash');

const { generateMessage } = require('./utils/message');

require('./config/config');
const publicPath = path.join(`${__dirname}/../public`);
const port = process.env.PORT;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('User connected');

  socket.emit('newMessage', generateMessage('admin', 'Welcome to the chat!'));
  socket.broadcast.emit('newMessage', generateMessage('admin', 'A new user has joined the chat.'));

  socket.on('createMessage', (message) => {
    const createMessage = _.pick(message, ['from', 'text']);
    io.emit('newMessage', generateMessage(createMessage.from, createMessage.text));
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    socket.broadcast.emit('newMessage', generateMessage('admin', 'A user has left the chat.'));
  });

});

server.listen(port, () => {
  console.log(`Started at port ${port}`);
});
