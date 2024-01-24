const router = require('express').Router()
const { check } = require('express-validator')

const {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser
} = require('../controllers/user.controller')

const {
  checkEmailExists,
  checkIdExists,
  validateRoleField
} = require('../helpers/db-validators')

const { checkAdminRole, checkFields, checkJWT } = require('../middlewares')

router.get('/', getUsers)

router.get(
  '/:id',
  [
    check('id', 'It is not a valid ID').isMongoId(),
    check('id').custom(checkIdExists),
    checkFields
  ],
  getUserById
)

router.post(
  '/',
  [
    check('name', 'The name is mandatory').not().isEmpty(),
    check('email').custom(checkEmailExists),
    check('password', 'The password must have at least 6 characters').isLength({
      min: 6
    }),
    check('role').custom(validateRoleField),
    checkFields
  ],
  createUser
)

router.put(
  '/:id',
  [
    check('id', 'It is not a valid ID').isMongoId(),
    check('id').custom(checkIdExists),
    check('role').custom(validateRoleField),
    checkFields
  ],
  updateUser
)

router.delete(
  '/:id',
  [
    // The middlewares are executed in order
    // We must execute first the JWT validation before other validations
    checkJWT,
    checkAdminRole,
    check('id', 'It is not a valid ID').isMongoId(),
    check('id').custom(checkIdExists),
    checkFields
  ],
  deleteUser
)

router.patch('/', (req, res) => {})

module.exports = router
