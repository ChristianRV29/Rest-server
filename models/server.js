const express = require('express')
const cors = require('cors')

const {
  Auth: AuthRouter,
  Categories: CategoriesRouter,
  Users: UsersRouter
} = require('../routes')

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
  }

  routes() {
    this.app.use(this.paths.auth, AuthRouter)
    this.app.use(this.paths.users, UsersRouter)
    this.app.use(this.paths.categories, CategoriesRouter)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening at http://localhost:${this.port}`)
    })
  }
}

module.exports = Server
