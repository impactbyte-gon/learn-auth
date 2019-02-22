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

const usersMiddleware = {
  // ---------------------------------------------------------------------------
  // REGISTER NEW USER
  register: async (req, res) => {
    // using encryptPassword is a slow process, so we use await
    // then destructure salt & password from encryptPassword() returned value
    const { salt, hashedPassword } = await helpers.encryptPassword(
      req.body.password
    )

    // creating an object is a fast process
    const newUser = {
      name: req.body.name, // from body
      email: req.body.email, // from body
      salt: salt, // NOT from body, from helpers
      password: hashedPassword // NOT from body, from helpers
    }
    // creating a user in the database is a slow process
    const result = await User.create(newUser)

    // responding is a fast process
    res.send({
      message: 'Register',
      newUser: newUser,
      result: result
    })
  },

  // ---------------------------------------------------------------------------
  // LOGIN WITH REGISTERED USER
  login: async (req, res) => {
    res.send({
      message: 'Login'
    })
  },

  // ---------------------------------------------------------------------------
  getAllUsers: async (req, res) => {
    res.send({
      message: 'Get all users',
      users: await User.find({}, { salt: 0, password: 0 })
    })
  },

  // ---------------------------------------------------------------------------
  getProfile: async (req, res) => {
    res.send({
      message: 'Get my profile'
    })
  },

  // ---------------------------------------------------------------------------
  seedUsers: async (req, res) => {
    const dummyUsersData = [
      {
        name: 'Alpha',
        email: 'alpha@gmail.com',
        password: 'password_alpha'
      },
      {
        name: 'Beta',
        email: 'beta@gmail.com',
        password: 'password_beta'
      },
      {
        name: 'Gamma',
        email: 'gamma@gmail.com',
        password: 'password_gamma'
      }
    ]

    // do not use User.insertMany(dummyUsersData)
    await dummyUsersData.forEach(async userData => {
      await usersMiddleware.register(userData)
    })

    res.send({
      message: 'Seed users completed'
    })
  }
}

module.exports = usersMiddleware
