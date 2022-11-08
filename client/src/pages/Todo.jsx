import React, { useState, useEffect } from 'react'
import { ListGroup, Form, Button, Table } from 'react-bootstrap'
import EditTodo from '../components/EditTodo'
import axios from 'axios'
//
const Todo = () => {
  //react use statecode [param1, param2] data state, setdata
  const [text, setText] = useState('')
  // const Form = () => {}
  // pass in my todolist as an array to map to listgroup
  const [todoList, setTodoList] = useState([])
  const [show, setShow] = useState(false)
  //set to null because there is no value now
  const [editIndex, setEditIndex] = useState(null)

  async function submitHandler(e) {
    //prevents page from refreshing or jumping to another page
    e.preventDefault()
    try {
      console.log('submit')
      //let response be posting to the url in todo object
      let resp = await axios.post(
        `${process.env.REACT_APP_API}/todos/newpost`,
        {
          text,
        }
      ) //put resp data into settodolist
      console.log(resp)
      //setTodolist gets response data from todolist found in console
      setTodoList(resp.data.todoList)
      // do something with response
      // {todo} works as a property name and assign a value to the property name
    } catch (error) {
      console.error(error)
    }
  }
  //in order to handle the change from the input handle change runs every keystroke to update the react state
  function handleChange(e) {
    //target is form.control whenever user type, pass in it will constantly update the state
    setText(e.target.value)
  }
  // another function that gets all the url
  async function getAllTodos() {
    try {
      let resp = await axios.get(`${process.env.REACT_APP_API}/todos/allpost`)
      //get response data again from the todolist found in console
      setTodoList(resp.data.todoList)
    } catch (error) {
      console.error(error)
    }
  }
  //useeffect tells react component what to do after render
  useEffect(() => {
    getAllTodos()
  }, [])

  async function deleteTodos(id) {
    try {
      let resp = await axios.delete(
        `${process.env.REACT_APP_API}/todos/deletepost/${id}`
      )
      setTodoList(resp.data.todoList)
    } catch (error) {
      console.error(error)
    }
  }
  // this function sets for edit index and open the modal
  function editTodo(index) {
    setEditIndex(index)
    setShow(true)
  }

  async function strikeOut(id) {
    try {
      let resp = await axios.put(
        `${process.env.REACT_APP_API}/todos/editpost/${id}`,
        { isdone: true }
      )
      setTodoList(resp.data.todoList)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h1>Todos</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='formBasicTodos'>
          <Form.Label className='text-center'>Enter Todo</Form.Label>
          <Form.Control
            type='text'
            placeholder='Todos'
            // handle change runs every keystroke to update the react state
            onChange={handleChange}
            name='Todo'
            value={text}
          />

          <Form.Text className='text-muted'></Form.Text>
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th
              colSpan='6'
              type='text'
              placeholder='Todos'
              // handle change runs every keystroke to update the react state
              onChange={handleChange}
              name='Todo'
              value={text}
            >
              Todos
            </th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {todoList.map((todo, i) => (
            <tr id={todo._id}>
              <td>{i + 1}</td>
              <td colSpan='6' onClick={() => strikeOut(todo._id)}>
                {!todo.isdone ? todo.text : <strike>{todo.text}</strike>}
              </td>
              <td>
                <Button variant='danger' onClick={() => deleteTodos(todo._id)}>
                  Delete
                </Button>
                <Button variant='success' onClick={() => editTodo(i)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* <ListGroup>
        {todoList.map((todo, i) => (
          <ListGroup.Item id={todo._id} className='w-100' onClick={strikeOut}>
            {todo.text}
            <Button variant='danger' onClick={() => deleteTodos(todo._id)}>
              Delete
            </Button>
            <Button variant='success' onClick={() => editTodo(i)}>
              Edit
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup> */}
      {/* passing data from my todolist entire array to setEditindex */}
      <EditTodo show={show} setShow={setShow} todo={todoList[editIndex]} />
    </div>
  )
}

export default Todo
