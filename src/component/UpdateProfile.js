import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'
import Client from '../models/Client'

export function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Error: Passwords do not match')
    }

    let sameEmailQuery = (await Client.all().where('mail', '==', emailRef.current.value).get())
    if (sameEmailQuery.size !== 0 && emailRef.current.value !== currentUser.email)
      return setError('Error: This email is already used with another account')

    const promises = []
    setLoading(true)
    setError('')

    if (emailRef.current.value !== currentUser.email)
      promises.push(updateEmail(emailRef.current.value))

    if (passwordRef.current.value)
      promises.push(updatePassword(passwordRef.current.value))

    if (emailRef.current.value) {
      promises.push(Client.all().doc(currentUser.db.id).update({mail: emailRef.current.value}))
    }

    Promise.all(promises)
      .then(() => {
        history.push('/dashboard')
      })
      .catch((err) => {
        setError(`${err}`)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Update Profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                ref={passwordRef}
                placeholder='Leave blank to keep the same'
              />
            </Form.Group>
            <Form.Group id='password-confirm'>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type='password'
                ref={passwordConfirmRef}
                placeholder='Leave blank to keep the same'
              />
            </Form.Group>
            <Button disabled={loading} className='w-100' type='submit'>
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Link to='/dashboard'>Cancel</Link>
      </div>
    </>
  )
}
