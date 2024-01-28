const { request, response } = require('express')

const { Category } = require('../models')

const createCategory = async (req = request, res = response) => {
  try {
    const { name } = req.body

    const category = await Category.findOne({ name: name.toUpperCase() })

    if (category) {
      return res.status(401).json({
        success: false,
        error: `The category ${name} already exists`
      })
    }

    const data = {
      name: name.toUpperCase(),
      user_id: req.user._id
    }

    const newCategory = await Category(data)

    await newCategory.save()

    res.status(200).json({
      success: true,
      message: 'The category was created!',
      data: {
        category: newCategory
      }
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err
    })
  }
}

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
