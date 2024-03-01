const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const authRouter = require('../routes/auth.routes')
const usersRouter = require('../routes/user.routes')
const categoryRouter = require('../routes/category.routes')

const { dbConnection } = require('../database/config')

class Server {
  constructor() {
    this.app = express()
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
  }

  async connectDB() {
    await dbConnection()
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
    this.app.listen(this.port, () => {
      console.log(`Example app listening at http://localhost:${this.port}`)
    })
  }
}

module.exports = Server
