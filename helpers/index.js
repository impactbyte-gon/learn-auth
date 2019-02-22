const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  encryptPassword: async plainPassword => {
    // generate salt
    const salt = await bcrypt.genSalt(10)
    // hash the plain password with generated salt
    // with becrypt, we have to use the salt
    const hashedPassword = await bcrypt.hash(plainPassword, salt)

    // return both salt & hashedPassword as an object
    // will be used in the register middleware
    // both salt & hashedPassword will be stored in the database
    // but we will NOT store the plainPassword in the database
    return {
      salt,
      hashedPassword
    }
  },

  comparePassword: async (password, hash) => {
    // slow process to determine password is matched
    // result is either true or false
    const authenticated = await bcrypt.compare(password, hash)

    return authenticated
  },

  createToken: async foundUser => {
    // create the payload WITHOUT having the salt & password
    const payload = {
      sub: foundUser._id
    }

    // create the token using jwt.sign()
    const token = await jwt.sign(payload, process.env.SECRET)

    // return token to be used later by the frontend
    return token
  }
}
