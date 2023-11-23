const router = require('express').Router()
const { check } = require('express-validator')

const {
  usersGet,
  usersPost,
  usersPut,
  usersDelete
} = require('../controllers/user.controller')

const {
  checkEmailExists,
  checkIdExists,
  validateRoleField
} = require('../helpers/db-validators')

const {
  checkAdminRole,
  // checkFields,
  checkJWT,
  checkRoles
} = require('../middlewares')

router.get('/', usersGet)

router.get('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    id: req.params.id
  })
})

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
  usersDelete
)

router.patch('/', (req, res) => {})

module.exports = router
