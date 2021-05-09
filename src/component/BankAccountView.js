import React, { useState, useEffect } from 'react'
import { FiMoreVertical } from 'react-icons/fi'
import { Card, Button, ListGroup, ListGroupItem, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap'
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
          <Card.Header>
            <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
              {props.doc.get('nume')}
              <Dropdown as={ButtonGroup} >
                <Dropdown.Toggle variant='link' bsPrefix='p-0'>
                  <FiMoreVertical size='24' />
                </Dropdown.Toggle>
                <Dropdown.Menu align='right'>
                  <Dropdown.Item eventKey='1' >Create Transaction</Dropdown.Item>
                  <Dropdown.Item eventKey='2'>View Transactions</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Card.Header>
          <Card.Body>
            <ListGroup className='list-group-flush'>
              <ListGroupItem><strong>IBAN: </strong> {props.doc.get('IBAN')}</ListGroupItem>
              <ListGroupItem><strong>Sold: </strong> {props.doc.get('suma')} {props.doc.get('moneda')}</ListGroupItem>
            </ListGroup>

            <Button variant='btn btn-danger ml-3 float-right'>Close Account</Button>
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
