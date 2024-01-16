const router = require('express').Router()
const { check } = require('express-validator')

const { login, googleSignIn } = require('../controllers/auth.controller')
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

router.post(
  '/google',
  [check('id_token', 'The token is mandatory').not().isEmpty(), checkFields],
  googleSignIn
)

module.exports = router
