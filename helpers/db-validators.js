const { Product, Category, Role, User } = require('../models')

const validateRoleField = async (role = '') => {
  const doesRoleExist = await Role.findOne({ role })

  if (!doesRoleExist) throw new Error("The role doesn't exist within data base")
}

const checkEmailExists = async (email) => {
  const doesEmailExist = await User.findOne({ email })

  if (doesEmailExist) throw new Error('The email already exists')
}

const checkUser = async (id) => {
  const user = await User.findById(id)

  if (!user) throw new Error('The user does not exist')
  if (!user.status) throw new Error('The user is not active')
}

const checkCategory = async (id) => {
  const category = await Category.findById(id)

  if (!category) throw new Error('The category does not exist')
  if (!category.status) throw new Error('The category is not active')
}

const checkProduct = async (id) => {
  const product = await Product.findById(id)

  if (!product) throw new Error('The product does not exist')
  if (!product.status) throw new Error('The product is not active')
}

module.exports = {
  checkCategory,
  checkEmailExists,
  checkProduct,
  checkUser,
  validateRoleField
}
