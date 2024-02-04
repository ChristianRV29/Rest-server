const { request, response } = require('express')
const { ObjectId } = require('mongoose').Types

const { User, Category, Product } = require('../models')

const ALLOWED_COLLECTIONS = ['users', 'categories', 'products', 'roles']

const findUsers = async (term = '', res = response) => {
  try {
    const isMongoId = ObjectId.isValid(term)
    if (isMongoId) {
      const user = await User.findById(term)

      return res.status(200).json({
        success: true,
        results: user ? [user] : []
      })
    }

    const regex = new RegExp(term, 'i')

    const users = await User.find({
      $or: [{ name: regex }, { email: regex }],
      $and: [{ status: true }]
    })

    res.status(200).json({
      success: true,
      count: users.length,
      results: users
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while searching for the user',
      error: err
    })
  }
}

const findCategories = async (term = '', res = response) => {
  try {
    const isMongoId = ObjectId.isValid(term)
    if (isMongoId) {
      const category = await Category.findById(term)

      return res.status(200).json({
        success: true,
        results: category ? [category] : []
      })
    }

    const regex = new RegExp(term, 'i')

    const categories = await Category.find({ name: regex, status: true })

    res.status(200).json({
      success: true,
      count: categories.length,
      results: categories
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while searching for the category',
      error: err
    })
  }
}

const findProducts = async (term = '', res = response) => {
  try {
    const regex = new RegExp(term, 'i')
    const isMongoId = ObjectId.isValid(term)

    if (isMongoId) {
      const product = await Product.findById(term)
        .populate({ path: 'category', select: 'name' })
        .populate({ path: 'user', select: ['name', 'email'] })
      if (product) {
        return res.status(200).json({
          success: true,
          results: product ? [product] : []
        })
      } else {
        const productsByCategory = await Product.find({
          category: term
        })
          .populate({ path: 'category', select: 'name' })
          .populate({ path: 'user', select: ['name', 'email'] })

        return res.status(200).json({
          success: true,
          count: productsByCategory.length,
          results: productsByCategory
        })
      }
    }

    const products = await Product.find({
      $or: [{ name: regex }, { description: regex }],
      $and: [{ status: true }]
    })
      .populate({ path: 'category', select: 'name' })
      .populate({ path: 'user', select: ['name', 'email'] })

    res.status(200).json({
      success: true,
      count: products.length,
      results: products
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while searching for the product',
      error: err
    })
  }
}

const search = async (req = request, res = response) => {
  try {
    const { collection, term } = req.params

    if (!ALLOWED_COLLECTIONS.includes(collection)) {
      return res.status(400).json({
        success: false,
        message: `The collection ${collection} does not exist within the database`
      })
    }

    switch (collection) {
      case 'users':
        findUsers(term, res)
        break
      case 'categories':
        findCategories(term, res)
        break
      case 'products':
        findProducts(term, res)
        break
      default:
        return res.status(500).json({
          success: false,
          message: 'The collection was not found'
        })
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while searching',
      error: err
    })
  }
}

module.exports = {
  search
}
