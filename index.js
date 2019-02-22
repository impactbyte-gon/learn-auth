// -----------------------------------------------------------------------------
// EXPRESS
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8000

app.use(bodyParser.json())

// -----------------------------------------------------------------------------
// MONGOOSE
require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(`${process.env.URL}/${process.env.DB_NAME}`, {
  useNewUrlParser: true
})

// User model => users collection
const User = mongoose.model('User', {
  name: String,
  email: String
})

// -----------------------------------------------------------------------------

app.get('/', (req, res) => {
  res.send({
    message: 'Hello World'
  })
})

app.get('/users', async (req, res) => {
  res.send({
    message: 'List of all users',
    users: await User.find()
  })
})

app.post('/users', async (req, res) => {
  const newUser = new User({
    name: req.body.name || null,
    email: req.body.email || null
  })
  await newUser.save()

  res.send({
    message: 'Created new user',
    newUser: newUser
  })
})

// -----------------------------------------------------------------------------

app.listen(port, () => {
  console.log(`Express app is running on localhost:${port}`)
})
