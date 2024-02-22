const { request, response } = require('express')
const fs = require('fs')
const path = require('path')

const { organizeFiles } = require('../helpers')
const { User, Product } = require('../models')

const uploadFile = async (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No files were uploaded'
    })
  }

  try {
    const { error, data } = await organizeFiles(req.files)

    if (error) {
      return res.status(400).json({
        success: false,
        message: error
      })
    }

    res.status(200).json({
      data: {
        file: data
      },
      message: 'File uploaded successfully',
      success: true
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

const updateImage = async (req = request, res = response) => {
  try {
    const { collection, id } = req.params

    let model

    switch (collection) {
      case 'users':
        model = await User.findById(id)
        break

      case 'products':
        model = await Product.findById(id)
        break

      default:
        return res.status(401).json({
          success: false,
          error: 'The collection is not valid'
        })
    }

    if (!model) {
      return res.status(404).json({
        success: false,
        message: 'The id does not exist'
      })
    } else if (!model.status) {
      return res.status(400).json({
        success: false,
        message: 'The id is not active'
      })
    }

    if (model.img) {
      const imgPath = path.join(__dirname, '../uploads', collection, model.img)

      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath)
      }
    }

    const { error, data } = await organizeFiles(req.files, collection)

    if (error) {
      return res.status(400).json({
        success: false,
        message: error
      })
    }

    model.img = data
    await model.save()

    return res.status(200).json({
      data: {
        model
      },
      message: 'Image updated successfully',
      success: true
    })
  } catch (err) {
    res.status(500).json({
      error: err,
      message: 'Internal server error',
      success: false
    })
  }
}

module.exports = {
  updateImage,
  uploadFile
}
