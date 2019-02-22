// -----------------------------------------------------------------------------
// EXPRESS
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8000

app.use(bodyParser.json())

// -----------------------------------------------------------------------------

const root = require('./middlewares/index')
const users = require('./middlewares/users/index')

app.get('/', root.getHello)
app.post('/register', users.register)
app.post('/login', users.login)
app.get('/users', users.getAllUsers)
app.get('/profile', users.getProfile)

// -----------------------------------------------------------------------------

app.listen(port, () => {
  console.log(`Express app is running on localhost:${port}`)
})
