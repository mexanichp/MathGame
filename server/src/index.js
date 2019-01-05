const aggregatedServices = {
  userManageService: require('./core/user-manage-service'),
  WebsocketService: require('./core/websocket-service'),
  enums: require('./core/actions')
}

module.exports = aggregatedServices;