import React from 'react'
import { Card, Container, ListGroup, CardColumns } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { AiOutlinePlusSquare } from 'react-icons/ai'
import { BsEye } from 'react-icons/bs'
import { MdUpdate } from 'react-icons/md'
import { RiQuestionnaireLine } from 'react-icons/ri'

import { useAuth } from '../../contexts/AuthContext'

export function DashboardView() {
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
            <ListGroup.Item action variant='warning' onClick={() => redirect('/update-profile')}>
              <MdUpdate size='25px' /> Update profile
            </ListGroup.Item>
            <ListGroup.Item action variant='info' onClick={() => redirect('/profile')}>
              <BsEye size='25px' /> View Profile
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
            <ListGroup.Item action variant='success' onClick={() => redirect('/create-bank-account')}>
              <AiOutlinePlusSquare size='25px'/> Create new bank account
            </ListGroup.Item>
            <ListGroup.Item action variant='success' onClick={() => redirect('/create-transaction')}>
              <AiOutlinePlusSquare size='25px'/> Create new transaction
            </ListGroup.Item>
            <ListGroup.Item action variant='info' onClick={() => redirect('/show-bank-account')}>
              <BsEye size='25px'/> View bank accounts
            </ListGroup.Item>
            <ListGroup.Item action variant='info' onClick={() => redirect('/transactions')}>
              <BsEye size='25px'/> View transactions
            </ListGroup.Item>
            {
            currentUser.db.get('is_helpdesk') &&
            <ListGroup.Item action variant='info' onClick={() => redirect('/account-creation-requests')}>
              <BsEye size='25px'/> View account requests
            </ListGroup.Item>
            }
            {
            currentUser.db.get('is_helpdesk') &&
            <ListGroup.Item action variant='info' onClick={() => redirect('/questions')}>
              <BsEye size='25px'/> View questions
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
            <ListGroup.Item action variant='dark' onClick={() => redirect('/support')}>
              <RiQuestionnaireLine size='25px' /> Ask a question
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </CardColumns>
    </Container>
  )
}
