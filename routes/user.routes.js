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
  checkUser,
  validateRoleField
} = require('../helpers/db-validators')

const { checkFields, checkJWT, checkAdminRole } = require('../middlewares')

router.get('/', getUsers)

router.get(
  '/:id',
  [
    check('id', 'It is not a valid ID').isMongoId(),
    check('id').custom(checkUser),
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
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom(checkUser),
    check('role').custom(validateRoleField),
    checkFields
  ],
  updateUser
)

router.delete(
  '/:id',
  [
    checkJWT,
    checkAdminRole,
    check('id', 'It is not a valid ID').isMongoId(),
    check('id').custom(checkUser),
    checkFields
  ],
  deleteUser
)

module.exports = router
