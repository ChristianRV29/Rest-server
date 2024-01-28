const { request, response } = require('express')

const { Category } = require('../models')

const createCategory = async (req = request, res = response) => {
  try {
    const { name } = req.body

    const category = await Category.findOne({ name: name.toUpperCase() })

    if (category) {
      return res.status(400).json({
        success: false,
        error: `The category ${name} already exists`
      })
    }

    const data = {
      name: name.toUpperCase(),
      created_by: req.user._id
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
      .populate('created_by')
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

    const category = await Category.findById(id).populate('created_by')

    if (category && !category.status) {
      return res.status(400).json({
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

const updateCategory = async (req = request, res = response) => {
  try {
    const { id } = req.params
    const name = req.body.name.toUpperCase()

    const category = await Category.findByIdAndUpdate(id, { name })

    res.status(200).json({
      success: true,
      message: 'The category was updated!',
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

const deleteCategory = async (req = request, res = response) => {
  try {
    const { id } = req.params

    const category = await Category.findByIdAndUpdate(id, { status: false })

    res.status(200).json({
      success: true,
      message: 'The category was deleted!',
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
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory
}
