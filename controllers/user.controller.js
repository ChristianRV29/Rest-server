const { response, request } = require('express')

const User = require('../models/user')

const usersGet = (_, res = response) => {
  res.status(200).json({
    success: true,
    response: {
      users: [
        {
          id: '123',
          name: 'Jon Snow'
        },
        {
          id: '321',
          name: 'Ka Snow'
        }
      ]
    }
  })
}

// TODO: Figure out why is not allowing save more than one user
const usersPost = async (req = request, res = response) => {
  try {
    const { name, email, password, role } = req.body

    const user = new User({ name, email, password, role })

    const doesExist = await User.findOne({ email })

    if (doesExist) {
      return res.status(400).json({
        field: 'email',
        message: 'The email already exists',
        value: email
      })
    }

    await user.save()

    res.status(200).json({
      success: true,
      response: 'The user was created!',
      data: {
        user
      }
    })
  } catch (err) {
    res.status(500).json({ error: err, message: 'Internal Server Error' })
  }
}

const usersPut = (req = request, res = response) => {
  try {
    const { id } = req.params

    res.status(202).json({
      success: true,
      response: `The user ${id} was updated!`
    })
  } catch (err) {
    res.status(406).json({
      success: false,
      response: 'The user could not be updated!'
    })
  }
}

module.exports = {
  usersGet,
  usersPost,
  usersPut
}
