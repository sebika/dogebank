import React from 'react'
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useAuth } from '../../contexts/AuthContext'
import { GoBackLink } from '../GoBackLink'

export function ProfileView() {
  const { currentUser } = useAuth()

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>My Profile</h2>

          <ListGroup className='list-group-flush'>
              <ListGroupItem><strong>First Name: </strong> {currentUser.db.get('prenume')}</ListGroupItem>
              <ListGroupItem><strong>Last Name: </strong> {currentUser.db.get('nume')}</ListGroupItem>
              <ListGroupItem><strong>Username: </strong> {currentUser.db.get('nume_utilizator')}</ListGroupItem>
              <ListGroupItem><strong>Email: </strong> {currentUser.db.get('mail')}</ListGroupItem>
              <ListGroupItem><strong>National ID: </strong> {currentUser.db.get('CNP')}</ListGroupItem>
              <ListGroupItem><strong>Address: </strong> {currentUser.db.get('adresa')}</ListGroupItem>
          </ListGroup>

          <Link to='/update-profile'>
            <Button className='w-100' type='submit'>
              Update Profile
            </Button>
          </Link>
        </Card.Body>
      </Card>

      <GoBackLink />
    </>
  )
}
