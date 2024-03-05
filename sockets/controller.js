const { Socket } = require('socket.io')
const { checkUserToken } = require('../helpers')

const socketController = async (socket = new Socket()) => {
  const token = socket.handshake.headers['x-token'] || ''

  const user = await checkUserToken(token)

  if (!user) {
    return socket.disconnect()
  }

  console.log('Client connected', user.name)
}

module.exports = {
  socketController
}
