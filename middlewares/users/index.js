require('dotenv').config()
const mongoose = require('mongoose')
const helpers = require('../../helpers')

mongoose.connect(`${process.env.URL}/${process.env.DB_NAME}`, {
  useNewUrlParser: true
})

// User model => users collection
const User = mongoose.model('User', {
  name: String,
  email: String,
  salt: String,
  password: String
})

module.exports = {
  register: async (req, res) => {
    // slow process, so we use await
    // destructure salt & password from encryptPassword() function
    const { salt, hashedPassword } = await helpers.encryptPassword(
      req.body.password
    )

    // fast process
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      salt: salt,
      password: hashedPassword
    }
    const result = await User.create(newUser)

    // fast process
    res.send({
      message: 'Register',
      newUser: newUser,
      result: result
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
