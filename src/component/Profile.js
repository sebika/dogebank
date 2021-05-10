import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'
import Client from '../models/Client'

export function Profile() {
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>My Profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <p><h6>First Name</h6>
          {currentUser.db.get('prenume')}</p>

          <p><h6>Second Name</h6>
          {currentUser.db.get('nume')}</p>

          <p><h6>Username</h6>
          {currentUser.db.get('nume_utilizator')}</p>

          <p><h6>Email</h6>
          {currentUser.db.get('mail')}</p>

          <p><h6>National ID</h6>
          {currentUser.db.get('CNP')}</p>

          <p><h6>Address</h6>
          {currentUser.db.get('adresa')}</p>

          <Link to='/update-profile'>
            <Button disabled={loading} className='w-100'>
              Update Profile
            </Button>
          </Link>
        </Card.Body>
      </Card>
      
    </>
  )
}
