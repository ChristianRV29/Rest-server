const { validationResult } = require('express-validator')

const checkFields = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() })
  }

  next()
}

module.exports = {
  checkFields
}
