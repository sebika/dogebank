import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

export function Dashboard() {
  const { currentUser } = useAuth()

  function DisplayButtons() {
    return (
      <>
        <Link to='/update-profile' className='btn btn-outline-dark w-100 mt-3'>
          Update profile
        </Link>

        <Link to='/create-bank-account' className='btn btn-outline-dark w-100 mt-3'>
          Create new bank account
        </Link>

        <Link to='/create-transaction' className='btn btn-outline-dark w-100 mt-3'>
          Create new transaction
        </Link>

        {
          currentUser.db.get('is_helpdesk') &&
          <Link to='/account-creation-requests' className='btn btn-primary w-100 mt-3'>
            Account creation requests
          </Link>
        }
      </>
    )
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Profile</h2>
          <strong>Email:</strong> {currentUser.email}

          <DisplayButtons />

        </Card.Body>
      </Card>
    </>
  )
}
