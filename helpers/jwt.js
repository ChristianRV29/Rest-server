const jwt = require('jsonwebtoken')

const secretKey = process.env.SECRET_KEY || ''

const generateToken = (uid = '') =>
  new Promise((resolve, reject) => {
    const payload = { uid }

    const options = {
      expiresIn: '4h'
    }

    jwt.sign(payload, secretKey, options, (err, token) => {
      if (err) reject('Could not generate the token')
      else resolve(token)
    })
  })

module.exports = {
  generateToken
}
