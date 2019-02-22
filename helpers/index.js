const bcrypt = require('bcrypt')

module.exports = {
  encryptPassword: async plainPassword => {
    // generate salt
    const salt = await bcrypt.genSalt(10)
    // hash the plain password with generated salt
    const hashedPassword = await bcrypt.hash(plainPassword, salt)

    // return both salt & hashedPassword as an object
    return {
      salt,
      hashedPassword
    }
  }
}
