import React, { useState, useEffect } from 'react'
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap'

import ClientAccountCreation from '../../models/ClientAccountCreation'
import Client from '../../models/Client'
import { GoBackLink } from '../GoBackLink'

export function AccountCreationRequestView() {
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
      <RequestCard doc={request} id={id + 1} key={id} />
    ))
  }

  function RequestCard(props) {
    async function denyRequest(id) {
      const requestId = await ClientAccountCreation.all().where('client.id', '==', id).get();
      await ClientAccountCreation.all().doc(requestId.docs[0].id).delete();

      await Client.all().doc(id).delete();

      window.location.reload();
    }

    async function acceptRequest(id) {
      const requestId = await ClientAccountCreation.all().where('client.id', '==', id).get();
      await ClientAccountCreation.all().doc(requestId.docs[0].id).delete();

      window.location.reload();
    }

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

            <Button variant='btn btn-danger ml-3 float-right' onClick={(e) => denyRequest(props.doc.id, e)}>Deny</Button>
            <Button variant='btn btn-success float-right' onClick={(e) => acceptRequest(props.doc.id, e)}>Accept</Button>
          </Card.Body>
        </Card>
      </>
    )
  }

  return (
    <>
      {isLoading ? <div>Loading ...</div> : <Requests />}
      <GoBackLink />
    </>
  )
}
