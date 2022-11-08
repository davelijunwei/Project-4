import React from 'react'
import axios from 'axios'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { NavLink, useHistory } from 'react-router-dom'
//remember to add {} to specific prop
function Header({ isAuth, setIsAuth }) {
  const history = useHistory()

  async function logOut(e) {
    // e.preventDefault()
    try {
      console.log('log out')
      let resp = await axios.get(`${process.env.REACT_APP_API}/auth/`)

      console.log('resp', resp)
      if (resp.status === 200) {
        setIsAuth(false)
        history.push('/login')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand href='#home'>
          <NavLink to='/'>Dashboard</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <NavLink className='nav-link' to='/todo'>
              Todo
            </NavLink>
            <NavLink className='nav-link' to='/stock'>
              Stock
            </NavLink>
            <NavLink className='nav-link' to='/addressbook'>
              AddressBook
            </NavLink>
          </Nav>
          {!isAuth && (
            <>
              <NavLink className='nav-link' to='/login'>
                Login
              </NavLink>
              <NavLink className='nav-link' to='/Register'>
                Register
              </NavLink>
            </>
          )}
          {isAuth && <Button onClick={logOut}>Log out</Button>}
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Header
