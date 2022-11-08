const router = require('express').Router()
const Address = require('../models/address')

router.post('/new', async (req, res) => {
  console.log('test route', req.body)
  try {
    //destructuring set value of variable to
    let { form } = req.body
    // set modal as form field
    let address = await new Address(form)
    await address.save()
    const addressList = await Address.find()
    // retrieve entire todo find out mongo cmd to get entire todo and pass it into json{todo}
    console.log('saved', addressList)
    res.status(200).json({ addressList })
  } catch (error) {
    res.status(400)
  }
  //   res.status(200)
})

router.get('/alladdress', async (req, res) => {
  try {
    let addressList = await Address.find()
    console.log(addressList)
    res.status(200).json({ addressList })
  } catch (error) {
    console.log(error)
    res.status(400)
  }
})
router.delete('/deleteaddress/:id', async (req, res) => {
  //have to get the ID here
  console.log('deleted?', req.params.id)
  try {
    await Address.findByIdAndDelete(req.params.id)
    //todo.find finds all the things in todo
    let addressList = await Address.find()
    res.status(200).json({ addressList })
  } catch (error) {
    res.status(400)
  }
})

router.put('/editaddress/:id', async (req, res) => {
  // let { name, homephone, mobilephone, email } = req.body
  try {
    //req the id and whole body because data pass from front end must tally rmb req.body = {form}
    await Address.findByIdAndUpdate(req.params.id, req.body.form)
    console.log('working')
    let addressList = await Address.find()
    res.status(200).json({ addressList })
  } catch (error) {
    console.log(error)
    res.status(400)
  }
})

module.exports = router
