const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

userSchema.pre('save', function (next) {
  var user = this
  if (!user.isModified('password')) return next()

  var hash = bcrypt.hashSync(user.password, 10)

  user.password = hash
  next()
})

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

const user = mongoose.model('user', userSchema)

module.exports = user
