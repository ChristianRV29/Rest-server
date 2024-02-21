const { request, response } = require('express')
const { organizeFiles } = require('../helpers')

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

const updateUserImage = async (req = request, res = response) => {
  try {
    const { collection, id } = req.params

    let model

    switch (collection) {
      case 'users':
        model = await User.findById(id)

        if (!model) {
          return res.status(404).json({
            success: false,
            message: 'User not found'
          })
        }

        model.img = req.body.img

        break
      case 'products':
        break

      default:
        return res.status(500).json({
          success: false,
          message: 'Collection is not valid'
        })
    }
  } catch (err) {
    res.status(500).json({
      error: err,
      message: 'Internal server error',
      success: false
    })
  }
}

module.exports = {
  updateUserImage,
  uploadFile
}
