import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import { Link, useHistory } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

export function Register() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { register } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match')
    }

    try {
      setError('')
      setLoading(true)
      await register(emailRef.current.value, passwordRef.current.value)
      history.push('/')
    }
    catch {
      setError('Failed to create an account')
    }

    setLoading(false)
  }

  return (
    <>
      <Container className='d-flex align-items-center justify-content-center' style={{marginTop: '50px'}}>
        <div className='w-100' style={{ maxWidth: '500px'}}>
          <Card>
            <Card.Body>
              <h2 className='text-center mb-4'>Sign Up</h2>

              {error && <Alert variant='danger'>{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group id='email'>
                  <Form.Label><AiOutlineMail /> Email </Form.Label>
                  <Form.Control type='email' ref={emailRef} required />

                </Form.Group>

                <Form.Group id='password'>
                  <Form.Label><RiLockPasswordLine /> Password</Form.Label>
                  <Form.Control type='password' ref={passwordRef} required />
                </Form.Group>

                <Form.Group id='password-confirm'>
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control type='password' ref={passwordConfirmRef} required />
                </Form.Group>

                <Button disabled={loading} className='w-100' type='submit'>
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className='w-100 text-center mt-2'>
            Already have an account? <Link to='/login'>Log In</Link>
          </div>
        </div>
      </Container>
    </>
  )
}
