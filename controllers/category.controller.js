const { request, response } = require('express')

const createCategory = async (req = request, res = response) => {}

const getCategories = async (req = request, res = response) => {
  res.status(200).json({
    success: true,
    message: 'Nice'
  })
}

module.exports = {
  createCategory,
  getCategories
}
