import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios'

// function EditTodo({ show, setShow, todo }) {

function AddContact({ showAdd, setShowAdd, setAddressList }) {
  const defaultForm = {
    name: '',
    homephone: '',
    mobilephone: '',
    email: '',
  }
  const handleClose = () => setShowAdd(false)
  //   const handleClose = () => setForm(false)
  //to show the original todo.text
  const [form, setForm] = useState(defaultForm)
  function handleChange(e) {
    //... means copy all in the form, take then form control target name is the property
    let newForm = { ...form, [e.target.name]: e.target.value }
    //target is form.control whenever user type, pass in it will constantly update the state
    setForm(newForm)
  }
  async function submitHandler(e) {
    e.preventDefault()
    // console.log(process.env.REACT_APP_API, form)
    try {
      console.log('1')
      let resp = await axios.post(
        `${process.env.REACT_APP_API}/addressbook/new`,
        {
          form,
        }
      )
      // console.log(resp.data)
      console.log('2')
      setAddressList(resp.data.addressList)

      setForm(defaultForm)
      console.log('3')

      handleClose()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Modal show={showAdd} onHide={handleClose}>
      {/* <Modal show={show} onHide={handleClose}> */}
      <Modal.Header closeButton>
        <Modal.Title>Add Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler}>
          {/* <Form onSubmit={}> */}
          <Form.Group controlId=''>
            <Form.Control
              placeholder='Name'
              type='text'
              // handle change runs every keystroke to update the react state
              onChange={handleChange}
              name='name'
              value={form.name}
            />
            <Form.Control
              placeholder='Homephone'
              type='number'
              // handle change runs every keystroke to update the react state
              onChange={handleChange}
              name='homephone'
              value={form.homephone}
            />
            <Form.Control
              placeholder='mobilephone'
              type='number'
              // handle change runs every keystroke to update the react state
              onChange={handleChange}
              name='mobilephone'
              value={form.mobilephone}
            />
            <Form.Control
              placeholder='email'
              type='email'
              // handle change runs every keystroke to update the react state
              onChange={handleChange}
              name='email'
              value={form.email}
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default AddContact
