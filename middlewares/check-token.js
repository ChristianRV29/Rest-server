const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const SECRET_KEY = process.env.SECRET_KEY

const checkJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token')

  if (!token)
    return res.status(401).json({
      success: false,
      message: 'There is no token in the request'
    })

  try {
    const { uid } = jwt.verify(token, SECRET_KEY)

    const user = await User.findById(uid)

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token - user does not exist in DB'
      })
    }

    if (!user.status) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token - user is not active'
      })
    }

    req.user = user

    next()
  } catch (err) {
    res.status(401).json({
      success: false,
      message: 'Invalid token',
      error: err
    })
  }
}

module.exports = {
  checkJWT
}
