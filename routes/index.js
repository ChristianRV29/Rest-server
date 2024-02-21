const Auth = require('./auth.routes')
const Categories = require('./category.routes')
const Products = require('./product.routes')
const Searches = require('./search.routes')
const Uploads = require('./uploads.routes')
const Users = require('./user.routes')

module.exports = {
  Auth,
  Categories,
  Products,
  Searches,
  Uploads,
  Users
}
