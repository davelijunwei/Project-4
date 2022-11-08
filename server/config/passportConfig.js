var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/user')
require('dotenv').config()

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    //test asynch here
    function (email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          return done(err)
        }
        console.log('pass com', user)
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' })
        }
        //maybe not comparing password check validpassword needs to initalize on its own
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' })
        }
        return done(null, user)
      })
    }
  )
)

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.SECRET //put this in your env file

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
      if (err) {
        return done(err, false)
      }
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
        // or you could create a new account
      }
    })
  })
)

module.exports = passport
