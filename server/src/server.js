const { WebsocketService, enums, userManageService, questionService } = require('./index');


const websocketService = new WebsocketService();

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const portNumber = process.env.PORT || 5051;

const app = express();
const server = http.Server(app);
const io = socketIO(server);

io.on(enums.actions.CONNECT, (socket) => websocketService.onConnect(socket, io));

let interval = setInterval(() => {
  userManageService.fulfillActiveUsers();
  if (userManageService.activeUsers.length > 1) {
    questionService.fulfillQuestionAndOptions();
    io.emit(enums.actions.NEW_ROUND);
  }
  io.emit(enums.actions.REFRESH);
}, 5250)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/users', (req, res) => {
  console.log('users invoked');
  res.send(userManageService.getAllUsers());
});

app.use('/questions', (req, res) => {
  console.log('questions invoked');
  const { question, proposedAnswer } = questionService;
  res.send({ question, proposedAnswer });
});

app.use('/*', (req, res) => {
  res.status(200).send();
});

server.listen(portNumber, () => {
  console.log(`Server is running on port: ${portNumber}`);
});