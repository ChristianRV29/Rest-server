const { request, response } = require('express')

const checkFiles = (req = request, res = response, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No files were uploaded'
    })
  }

  next()
}

module.exports = {
  checkFiles
}
