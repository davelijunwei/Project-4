import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios'

function EditTodo({ show, setShow, todo }) {
  const handleClose = () => setShow(false)
  //to show the original todo.text
  const [text, setText] = useState('')
  async function updateTodo() {
    try {
      let resp = await axios.put(
        `http://localhost:8080/todos/editpost/${todo._id}`,
        {
          text,
        }
      )
      // setTodoList(resp.data.todoList)
    } catch (error) {
      console.error(error)
    }
  }

  function handleChange(e) {
    //target is form.control whenever user type, pass in it will constantly update the state
    setText(e.target.value)
  }

  useEffect(() => {
    //if checks if data exist
    if (todo) {
      setText(todo.text)
    }
  }, [todo])

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Your Todos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={updateTodo}>
          <Form.Group controlId='formBasicEmail'>
            <Form.Control
              type='text'
              // handle change runs every keystroke to update the react state
              onChange={handleChange}
              name='Todo'
              value={text}
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Modal.Body>
      {/* <Modal.Body>{todo && todo.text}</Modal.Body> */}
      {/* <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='primary' onClick={updateTodo}>
          Save Changes
        </Button>
      </Modal.Footer> */}
    </Modal>
  )
}

export default EditTodo

//   const [show, setShow] = useState(false)

//   const handleShow = () => setShow(true)
