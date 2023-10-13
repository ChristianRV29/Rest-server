const express = require('express')
const cors = require('cors')

const router = require('./../routes/user.routes')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT || 8080

    // Middlewares
    this.middlewares()

    // Routes of my application
    this.routes()
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
