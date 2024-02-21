const dbValidators = require('./db-validators')
const google = require('./google-verify')
const jwt = require('./jwt')
const uploadFiles = require('./upload-files')

module.exports = {
  ...dbValidators,
  ...google,
  ...jwt,
  ...uploadFiles
}
