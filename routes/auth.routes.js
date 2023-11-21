const router = require('express').Router()
const { check } = require('express-validator')

const { login } = require('../controllers/auth.controller')
const { checkFields } = require('../middlewares/fields-validator')

router.post(
  '/login',
  [
    check('email', 'The email is mandatory').isEmail(),
    check('password', 'The password is mandatory').not().isEmpty(),
    checkFields
  ],
  login
)

module.exports = router
