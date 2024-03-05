const router = require('express').Router()
const { check } = require('express-validator')

const { checkJWT, checkFields } = require('../middlewares')
const { renewToken, login, googleSignIn } = require('../controllers').Auth

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

router.get('/', [checkJWT], renewToken)

module.exports = router
