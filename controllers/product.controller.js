const { response, request } = require('express')
const { Product, Category } = require('../models')

const getProducts = async (req = request, res = response) => {
  const { from = 0, limit = 10 } = req.query

  const limitOfProducts = Number(limit)

  try {
    const allProducts = Product.find({ status: true })
      .limit(limitOfProducts)
      .skip(Number(from))
      .populate('user')
      .populate('category')

    const totalProducts = Product.countDocuments({ status: true })

    const [total, products] = await Promise.all([totalProducts, allProducts])

    res.status(200).json({
      success: true,
      message: 'The products were brought!',
      data: {
        count: products.length,
        total,
        products
      }
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'It was not possible to bring the products',
      error: err
    })
  }
}

const getProductById = async (req = request, res = response) => {
  const { id } = req.params

  try {
    const product = await Product.findById(id)
      .populate('user')
      .populate('category')

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `The product ${id} does not exist`
      })
    } else if (!product.status) {
      return res.status(401).json({
        success: false,
        message: `The product "${id}" is not active`
      })
    }

    res.status(200).json({
      success: true,
      message: 'The product has been retrieved successfully',
      data: product
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err
    })
  }
}

const createProduct = async (req = request, res = response) => {
  try {
    const { user, status, ...data } = req.body

    const product = await Product.findOne({ name: data.name })

    if (product) {
      return res.status(400).json({
        success: false,
        message: `The product ${data.name} already exists`
      })
    }

    const dataToSave = {
      ...data,
      user: req.user._id
    }

    const newProduct = new Product(dataToSave)

    await newProduct.save()

    res.status(200).json({
      success: true,
      message: 'The product was created successfully',
      data: data
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err
    })
  }
}

const updateProduct = async (req = request, res = response) => {
  const { id } = req.params

  try {
    const { user, status, ...data } = req.body

    if (data.category) {
      const category = await Category.findById(data.category)

      if (!category) {
        return res.status(404).json({
          success: false,
          message: `The category ${data.category} does not exist`
        })
      } else if (!category.status) {
        return res.status(400).json({
          success: false,
          message: `The category ${data.category} is not active`
        })
      }
    }

    await Product.findByIdAndUpdate(id, data, { new: true })

    res.status(200).json({
      success: true,
      message: 'The product was updated successfully',
      data
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err
    })
  }
}

const deleteProduct = async (req = request, res = response) => {
  try {
    const { id } = req.params

    const product = await Product.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    )

    res.status(200).json({
      success: true,
      message: 'The product was deleted successfully',
      data: product
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err
    })
  }
}

module.exports = {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct
}
