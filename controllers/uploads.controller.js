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

module.exports = {
  uploadFile
}
