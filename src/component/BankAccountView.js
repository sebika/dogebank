import React, { useState, useEffect } from 'react'
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'
import BankAccount from '../models/BankAccount'

export function BankAccountView() {
  const [snapshotRequests, setSnapshotRequests] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const { currentUser } = useAuth()
  const history = useHistory()

  useEffect(() => {
    BankAccount.all().where('client.id', '==', currentUser.db.id).get().then((snapshot) => {
      setSnapshotRequests(snapshot.docs)
      setIsLoading(false)
    })
  }, [])

  function BankAccountViewCreator() {
    return snapshotRequests.map((request, id) => (
      <BankAccountCard doc={request} id={id + 1} key={id} />
    ))
  }

  function BankAccountCard(props) {
    return (
      <>
        <Card border='secondary' className='mt-3'>
          <Card.Header>{props.doc.get('nume')}</Card.Header>
          <Card.Body>
            <ListGroup className='list-group-flush'>
              <ListGroupItem><strong>IBAN: </strong> {props.doc.get('IBAN')}</ListGroupItem>
              <ListGroupItem><strong>Sold: </strong> {props.doc.get('suma')} {props.doc.get('moneda')}</ListGroupItem>
            </ListGroup>
          </Card.Body>
        </Card>
      </>
    )
  }

  return (
    <>
      {isLoading ? <div>Loading ...</div> : <BankAccountViewCreator />}
      <div className='w-100 text-center mt-2' style={{marginBottom:70}}>
        <Button variant='link' onClick={() => history.goBack()}>
          Go Back
        </Button>
      </div>
    </>
  )
}
