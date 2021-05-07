import React, { useRef, useState, useEffect } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'
import BankAccount from '../models/BankAccount'

export function CreateTransaction() {
  const IBANSenderRef = useRef()
  const IBANRecipientRef = useRef()
  const currencyRef = useRef()
  const amountRef = useRef()
  const messageRef = useRef()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const { currentUser } = useAuth()

  const [snapshotAccounts, setSnapshotAccounts] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    BankAccount.all().where('client.id', '==', currentUser.db.id).get().then((snapshot) => {
        setSnapshotAccounts(snapshot.docs)
        setIsLoading(false)
      })
  }, [currentUser.db.id])

  async function createAccount(data) {
      await BankAccount.create({

      })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)

        const data = {

        }

      await createAccount(data)
      history.push('/dashboard')
    }
    catch (err){
      setError(`Failed to create transaction. ${err}`)
    }

    setLoading(false)
  }

  function CreateTransactionPage() {
    return (
      <>
        <Card>
          <Card.Body>
            <h2 className='text-center mb-4'>Create New Transaction</h2>

            {error && <Alert variant='danger'>{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group id='sender'>
                <Form.Label>Select a bank account</Form.Label>
                <Form.Control as='select' ref={IBANSenderRef} required>
                  {
                    snapshotAccounts.map((account, id) => (
                      <option key={id}>
                        {account.get('nume')} - {account.get('moneda')}
                      </option>
                    ))
                  }
                </Form.Control>
              </Form.Group>

              <Form.Group id='recipient'>
                <Form.Label>Recipient IBAN</Form.Label>
                <Form.Control type='text' ref={IBANRecipientRef} required />
              </Form.Group>

              <Form.Group id='amount'>
                <Form.Label>Amount</Form.Label>
                <Form.Control type='text' ref={amountRef} required />
              </Form.Group>

              <Form.Group id='currency'>
                <Form.Label>Currency</Form.Label>
                <Form.Control type='text' ref={currencyRef} required />
              </Form.Group>

              <Form.Group controlId='formBasicEmail'>
                <Form.Label>Message</Form.Label>
                <Form.Control as='textarea' maxLength='75' ref={messageRef} />
                <Form.Text className='text-muted'>
                  The recipient will receive this short message. (75 characters max)
                </Form.Text>
              </Form.Group>

              <Button disabled={loading} className='w-100' type='submit'>
                Make transaction
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <div className='w-100 text-center mt-2'>
          <Link to='/dashboard'>
              Go back
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      {isLoading ? <div>loading ...</div> : <CreateTransactionPage />}
    </>
  )
}
