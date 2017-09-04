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

  socket.on('createMessage', (message) => {
    const createMessage = _.pick(message, ['from', 'text']);
    createMessage.created = new Date().getTime();
    io.emit('newMessage', createMessage);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Started at port ${port}`);
});
