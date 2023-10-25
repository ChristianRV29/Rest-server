const router = require('express').Router()

const { check } = require('express-validator')

const {
  usersGet,
  usersPost,
  usersPut
} = require('./../controllers/user.controller')

router.get('/', usersGet)

router.post(
  '/',
  [check('email', 'The email is not valid').isEmail()],
  usersPost
)

router.put('/:id', usersPut)

router.delete('/', (req, res) => {})

router.patch('/', (req, res) => {})

module.exports = router
