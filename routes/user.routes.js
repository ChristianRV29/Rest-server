const router = require('express').Router()

const { check } = require('express-validator')

const { checkFields } = require('../middlewares/fields-validator')
const {
  usersGet,
  usersPost,
  usersPut
} = require('../controllers/user.controller')

router.get('/', usersGet)

router.post(
  '/',
  [
    check('name', 'The name is mandatory').not().isEmpty(),
    check('email', 'The email is not valid').isEmail(),
    check('password', 'The password must have at least 6 characters').isLength({
      min: 6
    }),
    check('role', 'Invalid role').isIn(['ADMIN', 'USER']),
    checkFields
  ],
  usersPost
)

router.put('/:id', usersPut)

router.delete('/', (req, res) => {})

router.patch('/', (req, res) => {})

module.exports = router
