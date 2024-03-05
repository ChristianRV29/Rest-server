const { v4: uuid } = require('uuid')

class Message {
  constructor(content, sender, receptor) {
    this.id = uuid()
    this.content = content
    this.receptor = receptor
    this.sender = sender
    this.timestamp = new Date()
  }
}

class Chat {
  constructor() {
    this.messages = []
    this.users = {}
  }

  get lastTenMessages() {
    this.messages = this.messages.slice(-10)

    return this.messages
  }

  sendMessage(content, sender, receptor) {
    const message = new Message(content, sender, receptor)

    this.messages.push(message)

    return message
  }

  get usersList() {
    return Object.values(this.users)
  }

  addUser(user) {
    this.users[user.id] = user
  }

  removeUser(userId) {
    delete this.users[userId]
  }
}

module.exports = Chat
