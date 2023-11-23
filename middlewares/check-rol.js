const { response, request } = require('express')

const checkAdminRole = async (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      success: false,
      message: 'You must validate the token first'
    })
  }

  const { role } = req.user

  if (role !== 'ADMIN') {
    return res.status(401).json({
      success: false,
      message: "You're not authorized to perform this action - only ADMIN users"
    })
  }

  next()
}

const checkRoles = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        success: false,
        message: 'You must validate the token first'
      })
    }

    const { role } = req.user

    if (!roles.includes(role)) {
      return res.status(401).json({
        success: false,
        message: `You're not authorized to perform this action - invalid role: ${role}`
      })
    }

    next()
  }
}

module.exports = {
  checkAdminRole,
  checkRoles
}
