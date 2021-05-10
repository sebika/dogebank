import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import { FaAddressBook } from 'react-icons/fa'
import { Link, useHistory } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

export function Register() {
  const emailRef = useRef()
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const cnpRef = useRef()
  const usernameRef = useRef()
  const addressRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { register } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function validateData() {
    if (firstNameRef.current.value.length <= 0)
      throw Error('You must fill in your first name')

    if (lastNameRef.current.value.length <= 0)
      throw Error('You must fill in your last name')

    if (cnpRef.current.value.length !== 13)
      throw Error('Your CNP does not have exactly 13 characters')

    if (/^\d+$/.test(cnpRef.current.value) === false)
      throw Error('Your CNP contains non-digit characters')

    if (addressRef.current.value.length <= 0)
      throw Error('You must fill in your address')

    if (usernameRef.current.value.length <= 0 && usernameRef.current.value.length >= 6)
      throw Error('Your username must be at least 6 characters long')
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match')
    }

    try {
      setError('')
      setLoading(true)

      validateData()

      const data = {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        cnp: cnpRef.current.value,
        address: addressRef.current.value,
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value
      }

      await register(data)
      history.push('/')
    }
    catch (err){
      setError(`Failed to create an account. Error: ${err}`)
    }

    setLoading(false)
  }

  return (
    <>
      <Card style={{marginTop:-30, marginBottom:70}}>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign Up</h2>

          {error && <Alert variant='danger'>{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group id='firstName'>
              <Form.Label>First Name</Form.Label>
              <Form.Control type='text' ref={firstNameRef} required />
            </Form.Group>

            <Form.Group id='lastName'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control type='text' ref={lastNameRef} required />
            </Form.Group>

            <Form.Group id='cnp'>
              <Form.Label>CNP</Form.Label>
              <Form.Control type='text' ref={cnpRef} required />
            </Form.Group>

            <Form.Group id='address'>
              <Form.Label><FaAddressBook /> Address </Form.Label>
              <Form.Control type='text' ref={addressRef} required />
            </Form.Group>

            <Form.Group id='username'>
              <Form.Label><AiOutlineUser /> Username </Form.Label>
              <Form.Control type='text' ref={usernameRef} required />
            </Form.Group>

            <Form.Group id='email'>
              <Form.Label><AiOutlineMail /> Email </Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>

            <Form.Group id='password'>
              <Form.Label><RiLockPasswordLine /> Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required />
            </Form.Group>

            <Form.Group id='password-confirm'>
              <Form.Label><RiLockPasswordLine /> Password Confirmation</Form.Label>
              <Form.Control type='password' ref={passwordConfirmRef} required />
            </Form.Group>

            <Button disabled={loading} className='w-100' type='submit'>
              Sign Up
            </Button>

            <div className='w-100 text-center mt-2'>
              Already have an account? <Link to='/login'>Log In</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}
