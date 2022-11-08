import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Col, Container, Form } from 'react-bootstrap'

function Register({ setIsAuth }) {
  const history = useHistory()
  console.log(history)
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  function handleChange(e) {
    let newForm = { ...form, [e.target.name]: e.target.value }
    setForm(newForm)
  }

  async function submitHandler(e) {
    e.preventDefault()
    // console.log(process.env.REACT_APP_API, form)
    try {
      console.log('1')
      let resp = await axios.post(
        `${process.env.REACT_APP_API}/auth/register`,
        {
          form,
        }
      )
      if (resp.status === 200) {
        history.push('/login')
        // return <Redirect path='/login' /> doesn't work history.push works
      }
      console.log('res', resp)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='cdash d-flex align-items-center'>
      <Container className='text-center'>
        <Col md={4} className='mx-auto py-4 cont2 shadow'>
          <h3>
            <strong>REGISTER</strong>
          </h3>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='formBasicEmail'>
              {/* <Form.Label>Email Address</Form.Label> */}
              <Form.Control
                type='email'
                placeholder='Enter email'
                onChange={handleChange}
                name='email'
                value={form.email}
              />
              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              {/* <Form.Label>Password</Form.Label> */}
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
        </Col>
      </Container>
    </div>
  )
}

export default Register
