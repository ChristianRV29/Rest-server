const { createServer } = require('http')
const { Server: SocketServer } = require('socket.io')
const cors = require('cors')
const express = require('express')
const fileUpload = require('express-fileupload')

const authRouter = require('../routes/auth.routes')
const usersRouter = require('../routes/user.routes')
const categoryRouter = require('../routes/category.routes')

const { dbConnection } = require('../database/config')
const { socketController } = require('../sockets')

class Server {
  constructor() {
    this.app = express()
    this.server = createServer(this.app)
    this.io = new SocketServer(this.server)

    this.port = process.env.PORT || 8080
    this.paths = {
      auth: '/api/auth',
      categories: '/api/category',
      users: '/api/user'
    }

    // Middlewares
    this.middlewares()

    // Routes of my application
    this.routes()

    // Connect to data base
    this.connectDB()

    this.sockets()
  }

  async connectDB() {
    await dbConnection()
  }

  sockets() {
    this.io.on('connection', (socket) => socketController(socket, this.io))
  }

  middlewares() {
    // CORS
    this.app.use(cors())

    this.app.use(express.json())

    // Public directory
    this.app.use(express.static('public'))

    this.app.use(
      fileUpload({
        useTempFiles: true,
        createParentPath: true
      })
    )
  }

  routes() {
    this.app.use(this.paths.auth, authRouter)
    this.app.use(this.paths.users, usersRouter)
    this.app.use(this.paths.categories, categoryRouter)
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server listening at http://localhost:${this.port}`)
    })
  }
}

module.exports = Server
