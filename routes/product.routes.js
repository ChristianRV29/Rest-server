const router = require('express').Router()
const { check } = require('express-validator')

const { checkFields, checkAdminRole, checkJWT } = require('../middlewares')
const { checkProduct, checkCategory } = require('../helpers/db-validators')
const { Product: ProductController } = require('../controllers')

const {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct
} = ProductController

router.get('/', getProducts)

router.get(
  '/:id',
  [
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom(checkProduct),
    checkFields
  ],
  getProductById
)

router.post(
  '/',
  [
    checkJWT,
    checkAdminRole,
    check('name', 'The name of product is mandatory').not().isEmpty(),
    check('description', 'The description is mandatory').not().isEmpty(),
    check('category').isMongoId(),
    check('category').custom(checkCategory),
    checkFields
  ],
  createProduct
)

router.put(
  '/:id',
  [
    checkJWT,
    checkAdminRole,
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom(checkProduct),
    checkFields
  ],
  updateProduct
)

router.delete(
  '/:id',
  [
    checkJWT,
    checkAdminRole,
    check('id').isMongoId(),
    check('id').custom(checkProduct),
    checkFields
  ],
  deleteProduct
)

module.exports = router
