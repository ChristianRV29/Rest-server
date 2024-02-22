const { check } = require('express-validator')
const { checkFields, checkFiles } = require('../middlewares')
const { updateImage } = require('../controllers/uploads.controller')

const { uploadFile, updateUserImage } = require('../controllers').Uploads

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

module.exports = router
