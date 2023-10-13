const router = require('express').Router()

const {
  usersGet,
  usersPost,
  usersPut
} = require('./../controllers/user.controller')

router.get('/', usersGet)

router.post('/', usersPost)

router.put('/:id', usersPut)

router.delete('/', (req, res) => {})

router.patch('/', (req, res) => {})

module.exports = router
