const { request } = require('express')

const categoryGet = async (req, res = request) => {
  res.status(200).json({
    success: true,
    message: 'Nice'
  })
}

module.exports = {
  categoryGet
}
