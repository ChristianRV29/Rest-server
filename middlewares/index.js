const { checkAdminRole, checkRoles } = require('./check-rol')
const { checkFields } = require('./fields-validator')
const { checkJWT } = require('./check-token')

module.exports = {
  checkAdminRole,
  checkFields,
  checkJWT,
  checkRoles
}
