import React, { useRef, useState, useEffect } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { auth } from '../../firebase'

import { useAuth } from '../../contexts/AuthContext'
import Client from '../../models/Client'
import { GoBackLink } from '../GoBackLink'

export function UpdateProfileView() {
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const usernameRef = useRef()
  const emailRef = useRef()
  const nationalIDRef = useRef()
  const addressRef = useRef()

  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail, setCurrentUser } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value)
      return setError('Error: Passwords do not match')

    const sameEmailQuery = await Client.all().where('mail', '==', emailRef.current.value).get()
    if (sameEmailQuery.size !== 0 && emailRef.current.value !== currentUser.db.get('mail'))
      return setError('Error: This email is already used with another account')

    const sameUsernameQuery = await Client.all().where('nume_utilizator', '==', usernameRef.current.value).get()
    if (sameUsernameQuery.size !== 0 && usernameRef.current.value !== currentUser.db.get('nume_utilizator'))
      return setError('Error: The username is already used with another account')

    const sameIDQuery = await Client.all().where('CNP', '==', nationalIDRef.current.value).get()
    if (sameIDQuery.size !== 0 && nationalIDRef.current.value !== currentUser.db.get('CNP'))
      return setError('Error: The nationality ID is already used with another account')

    if (nationalIDRef.current.value.length !== 13)
      return setError('Your CNP does not have exactly 13 characters')

    if (/^\d+$/.test(nationalIDRef.current.value) === false)
      return setError('Your CNP contains non-digit characters')

    if (addressRef.current.value.length <= 0)
      return setError('You must fill in your address')

    if (usernameRef.current.value.length < 6)
      return setError('Your username must be at least 6 characters long')

    const promises = []
    setLoading(true)
    setError('')

    if (emailRef.current.value !== currentUser.email)
      promises.push(updateEmail(emailRef.current.value))

    if (passwordRef.current.value)
      promises.push(updatePassword(passwordRef.current.value))

    Promise.all(promises)
      .then(async () => {
        if (emailRef.current.value) {
          await Client.all().doc(currentUser.db.id).update({
            prenume: firstNameRef.current.value,
            nume: lastNameRef.current.value,
            nume_utilizator: usernameRef.current.value,
            CNP: nationalIDRef.current.value,
            adresa: addressRef.current.value,
            mail: emailRef.current.value
          })
        }
        history.push('/profile')
      })
      .catch((err) => {
        setError(`${err}`)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    return auth.onAuthStateChanged(async user => {
      if (user)
        user.db = (await Client.all().where('mail', '==', user.email).get()).docs[0]
      setCurrentUser(user)
    })
  })

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Update Profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='firstName'>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                ref={firstNameRef}
                defaultValue={currentUser.db.get('prenume')}
              />
            </Form.Group>
            <Form.Group id='lastName'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                ref={lastNameRef}
                defaultValue={currentUser.db.get('nume')}
              />
            </Form.Group>
            <Form.Group id='username'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                ref={usernameRef}
                defaultValue={currentUser.db.get('nume_utilizator')}
              />
            </Form.Group>
            <Form.Group id='nationalID'>
              <Form.Label>National ID</Form.Label>
              <Form.Control
                ref={nationalIDRef}
                defaultValue={currentUser.db.get('CNP')}
              />
            </Form.Group>
            <Form.Group id='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                ref={addressRef}
                defaultValue={currentUser.db.get('adresa')}
              />
            </Form.Group>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                ref={emailRef}
                defaultValue={currentUser.db.get('mail')}
              />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>New password</Form.Label>
              <Form.Control
                type='password'
                ref={passwordRef}
                placeholder='Leave blank to keep the same'
              />
            </Form.Group>
            <Form.Group id='password-confirm'>
              <Form.Label>Retype new password</Form.Label>
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

      <GoBackLink text='Cancel'/>
    </>
  )
}
