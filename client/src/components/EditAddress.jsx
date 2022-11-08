import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios'

// function EditTodo({ show, setShow, todo }) {

function EditAddress({ showEdit, setShowEdit, setAddressList, address }) {
  console.log(address)
  const handleClose = () => setShowEdit(false)
  //   const handleClose = () => setForm(false)
  //to show the original todo.text
  const [form, setForm] = useState({
    name: '',
    homephone: '',
    mobilephone: '',
    email: '',
  })
  function handleChange(e) {
    //... means copy all in the form, take then form control target name is the property
    let newForm = { ...form, [e.target.name]: e.target.value }
    setForm(newForm)
    //target is form.control whenever user type, pass in it will constantly update the state
  }
  async function submitHandler(e) {
    e.preventDefault()
    console.log(process.env.REACT_APP_API, form)
    try {
      let resp = await axios.put(
        `${process.env.REACT_APP_API}/addressbook/editaddress/${address._id}`,
        {
          form,
        }
      )
      // console.log(resp.data)

      setAddressList(resp.data.addressList)
      handleClose()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    console.log(address)
    if (address) {
      setForm(address)
    }
  }, [address])
  return (
    <Modal show={showEdit} onHide={handleClose}>
      {/* <Modal show={show} onHide={handleClose}> */}
      <Modal.Header closeButton>
        <Modal.Title>Edit Address</Modal.Title>
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

export default EditAddress
