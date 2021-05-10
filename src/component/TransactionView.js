import React, { useState, useEffect } from 'react'
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import _ from "lodash";

import { useAuth } from '../contexts/AuthContext'
import Transaction from '../models/Transaction'
import BankAccount from '../models/BankAccount'
import Client from '../models/Client';

export function TransactionView() {
  const [currentUserTransactions, setCurrentUserTransactions] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const { currentUser } = useAuth()
  const history = useHistory()

  useEffect(() => {
    async function getCurrentUserTransactions() {
      const currentUserAccounts = await BankAccount.all().where('client.id', '==', currentUser.db.id).get()
      const accountIds = currentUserAccounts.docs.map(doc => doc.id)

      if (accountIds.length > 0) {
        const isSenderPromise = Transaction.all().where('expeditor.id', 'in', accountIds).get()
        const isReceiverPromise = Transaction.all().where('destinatar.id', 'in', accountIds).get()

        const [
          sentTransactions,
          receivedTransactions
        ] = await Promise.all([isSenderPromise, isReceiverPromise])

        let transactionList = _.concat(sentTransactions.docs, receivedTransactions.docs)
        transactionList = _.uniqWith(transactionList, _.isEqual).sort((t1, t2) => t1.get('data') < t2.get('data'))

        for (let transaction of transactionList) {
          const senderId = transaction.get('expeditor.id')
          const receiverId = transaction.get('destinatar.id')
          const isSender = accountIds.find((id) => id === senderId)

          const thisClientBankAccountId = isSender ? senderId : receiverId
          const otherClientBankAccountId = isSender ? receiverId : senderId

          const otherClientBankAccount = await BankAccount.all().doc(otherClientBankAccountId).get()
          const otherClient = await Client.all().doc(otherClientBankAccount.get('client.id')).get()

          transaction.thisBankAccount = await BankAccount.all().doc(thisClientBankAccountId).get()
          transaction.otherBankAccount = otherClientBankAccount
          transaction.otherClient = otherClient
          transaction.isSender = isSender
        }
        setCurrentUserTransactions(transactionList)
      }
      setIsLoading(false)
    }

    getCurrentUserTransactions()
  }, [currentUser.db.id])

  function TransactionViewCreator() {
    return currentUserTransactions.map((request, id) => (
      <TransactionCard doc={request} id={id + 1} key={id} />
    ))
  }

  function TransactionCard({doc}) {
    return (
      <>
        <Card border={doc.isSender ? 'danger' : 'success'} className='mt-3'>
          <Card.Header>Transaction {doc.isSender ? 'from' : 'to'}: {doc.thisBankAccount.get('nume')}</Card.Header>
          <Card.Body>
            <ListGroup className='list-group-flush' bg='success'>
              <ListGroupItem>
                <strong>Transaction {doc.isSender ? 'to' : 'from'}: </strong>
                {doc.otherClient.get('nume_utilizator')} ({doc.otherBankAccount.get('IBAN')})
              </ListGroupItem>
              <ListGroupItem>
                <strong>Timestamp: </strong>
                {new Date(doc.get('data') * 1000).toUTCString()}
              </ListGroupItem>
              <ListGroupItem><strong>Message: </strong> {doc.get('mesaj')}</ListGroupItem>
              <ListGroupItem>
                <strong>Amount: </strong>
                <div style={{color: doc.isSender ? 'red' : 'green', display: 'inline'}}>
                  {doc.isSender ? '-' : '+'}{doc.get('suma')}
                </div> {doc.get('moneda')}
              </ListGroupItem>
            </ListGroup>
          </Card.Body>
        </Card>
      </>
    )
  }

  return (
    <>
      {isLoading ? <div>Loading ...</div> : <TransactionViewCreator />}
      <div className='w-100 text-center mt-2' style={{marginBottom:70}}>
        <Button variant='link' onClick={() => history.goBack()}>
          Go Back
        </Button>
      </div>
    </>
  )
}
