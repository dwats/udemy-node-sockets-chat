const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

require('./config/config');
const publicPath = path.join(`${__dirname}/../public`);
const port = process.env.PORT;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('User connected');

  socket.emit('newMessage', {
    from: 'Rob',
    text: 'This is my newMessage',
    created: new Date()
  });

  socket.on('createMessage', (message) => {
    console.log('New create message');
    console.log(JSON.stringify(message, null, 2));
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Started at port ${port}`);
});
