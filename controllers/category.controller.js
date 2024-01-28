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
  try {
    const { from = 0, limit = 10 } = req.query

    const query = { status: true }

    const allCategories = Category.find(query)
      .limit(Number(limit))
      .skip(Number(from))

    const totalCategories = Category.countDocuments(query)

    const [total, categories] = await Promise.all([
      totalCategories,
      allCategories
    ])

    res.status(200).json({
      success: true,
      message: 'The categories were brought!',
      data: {
        count: categories.length,
        total,
        categories
      }
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err
    })
  }
}

const getCategoryById = async (req = request, res = response) => {
  try {
    const { id } = req.params

    const category = await Category.findById(id)

    if (!category) {
      return res.status(401).json({
        success: false,
        error: 'The category does not exist'
      })
    } else if (!category.status) {
      return res.status(401).json({
        success: false,
        error: 'The category is not active - please talk to an administrator'
      })
    }

    res.status(200).json({
      success: true,
      message: 'The category was brought!',
      data: {
        category
      }
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err
    })
  }
}

module.exports = {
  createCategory,
  getCategories,
  getCategoryById
}
