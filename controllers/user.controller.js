const { response, request } = require('express')

const bcrypt = require('bcryptjs')

const User = require('../models/user')

const usersGet = async (req = request, res = response) => {
  const { from = 0, limit = 10 } = req.query

  const users = await User.find().limit(Number(limit)).skip(Number(from))

  res.status(200).json({
    success: true,
    message: 'The users were brought!',
    data: {
      users,
      count: limit
    }
  })
}

const usersPost = async (req = request, res = response) => {
  try {
    const { name, email, password, role } = req.body

    const user = new User({ name, email, password, role })

    // Encrypt password
    const salt = bcrypt.genSaltSync(10)
    user.password = bcrypt.hashSync(salt)

    await user.save()

    res.status(200).json({
      success: true,
      message: 'The user was created!',
      data: {
        user
      }
    })
  } catch (err) {
    res.status(500).json({ error: err, message: 'Internal Server Error' })
  }
}

const usersPut = async (req = request, res = response) => {
  try {
    const { id } = req.params
    const { _id, password, ...rest } = req.body

    if (password) {
      const salt = bcrypt.genSaltSync()
      rest.password = bcrypt.hashSync(password, salt)
    }

    const user = await User.findByIdAndUpdate(id, rest)

    res.status(200).json({
      success: true,
      message: 'The user was updated!',
      data: {
        user
      }
    })
  } catch (err) {
    res.status(500).json({ error: err, message: 'Internal Server Error' })
  }
}

module.exports = {
  usersGet,
  usersPost,
  usersPut
}
