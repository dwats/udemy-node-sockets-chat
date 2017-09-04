const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const _ = require('lodash');

require('./config/config');
const publicPath = path.join(`${__dirname}/../public`);
const port = process.env.PORT;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('User connected');

  socket.emit('newMessage', { from: 'admin', text: 'Welcome to the chat!', created: new Date().getTime() });
  socket.broadcast.emit('newMessage', { from: 'admin', text: 'A new user has joined the chat.', created: new Date().getTime() });


  socket.on('createMessage', (message) => {
    const createMessage = _.pick(message, ['from', 'text']);
    createMessage.created = new Date().getTime();
    io.emit('newMessage', createMessage);
    // socket.broadcast.emit('newMessage', createMessage);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    socket.broadcast.emit('newMessage', { from: 'admin', text: 'A user has left the chat.', created: new Date().getTime() });
  });
});

server.listen(port, () => {
  console.log(`Started at port ${port}`);
});
