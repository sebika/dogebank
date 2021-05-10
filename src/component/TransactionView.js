import React, { useState, useEffect } from 'react'
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import _ from "lodash";

import { useAuth } from '../contexts/AuthContext'
import Transaction from '../models/Transaction'
import BankAccount from '../models/BankAccount'

export function TransactionView() {
  const [currentUserTransactions, setCurrentUserTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { currentUser } = useAuth()
  const history = useHistory()

  useEffect(() => {
    async function getCurrentUserTransactions() {
      const currentUserAccounts = await BankAccount.all().where('client.id', '==', currentUser.db.id).get()
      const accountIds = currentUserAccounts.docs.map(doc => doc.id)

      if (accountIds.length > 0) {
        const isSender = Transaction.all().where('expeditor.id', 'in', accountIds).get()
        const isReceiver = Transaction.all().where('destinatar.id', 'in', accountIds).get()

        const [
          sentTransactions,
          receivedTransactions
        ] = await Promise.all([isSender, isReceiver])

        const transactions = _.concat(sentTransactions.docs, receivedTransactions.docs)
        setCurrentUserTransactions(_.uniqWith(transactions, _.isEqual))
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

  function TransactionCard(props) {
    return (
      <>
        <Card border='secondary' className='mt-3'>
          <Card.Header>Transaction no. {props.id}</Card.Header>
          <Card.Body>
            <ListGroup className='list-group-flush'>
              <ListGroupItem><strong>Currency: </strong> {props.doc.get('moneda')}</ListGroupItem>
              <ListGroupItem><strong>Message: </strong> {props.doc.get('mesaj')}</ListGroupItem>
              <ListGroupItem><strong>Amount: </strong> {props.doc.get('suma')}</ListGroupItem>
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
