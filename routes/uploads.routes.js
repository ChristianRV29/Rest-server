const { uploadFile, updateUserImage } = require('../controllers').Uploads

const router = require('express').Router()

router.post('/', uploadFile)

router.put('/:collection/:id', updateUserImage)

module.exports = router
