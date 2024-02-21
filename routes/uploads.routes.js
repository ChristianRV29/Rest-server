const { uploadFile } = require('../controllers').Uploads

const router = require('express').Router()

router.post('/', uploadFile)

module.exports = router
