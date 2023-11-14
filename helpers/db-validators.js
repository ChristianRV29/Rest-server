const Role = require('../models/role')
const User = require('../models/user')

const validateRoleField = async (role = '') => {
  const doesRoleExist = await Role.findOne({ role })

  if (!doesRoleExist) throw new Error("The role doesn't exist within data base")
}

const checkEmailExists = async (email) => {
  const doesEmailExist = await User.findOne({ email })

  if (doesEmailExist) throw new Error('The email already exists')
}

const checkIdExists = async (id) => {
  const doesIdExist = await User.findById(id)

  if (!doesIdExist) throw new Error('The id does not exist')
}

module.exports = {
  checkEmailExists,
  checkIdExists,
  validateRoleField
}
