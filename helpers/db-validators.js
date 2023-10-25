const Role = require('../models/role')

const validateRoleField = async (role = '') => {
  const doesFieldExist = await Role.findOne({ role })

  if (!doesFieldExist)
    throw new Error(`The role ${role} does not exist within data base`)
}

module.exports = {
  validateRoleField
}
