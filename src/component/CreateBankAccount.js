import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'
import BankAccount from '../models/BankAccount'

export function CreateBankAccount() {
  const accountNicknameRef = useRef()
  const currencyRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const { currentUser } = useAuth()

  async function generateIBAN() {
    while (1) {
      let IBAN = 'RO69DOGE'

      IBAN += [...Array(16).keys()].map(() => Math.floor(Math.random() * 10)).join('')

      const IBANQuery = (await BankAccount.all().where('IBAN', '==', IBAN).get())

      if (IBANQuery.size === 0)
        return IBAN;
    }
  }

  async function createAccount(data) {
      await BankAccount.create({
        client: { collection: 'Client', id: currentUser.db.id },
        IBAN: await generateIBAN(),
        moneda: data.currency,
        nume: data.accountNickname,
        amount: 0
      })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)

      const data = {
        accountNickname: accountNicknameRef.current.value,
        currency: currencyRef.current.value
      }

      await createAccount(data)
      history.push('/dashboard')
    }
    catch (err){
      setError(`Failed to create an account. ${err}`)
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Create New Bank Account</h2>

          {error && <Alert variant='danger'>{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group id='accountNickname'>
              <Form.Label>Nickname</Form.Label>
              <Form.Control type='text' ref={accountNicknameRef} required />
            </Form.Group>

            <Form.Group id='currency'>
              <Form.Label>Currency</Form.Label>
              <Form.Control as='select' ref={currencyRef} required>
                <option value='DOGECOIN'>DOGECOIN</option>
                <option value='RON'>RON</option>
                <option value='EUR'>EUR</option>
                <option value='USD'>USD</option>
                <option value='GBP'>GBP</option>
              </Form.Control>
            </Form.Group>

            <Button disabled={loading} className='w-100' type='submit'>
              Create Bank Account
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
