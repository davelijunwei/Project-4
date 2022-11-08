const router = require('express').Router()
const Todo = require('../models/todo')

router.post('/newpost', async (req, res) => {
  try {
    console.log('test route', req.body)
    //destructuring set value of variable to
    let { text } = req.body
    // set modal as text field
    let todo = await new Todo({ text })
    console.log(todo)
    await todo.save()

    const todoList = await Todo.find()
    // retrieve entire todo find out mongo cmd to get entire todo and pass it into json{todo}
    console.log('saved', todoList)
    res.status(200).json({ todoList })
  } catch (error) {
    res.status(400)
  }
  //   res.status(200)
})

router.get('/allpost', async (req, res) => {
  try {
    let todoList = await Todo.find()
    res.status(200).json({ todoList })
  } catch (error) {
    console.log(error)
    res.status(400)
  }
})
router.delete('/deletepost/:id', async (req, res) => {
  //have to get the ID here
  console.log('deleted?', req.params.id)
  try {
    await Todo.findByIdAndDelete(req.params.id)
    //todo.find finds all the things in todo
    let todoList = await Todo.find()
    res.status(200).json({ todoList })
  } catch (error) {
    res.status(400)
  }
})

router.put('/editpost/:id', async (req, res) => {
  console.log('updated?', req.params.id, req.body)
  try {
    //req the id and whole body because data pass from front end must tally rmb req.body = {text}
    await Todo.findByIdAndUpdate(req.params.id, req.body)
    let todoList = await Todo.find()
    res.status(200).json({ todoList })
  } catch (error) {
    console.log(error)
    res.status(400)
  }
})

module.exports = router
