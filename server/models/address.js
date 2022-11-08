const mongoose = require('mongoose')
const { Schema } = mongoose

const addressSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  homephone: {
    type: Number,
    required: true,
  },
  mobilephone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
})

const Address = mongoose.model('Address', addressSchema)

module.exports = Address
