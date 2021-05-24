import React from 'react'
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

export function Header() {
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    await logout()
    history.push('/')
  }

  function MenuButtons() {
    if (currentUser) {
      return (
        <>
          <Nav.Link as={Link} to='/dashboard'>
              <Button variant='secondary' size='lg'>{currentUser.email}</Button>
          </Nav.Link>
          <Nav.Link onClick={handleLogout}>
            <Button variant='danger' size='lg'>Logout</Button>
          </Nav.Link>
        </>
      )
    }
    else {
      return (
        <>
          <Nav.Link as={Link} to='/login'>
              <Button variant='info' size='lg'>Log in</Button>
            </Nav.Link>

          <Nav.Link as={Link} to='/register'>
            <Button variant='danger' size='lg'>Register</Button>
          </Nav.Link>
        </>
      )
    }
  }

  return (
    <>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Brand as={Link} to='/'>
        <h2 className='linkText'>DogeBank</h2>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>

        <Nav className='mr-auto'>
          <Nav.Link as={Link} to='/support'>
            <h5 className='linkText'>Support</h5>
          </Nav.Link>
        </Nav>

        <Nav>
          <MenuButtons />
        </Nav>

      </Navbar.Collapse>
      </Navbar>
    </>
  )
}
