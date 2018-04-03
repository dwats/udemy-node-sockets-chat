const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const Users = require('./utils/users');

require('./config/config');
const publicPath = path.join(`${__dirname}/../public`);
const port = process.env.PORT;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('join', (params, cb) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return cb('Name and room name are required.');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('admin', 'Welcome to the chat!'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('admin', `${params.name} has joined`));
    return cb();
  });

  socket.on('createMessage', (message, cb) => {
    const user = users.getUser(socket.id);
    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
      return cb('Message Success');
    }
    return cb('Message Error');
  });

  socket.on('createLocationMessage', (coords, cb) => {
    const user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
      return cb('Location Success');
    }
    return cb('Location Message Error');
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
    const user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      socket.broadcast.to(user.room).emit('newMessage', generateMessage('admin', `${user.name} has left`));
    }
  });

});

server.listen(port, () => {
  console.log(`Started at port ${port}`);
});
