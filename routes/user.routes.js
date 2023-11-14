const router = require('express').Router()
const { check } = require('express-validator')

const {
  usersGet,
  usersPost,
  usersPut
} = require('../controllers/user.controller')
const { checkFields } = require('../middlewares/fields-validator')

const {
  checkEmailExists,
  checkIdExists,
  validateRoleField
} = require('../helpers/db-validators')

router.get('/', usersGet)

router.post(
  '/',
  // Middlewares
  [
    check('name', 'The name is mandatory').not().isEmpty(),
    check('email').custom(checkEmailExists),
    check('password', 'The password must have at least 6 characters').isLength({
      min: 6
    }),
    check('role').custom(validateRoleField),
    checkFields
  ],
  usersPost
)

router.put(
  '/:id',
  [
    check('id', 'It is not a valid ID').isMongoId(),
    check('id').custom(checkIdExists),
    check('role').custom(validateRoleField),
    checkFields
  ],
  usersPut
)

router.delete('/', (req, res) => {})

router.patch('/', (req, res) => {})

module.exports = router
