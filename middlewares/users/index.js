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
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    console.log(newUser)

    res.send({
      message: 'Register',
      newUser: newUser
    })
  },

  login: async (req, res) => {
    res.send({
      message: 'Login'
    })
  },

  getAllUsers: async (req, res) => {
    res.send({
      message: 'Get all users',
      users: await User.find()
    })
  },

  getProfile: async (req, res) => {
    res.send({
      message: 'Get my profile'
    })
  },

  seedUsers: async (req, res) => {
    res.send({
      message: 'Seed users'
    })
  }
}
