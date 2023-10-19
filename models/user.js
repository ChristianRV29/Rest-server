const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  mail: {
    type: String,
    required: [true, 'Mail is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  role: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
  registeredBy: {
    google: {
      type: Boolean,
      default: false
    },
    mail: {
      type: Boolean,
      default: true
    }
  }
})

module.exports = model('User', UserSchema)
