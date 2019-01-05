const {WebsocketService, enums, userManageService} = require('./index');


const websocketService = new WebsocketService();

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const portNumber = process.env.PORT || 5051;

const app = express();
const server = http.Server(app);
const io = socketIO(server);

io.on(enums.actions.CONNECT,  (socket) => websocketService.onConnect(socket, io));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/users', (req, res) => {
  console.log('users invoked');
  res.send(userManageService.getAllUsers());
});

app.use('/*', (req, res) => {
  res.status(200).send();
});

server.listen(portNumber, () => {
  console.log(`Server is running on port: ${portNumber}`);
});