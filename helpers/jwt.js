const jwt = require('jsonwebtoken')
const { User } = require('../models')

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

const checkUserToken = async (token = '') => {
  try {
    const { uid } = await jwt.verify(token, SECRET_KEY)

    const user = await User.findById(uid)

    if (!user) throw new Error('User does not exist in DB')
    else if (!user.status) throw new Error('User is not active')

    return user
  } catch (err) {
    return null
  }
}

module.exports = {
  checkUserToken,
  generateToken
}
