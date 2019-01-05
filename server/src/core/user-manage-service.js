const { maxActiveUsers } = require('./config');
const Queue = require('./helpers/queue');
const {userType} = require('./actions');

const result = {
  activeUsers: [],
  usersInQueue: new Queue(),

  addNewUser(user) {
    if (this.activeUsers.length < maxActiveUsers) {
      user.type = userType.ACTIVE;
      this.activeUsers.push(user);
    } else {
      user.type = userType.IN_QUEUE;
      this.enqueueUser(user);
    }
  },

  getAllUsers() {
    const sortByScore = (a, b) => {
      if (a.score === b.score) {
        return 0;
      }

      if (a.score > b.score) {
        return 1;
      }

      if (a.score < b.score) {
        return -1;
      }
    }

    const queuedItems = this.usersInQueue.returnAllItemsInOrder();

    return [...this.activeUsers.sort(sortByScore), ...queuedItems]
  },

  removeUser(id) {
    let indexOf = -1;
    for (let i = 0; i < this.activeUsers.length; i++) {
      if (this.activeUsers[i].id === id) {
        indexOf = i;
        break;
      }
    }

    if (indexOf !== -1) {
      this.activeUsers.splice(indexOf, 1);
      
      return;
    }

    if (this.usersInQueue.count === 0) {
      return;
    }

    this.usersInQueue.remove((item) => item.id === id);
  },

  fulfillActiveUsers() {
    console.log(this.activeUsers, this.usersInQueue);
    while (this.activeUsers.length < maxActiveUsers && this.usersInQueue.count > 0) {
      const user = this.dequeueUser();
      user.type = userType.ACTIVE;
      this.activeUsers.push(user);
    }
  },

  enqueueUser(user) {
    this.usersInQueue.enqueue(user);
  },

  dequeueUser() {
    return this.usersInQueue.dequeue();
  }
};

result.removeUser.bind(result);
result.fulfillActiveUsers.bind(result);
result.enqueueUser.bind(result);
result.dequeueUser.bind(result);
result.addNewUser.bind(result);
result.getAllUsers.bind(result);

module.exports = result;