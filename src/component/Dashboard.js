import React from 'react'
import { Card, Container, ListGroup, CardColumns, CardDeck } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

export function Dashboard() {
  const { currentUser } = useAuth()
  const history = useHistory()

  function redirect(path) {
    history.push(path)
  }

  return (
    <Container className='d-flex align-items-center justify-content-center' style={{marginTop: '50px'}}>
      <CardColumns>
        <Card border='secondary'>
          <Card.Body>
            <h2 className='text-center mb-4'>Profile</h2>
            <Card.Subtitle className='text-muted text-center'>
              Find more details about your profile
            </Card.Subtitle>
          </Card.Body>
          <ListGroup className='text-center'>
            <ListGroup.Item action variant='secondary' onClick={() => redirect('/update-profile')}>
              Update profile
            </ListGroup.Item>
          </ListGroup>
        </Card>

        <Card border='secondary'>
          <Card.Body>
            <h2 className='text-center mb-4'>Operations</h2>
            <Card.Subtitle className='text-muted text-center'>
              You can make transactions, create accounts, or view account information
            </Card.Subtitle>
          </Card.Body>
          <ListGroup className='text-center'>
            <ListGroup.Item action variant='secondary' onClick={() => redirect('/create-bank-account')}>
              Create new bank account
            </ListGroup.Item>
            <ListGroup.Item action variant='secondary' onClick={() => redirect('/create-transaction')}>
              Create new transaction
            </ListGroup.Item>
            {
            currentUser.db.get('is_helpdesk') &&
            <ListGroup.Item action variant='secondary' onClick={() => redirect('/account-creation-requests')}>
              Account creation requests
            </ListGroup.Item>
            }
          </ListGroup>
        </Card>

        <Card border='secondary'>
          <Card.Body>
            <h2 className='text-center mb-4'>Support</h2>
            <Card.Subtitle className='text-muted text-center'>
              You and your privacy matter. If you want to learn more ask us any questions
            </Card.Subtitle>
          </Card.Body>
          <ListGroup className='text-center'>
            <ListGroup.Item action variant='secondary' onClick={() => redirect('/support')}>
              Ask a question
            </ListGroup.Item>
          </ListGroup>
        </Card>

      </CardColumns>
    </Container>
  )
}
