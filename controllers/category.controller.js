const { request } = require('express')

const getCategories = async (req, res = request) => {
  res.status(200).json({
    success: true,
    message: 'Nice'
  })
}

module.exports = {
  getCategories
}
