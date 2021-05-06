  import React , { useRef } from 'react'
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
          <Nav.Link href='/dashboard'>
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
          <Nav.Link href='/login'>
              <Button variant='info' size='lg'>Log in</Button>
            </Nav.Link>

          <Nav.Link href='/register'>
            <Button variant='danger' size='lg'>Register</Button>
          </Nav.Link>
        </>
      )
    }
  }

  return (
    <>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Brand href='/'>
        <h2 className='linkText'>DogeBank</h2>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>

        <Nav className='mr-auto'>
          <Nav.Link href='/about'>
            <h5 className='linkText'>About US</h5>
          </Nav.Link>
          <Nav.Link href='/support'>
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
