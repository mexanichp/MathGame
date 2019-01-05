const userManageService = require('./user-manage-service');
const questionService = require('./question-service');
const { actions } = require('./actions');

const websocketService = class WebsocketService {
  onConnect(socket, io) {
    console.log('Connected client');
    socket.on(actions.NEW_USER, m => {
      userManageService.addNewUser(Object.assign({ id: socket.id }, m));
      io.emit(actions.REFRESH);
    });

    socket.on(actions.ANSWER, data => {
      if (questionService.isAnswered === true) {
        return;
      }

      let indexOf = -1;
      for (let i = 0; i < userManageService.activeUsers.length; i++) {
        if (userManageService.activeUsers[i].id === socket.id) {
          indexOf = i;
        }
      }
      if (indexOf === -1) {
        return;
      }

      userManageService.activeUsers[indexOf].isUserVoted = true;
      if (data === 'yes') {
        if (questionService.isProposedAnswerCorrect === true) {
          questionService.isAnswered = true;
          userManageService.activeUsers[indexOf].score++;
        } else {
          userManageService.activeUsers[indexOf].score--;
        }
      } else if (data === 'no') {
        if (questionService.isProposedAnswerCorrect === false) {
          questionService.isAnswered = true;
          userManageService.activeUsers[indexOf].score++;
        } else {
          userManageService.activeUsers[indexOf].score--;
        }
      }
    })

    socket.on(actions.DISCONNECT, () => {
      console.log('Client disconnected %s', socket.id);
      userManageService.removeUser(socket.id);
      io.emit(actions.REFRESH);
    });
  }
}

module.exports = websocketService;