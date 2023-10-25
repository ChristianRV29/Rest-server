const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  role: {
    type: String,
    enum: ['ADMIN', 'USER'],
    default: 'USER'
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
    email: {
      type: Boolean,
      default: true
    }
  }
})

module.exports = model('User', UserSchema)
