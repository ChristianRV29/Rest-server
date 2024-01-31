const { check } = require('express-validator')
const {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../controllers/category.controller')

const { checkJWT, checkFields } = require('../middlewares')
const { checkCategory } = require('../helpers/db-validators')

const router = require('express').Router()

router.get('/', getCategories)

router.get(
  '/:id',
  [
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom(checkCategory),
    checkFields
  ],
  getCategoryById
)

router.post(
  '/',
  [
    checkJWT,
    check('name', 'The name is mandatory').not().isEmpty(),
    checkFields
  ],
  createCategory
)

router.put(
  '/:id',
  [
    checkJWT,
    check('id').isMongoId(),
    check('id').custom(checkCategory),
    check('name', 'The name is mandatory').not().isEmpty(),
    checkFields
  ],
  updateCategory
)

router.delete(
  '/:id',
  [
    checkJWT,
    check('id').isMongoId(),
    check('id').custom(checkCategory),
    checkFields
  ],
  deleteCategory
)

module.exports = router
