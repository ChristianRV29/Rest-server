const jwt = require('jsonwebtoken')

const SECRET_KEY = process.env.SECRET_KEY || ''

const generateToken = (uid = '') =>
  new Promise((resolve, reject) => {
    const payload = { uid }

    const options = {
      expiresIn: '4h'
    }

    jwt.sign(payload, SECRET_KEY, options, (err, token) => {
      if (err) reject('Could not generate the token')
      else resolve(token)
    })
  })

module.exports = {
  generateToken
}
