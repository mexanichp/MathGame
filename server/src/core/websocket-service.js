const userManageService = require('./user-manage-service');
const {actions, userType} = require('./actions');

const websocketService = class WebsocketService {
  onConnect(socket, io) {
    console.log('Connected client');
    socket.on(actions.NEW_ROUND, data => {
      console.log('new roound')
      userManageService.fulfillActiveUsers();
      io.emit(actions.REFRESH);
    });

    socket.on(actions.NEW_USER, m => {
      console.log('new user', m)
      userManageService.addNewUser(Object.assign({id: socket.id}, m));
      console.log(userManageService.getAllUsers());
      io.emit(actions.REFRESH);      
    });

    socket.on(actions.DISCONNECT, () => {
      console.log('Client disconnected %s', socket.id);
      userManageService.removeUser(socket.id);
      userManageService.fulfillActiveUsers();
      io.emit(actions.REFRESH);
    });
  }
}

module.exports = websocketService;