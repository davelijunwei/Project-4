import React, { useState } from 'react'
import { Container, Button, Form, Col } from 'react-bootstrap'
import { NavLink, Redirect } from 'react-router-dom'
import axios from 'axios'

function Login({ setIsAuth }) {
  //useState local to component store data
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  function handleChange(e) {
    //...clones prop n value
    let newForm = { ...form, [e.target.name]: e.target.value }
    setForm(newForm)
  }

  async function submitHandler(e) {
    e.preventDefault()
    console.log('login clicked')
    // console.log(process.env.REACT_APP_API, form)
    try {
      let resp = await axios.post(
        `${process.env.REACT_APP_API}/auth/login`,
        form
      )

      // console.log(form)
      console.log(resp)
      // console.log(resp.status)
      // if (resp.status === 200) {
      setIsAuth(true)
      localStorage.setItem('token', resp.data.token)
      //}
    } catch (error) {
      //alert('login clicked inside catch')
      console.error(error)
    }
  }
  return (
    <div>
      <Container className='text-center'>
        <Col md={4} className='mx-auto py-4 cont2 shadow'>
          <h3>
            <strong>LOGIN</strong>
          </h3>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='formBasicEmail'>
              {/* <Form.Label>Please Enter Email</Form.Label> */}
              <Form.Control
                type='email'
                placeholder='Enter email'
                onChange={handleChange}
                name='email'
                value={form.email}
              />
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              {/* <Form.Label>Please Enter Password</Form.Label> */}
              <Form.Control
                type='password'
                placeholder='Password'
                onChange={handleChange}
                value={form.password}
                name='password'
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
          <NavLink to='/register'>Sign Up Now </NavLink>
        </Col>
      </Container>
    </div>
  )
}

export default Login
