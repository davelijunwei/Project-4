require('dotenv').config()
const express = require('express')
const server = express()
require('./config/db')
const passport = require('./config/passportConfig')
const cors = require('cors')

server.use(cors())

//middleware
server.use(express.urlencoded({ extended: true }))
// server.use(express.static('public'))
server.use(express.json())
server.use(passport.initialize())
server.use(passport.session())

//Routes
server.use('/todos', require('./routes/todo.routes'))
server.use('/addressbook', require('./routes/addressbook.routes'))
server.use('/auth', require('./routes/auth.routes'))
//
//listen
server.listen(process.env.PORT, () =>
  console.log(`running on ${process.env.PORT}`)
)
