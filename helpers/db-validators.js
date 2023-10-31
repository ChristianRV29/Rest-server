const Role = require('../models/role')
const User = require('../models/user')

const validateRoleField = async (role = '') => {
  const doesRoleExist = await Role.findOne({ role })

  if (!doesRoleExist) throw new Error("The role doesn't exist within data base")
}

const checkEmailExist = async (email) => {
  const doesEmailExist = await User.findOne({ email })

  if (doesEmailExist) throw new Error('The email already exists')
}

module.exports = {
  checkEmailExist,
  validateRoleField
}
