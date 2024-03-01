const socket = io()

socket.on('server-message', (payload) => {
  const { message } = payload

  console.log('Message received on client:', message)
})

socket.emit('client-message', { message: 'Hello from the client' })
