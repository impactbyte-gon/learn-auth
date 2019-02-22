require('dotenv').config()
const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

mongoose.connect(`${process.env.URL}/${process.env.DB_NAME}`, {
  useNewUrlParser: true
})

// User schema
const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  salt: String,
  password: String
})

// plug the AutoIncrement plugin into the schema
// id is different with _id
UserSchema.plugin(AutoIncrement, { inc_field: 'id' })

// User model => users collection
const User = mongoose.model('User', UserSchema)

module.exports = User
