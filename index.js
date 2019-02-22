const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8000

app.use(bodyParser.json())

// -----------------------------------------------------------------------------

const all = require('./middlewares')
const users = require('./middlewares/users')

app.get('/', all.getHello)
app.post('/register', users.register)
app.post('/login', users.login)
app.get('/users', users.getAllUsers)
app.get('/profile', users.getProfile)

// -----------------------------------------------------------------------------

app.listen(port, () => {
  console.log(`Express app is running on localhost:${port}`)
})
