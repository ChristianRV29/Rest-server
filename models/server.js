const express = require('express')
const cors = require('cors')

const router = require('./../routes/user.routes')
const { dbConnection } = require('./../database/config')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT || 8080

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
    this.app.use('/api/user', router)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening at http://localhost:${this.port}`)
    })
  }
}

module.exports = Server
