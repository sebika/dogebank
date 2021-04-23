import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

export function Header() {
  return (
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
        <Nav.Link href='/login'>
          <Button variant='info' size='lg'>Log in</Button>
        </Nav.Link>

        <Nav.Link href='/register'>
          <Button variant='danger' size='lg'>Register</Button>
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
    </Navbar>
  );
}
