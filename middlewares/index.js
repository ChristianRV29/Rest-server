const { checkAdminRole, checkRoles } = require('./check-rol')
const { checkFields } = require('./fields-validator')
const { checkJWT } = require('./check-token')
const { checkFiles } = require('./check-files')

module.exports = {
  checkAdminRole,
  checkFields,
  checkFiles,
  checkJWT,
  checkRoles
}
