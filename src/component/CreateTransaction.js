import React, { useRef, useState, useEffect } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router-dom'
import firebase from "firebase/app";

import { useAuth } from '../contexts/AuthContext'
import BankAccount from '../models/BankAccount'
import Transaction from '../models/Transaction'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function CreateTransaction() {
  const senderAccountNameRef = useRef()
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

  const query = useQuery();

  useEffect(() => {
    BankAccount.all().where('client.id', '==', currentUser.db.id).get().then((snapshot) => {
        setSnapshotAccounts(snapshot.docs)
        setIsLoading(false)
      })
  }, [currentUser.db.id])

  async function createData() {
    if (senderAccountNameRef.current.value === 'Choose an account')
      throw Error('You need to select one of your bank accounts!')

    if (IBANSenderRef.current.value === IBANRecipientRef.current.value)
      throw Error('The sender and recipient email are the same!')

    if (isNaN(Number(amountRef.current.value)))
      throw Error('Please enter a valid amount!')

    if (Number(amountRef.current.value) < 0)
      throw Error('Please enter a positive amount!')

    const sender = snapshotAccounts.find(
      account => account.get('nume') === senderAccountNameRef.current.value
    )
    if (amountRef.current.value > sender.get('suma'))
      throw Error('You have insufficient funds!')

    const query = await BankAccount.all().where('IBAN', '==', IBANRecipientRef.current.value).get()
    if (query.size !== 1)
      throw Error('There is no bank account with the IBAN you specified')

    const recipient = query.docs[0]
    BankAccount.all().doc(sender.id).update({
      suma: sender.get('suma') - Number(amountRef.current.value)
    })
    BankAccount.all().doc(recipient.id).update({
      suma: recipient.get('suma') + Number(amountRef.current.value)
    })

    return {
      expeditor: {collection: 'BankAccount', id: sender.id},
      destinatar: {collection: 'BankAccount', id: recipient.id},
      suma: Number(amountRef.current.value),
      moneda: currencyRef.current.value,
      mesaj: messageRef.current.value,
      data: firebase.firestore.Timestamp.now().seconds
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const transactionData = await createData()
      setLoading(true)
      setError('')
      await Transaction.create(transactionData)
      history.push('/dashboard')
    }
    catch (err) {
      setError(`Failed to create transaction. ${err}`)
    }

    setLoading(false)
  }

  function CreateTransactionPage() {
    const [senderIBAN, setSenderIBAN] = useState('')
    const [senderCurrency, setSenderCurrency] = useState('')

    useEffect(() => {
      if (!snapshotAccounts || !query.get('name') || query.get('name').length === 0)
        return

      handleChange(query.get('name'))

    }, [])

    function handleChange(event) {
      // event can either be a String or an Event object
      const currentAccount = snapshotAccounts.find(
        account => account.get('nume') === (event.target ? event.target.value : event)
      )

      if (!currentAccount)
        return

      setSenderIBAN(currentAccount.get('IBAN'))
      setSenderCurrency(currentAccount.get('moneda'))
    }

    return (
      <>
        <Card>
          <Card.Body>
            <h2 className='text-center mb-4'>Create New Transaction</h2>

            {error && <Alert variant='danger'>{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group id='senderAccountName'>
                <Form.Label>Select bank account</Form.Label>
                <Form.Control as='select' ref={senderAccountNameRef} onChange={handleChange} defaultValue={query.get('name')} required>
                  <option style={{display: 'none', disabled: 'true', selected: 'true'}}>
                    Choose an account
                  </option>
                  {
                    snapshotAccounts.map((account, id) => (
                      <option key={id}>
                        {account.get('nume')}
                      </option>
                    ))
                  }
                </Form.Control>
              </Form.Group>

              <Form.Group id='sender'>
                <Form.Label>Sender IBAN</Form.Label>
                <Form.Control type='text' ref={IBANSenderRef} value={senderIBAN} readOnly />
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
                <Form.Control type='text' ref={currencyRef} value={senderCurrency} readOnly />
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

        <div className='w-100 text-center mt-2' style={{marginBottom:70}}>
          <Button variant='link' onClick={() => history.goBack()}>
            Cancel
          </Button>
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
