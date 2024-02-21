const { v4: uuidV4 } = require('uuid')
const path = require('path')

const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif']

const organizeFiles = (files, filePath = '', extensions = ALLOWED_EXTENSIONS) =>
  new Promise((resolve, reject) => {
    const { file } = files

    const extension = file.name.split('.').pop()

    if (!extensions.includes(extension)) {
      reject({
        data: null,
        error: 'Invalid extension'
      })
    }

    const tempFileName = uuidV4() + '.' + extension

    const uploadPath = path.join(
      __dirname,
      '../uploads/',
      filePath,
      tempFileName
    )

    file.mv(uploadPath, (error) => {
      if (error) {
        reject({
          data: null,
          error
        })
      }

      resolve({
        error: null,
        data: tempFileName
      })
    })
  })

module.exports = {
  organizeFiles
}
