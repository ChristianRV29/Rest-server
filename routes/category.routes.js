const { check } = require('express-validator')
const {
  getCategories,
  createCategory,
  getCategoryById
} = require('../controllers/category.controller')

const { checkJWT, checkFields } = require('../middlewares')
const { checkCategoryIdExists } = require('../helpers/db-validators')

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

router.put('/:id', (req, res) => {
  const { id } = req.params

  res.status(200).json({
    success: true,
    message: 'PUT - Category by id',
    data: {
      id
    }
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  // TODO: Only admins should make this

  res.status(200).json({
    success: true,
    message: 'DELETE - Category by id',
    data: {
      id
    }
  })
})

module.exports = router
