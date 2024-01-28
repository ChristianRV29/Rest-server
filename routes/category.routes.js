const { check } = require('express-validator')
const {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../controllers/category.controller')

const { checkJWT, checkFields } = require('../middlewares')
const {
  checkCategoryIdExists,
  checkCategoryIsActive
} = require('../helpers/db-validators')

const router = require('express').Router()

router.get('/', getCategories)

router.get(
  '/:id',
  [
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom(checkCategoryIdExists),
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
    check('id').isMongoId(),
    check('id').custom(checkCategoryIdExists),
    check('id').custom(checkCategoryIsActive),
    check('name', 'The name is mandatory').not().isEmpty(),
    checkFields
  ],
  updateCategory
)

router.delete(
  '/:id',
  [
    check('id').isMongoId(),
    check('id').custom(checkCategoryIdExists),
    check('id').custom(checkCategoryIsActive),
    checkFields
  ],
  deleteCategory
)

module.exports = router
