const { request, response } = require('express')
const bcrypt = require('bcryptjs')

const { generateRandomPassword, verify, generateToken } = require('../helpers')
const { User } = require('../models')
const { checkJWT } = require('../middlewares')

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
      message: 'Successfully logged in',
      data: {
        user,
        token
      }
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: { ...err }
    })
  }
}

const googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body

  try {
    const { email, img, name } = await verify(id_token).catch(console.error)

    let user = await User.findOne({ email })

    if (!user) {
      const salt = bcrypt.genSaltSync()
      const randomPassword = generateRandomPassword()

      const defaultPassword = bcrypt.hashSync(randomPassword, salt)

      const userData = {
        email,
        img,
        name,
        password: defaultPassword,
        role: 'USER',
        registeredBy: {
          google: true,
          email: false
        }
      }

      user = new User(userData)

      await user.save()
    }

    if (!user.status) {
      return res.status(400).json({
        success: false,
        message: 'The user is not active - contact the administrator'
      })
    }

    const token = await generateToken(user.id)

    res.status(200).json({
      success: true,
      message: 'Successfully logged in',
      data: {
        user,
        token
      }
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
      message: 'It was not possible to check the user'
    })
  }
}

const renewToken = async (req = request, res = response) => {
  try {
    const { user } = req

    const token = await generateToken(user.id)

    res.status(200).json({
      success: true,
      message: 'Token renewed',
      data: {
        user,
        token
      }
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong - renew token',
      error: err
    })
  }
}

module.exports = {
  googleSignIn,
  login,
  renewToken
}
