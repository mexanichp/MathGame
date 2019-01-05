const actions = Object.freeze({
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  REFRESH: 'refresh',
  NEW_ROUND: 'new round',
  NEW_USER: 'new user joined',
  ANSWER: 'answer'
});

const userType = Object.freeze({
  ACTIVE: 1,
  IN_QUEUE: 2
});

module.exports =  { 
  actions,
  userType 
};