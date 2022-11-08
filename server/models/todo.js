const mongoose = require('mongoose')
const { Schema } = mongoose

const todoSchema = new Schema({
  text: { type: String, required: true },
  isdone: { type: Boolean, default: false },
})

const todo = mongoose.model('Todos', todoSchema)

module.exports = todo
