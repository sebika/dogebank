import React, { useState, useEffect } from 'react'
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap'

import ClientAccountCreation from '../models/ClientAccountCreation'
import Client from '../models/Client'

export function AccountCreationRequest() {
  const [snapshotRequests, setSnapshotRequests] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ClientAccountCreation.all().get().then((snapshot) => {
      setSnapshotRequests(snapshot)

      const clientAccounts = snapshot.docs.map((request, id) => (
        Client.all().doc(request.get('client.id')).get()
      ))
      Promise.all(clientAccounts).then((clients) => {
        setSnapshotRequests(clients)
        setIsLoading(false)
      })
    })

  }, [])

  function Requests() {
    return snapshotRequests.map((request, id) => (
      <RequestCard doc={request} id={id + 1}/>
    ))
  }

  function RequestCard(props) {
    return (
      <>
        <Card border='secondary' className='mt-3'>
          <Card.Header>Request {props.id}</Card.Header>
          <Card.Body>
            <Card.Title>{props.doc.get('nume_utilizator')}'s Info</Card.Title>
            <ListGroup className='list-group-flush'>
              <ListGroupItem><strong>nume: </strong> {props.doc.get('nume')}</ListGroupItem>
              <ListGroupItem><strong>prenume: </strong> {props.doc.get('prenume')}</ListGroupItem>
              <ListGroupItem><strong>email: </strong> {props.doc.get('mail')}</ListGroupItem>
              <ListGroupItem><strong>CNP: </strong> {props.doc.get('CNP')}</ListGroupItem>
              <ListGroupItem><strong>adresa: </strong> {props.doc.get('adresa')}</ListGroupItem>

            </ListGroup>

            <Button variant='btn btn-danger ml-3 float-right'>Deny</Button>
            <Button variant='btn btn-success float-right'>Accept</Button>
          </Card.Body>
        </Card>
      </>
    )
  }

  return (
    <>
      {isLoading ? <div>Loading ...</div> : <Requests/>}
    </>
  )
}
