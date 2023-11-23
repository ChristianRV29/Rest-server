const { request, response } = require('express')
const bcrypt = require('bcryptjs')

const User = require('../models/user')
const { generateToken } = require('../helpers/jwt')

const login = async (req = request, res = response) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Email / password are not valid'
      })
    } else if (!user.status) {
      return res.status(400).json({
        success: false,
        message: 'The user is not active'
      })
    }

    const checkPassword = bcrypt.compareSync(password, user.password)

    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: 'Email / password does not match'
      })
    }

    const token = await generateToken(user.id)

    res.status(200).json({
      success: true,
      message: 'Login ok!',
      data: {
        user,
        token
      }
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err
    })
  }
}

module.exports = {
  login
}
