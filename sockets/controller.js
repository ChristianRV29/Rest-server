const { Chat } = require('../models')
const { checkUserToken } = require('../helpers')
const { Socket } = require('socket.io')

const chatHandler = new Chat()

const socketController = async (socket = new Socket(), io) => {
  const token = socket.handshake.headers['x-token'] || ''

  const user = await checkUserToken(token)

  if (!user) {
    return socket.disconnect()
  }

  chatHandler.addUser(user)
  io.emit('active-users', chatHandler.usersList)

  socket.on('disconnect', () => {
    chatHandler.removeUser(user.id)
    io.emit('active-users', chatHandler.usersList)
  })

  socket.on('message', ({ message, user }) => {
    chatHandler.sendMessage(message, user, null)

    io.emit('all-messages', chatHandler.lastTenMessages)
  })
}

module.exports = {
  socketController
}
