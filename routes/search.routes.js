const { search } = require('../controllers').Searches

const router = require('express').Router()

router.get('/:collection/:term', search)

module.exports = router
