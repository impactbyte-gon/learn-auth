require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(`${process.env.URL}/${process.env.DB_NAME}`, {
  useNewUrlParser: true
})

// User model => users collection
const User = mongoose.model('User', {
  name: String,
  email: String,
  password: String
})

module.exports = {
  register: async (req, res) => {
    res.send({
      message: 'Register'
    })
  },

  login: async (req, res) => {
    res.send({
      message: 'Login'
    })
  },

  getAllUsers: async (req, res) => {
    res.send({
      message: 'Get all users'
    })
  },

  getProfile: async (req, res) => {
    res.send({
      message: 'Get my profile'
    })
  }
}
