const { Socket } = require('socket.io')

const socketController = (socket = new Socket()) => {
  socket.emit('server-message', { message: 'Welcome to the server' })

  socket.on('client-message', (payload) => {
    const { message } = payload

    console.log('Message received on server:', message)
  })
}

module.exports = {
  socketController
}
