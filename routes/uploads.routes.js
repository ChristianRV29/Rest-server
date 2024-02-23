const { check } = require('express-validator')
const { checkFields, checkFiles } = require('../middlewares')
const { uploadFile, getImage, updateImage, uploadImageToCloudinary } =
  require('../controllers').Uploads

const router = require('express').Router()

router.post('/', uploadFile)

router.put(
  '/:collection/:id',
  [
    check('collection', 'The collection is not valid').isIn([
      'users',
      'products'
    ]),
    check('id', 'The id is not valid Mongo id').isMongoId(),
    checkFiles,
    checkFields
  ],
  updateImage
)

router.put(
  '/cloud/:collection/:id',
  [
    check('collection', 'The collection is not valid').isIn([
      'users',
      'products'
    ]),
    check('id', 'The id is not valid Mongo id').isMongoId(),
    checkFiles,
    checkFields
  ],
  uploadImageToCloudinary
)

router.get(
  '/:collection/:id',
  [
    check('collection', 'Collection is not valid').isIn(['users', 'products']),
    check('id', 'The id is not valid Mongo id').isMongoId(),
    checkFields
  ],
  getImage
)

module.exports = router
