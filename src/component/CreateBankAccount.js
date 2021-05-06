import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import { FaAddressBook } from 'react-icons/fa'
import { Link, useHistory } from 'react-router-dom'

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
      let IBAN = "RO69DOGE"
      for (let i = 0; i < 16; i++) {
        IBAN += Math.floor(Math.random() * 10).toString()
      }
      const IBANQuery = (await BankAccount.all().where('IBAN', '==', IBAN).get())

      if (IBANQuery.size === 0)
        return IBAN;
    }
  }

  async function createAccount(data) {
      await BankAccount.create({
        client: { collection: "Client", id: currentUser.db.id },
        IBAN: await generateIBAN(),
        moneda: data.currency,
        nume: data.accountNickname
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
      <Card style={{marginTop:-30, marginBottom:70}}>
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
              <Form.Control type='text' ref={currencyRef} required />

            </Form.Group>

            <Button disabled={loading} className='w-100' type='submit'>
              Create Bank Account
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}
