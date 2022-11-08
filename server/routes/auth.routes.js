const router = require('express').Router()
const passport = require('../config/passportConfig')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()
// const bcrypt = require("bcrypt");
// const saltRounds = 10;

router.get('/logout', (req, res) => {
  console.log('logout 2')
  // req.logOut()
  res.sendStatus(200) //change to sendstatus works res.status doesn't don't quite understand why
})

// router.get('/register', (req, res) => {
//   res.render('auth/register')
// })

// router.get('/login', (req, res) => {
//   res.render('auth/login')
// })

router.post('/register', async (req, res) => {
  console.log('before bcrypt', req.body)
  try {
    // let { email, password } = req.body

    // let passwordHash = await bcrypt.hash(password, saltRounds);

    let user = new User(req.body.form)
    console.log('new user', user)
    await user.save()
    console.log('saved')
    // res.redirect('/dashboard')
    res.status(200).json({ message: 'successful' })
  } catch (error) {
    res.sendStatus(400)
  }

  //   res.render("auth/register");
})

// router.post('/login', (req, res) => {
//   console.log('login', req.body)
//   passport.authenticate('local', async function (err, user, info) {
//     try {
//       if (err) {
//         console.log(err)
//         return next(err)
//       }
//       console.log('user', info) //user is throwing false
//       if (!user) {
//         return res.status(400).json({ message: 'Unsuccessful' })
//       }
//       //asign jwt token when i login
//       req.logIn(user, async function (err) {
//         if (err) {
//           return next(err)
//         }else{
//           return {

//           }
//         }
//       })
//     } catch (error) {}
//     //needs to be asynch
//     // if (err) {
//     //   return next(err)
//     // }
//     // console.log('login user', user)
//     // if (!user) {
//     //   return res.status(400).json({ message: 'Unsuccesful' })
//     // }
//     // req.logIn(user, function (err) {
//     //   if (err) {
//     //     return next(err)
//     //   }

//     //   return res.status(200).json({ message: 'Successful' })
//     // })
//   })(req, res)
// })

router.post('/login', async (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    try {
      if (err || !user) {
        // const error = new Error('An error occurred.')

        return next(err)
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error)

        const body = { _id: user._id, email: user.email }
        const token = jwt.sign({ user: body }, process.env.SECRET)

        return res.json({ token })
      })
    } catch (error) {
      // return next(error)
      console.log('error', error)
      return res.status(500).json({ message: 'something went wrong!' })
    }
  })(req, res, next)
})

module.exports = router
