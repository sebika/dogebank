import React, { useState, useEffect } from 'react'
import { FiMoreVertical } from 'react-icons/fi'
import { Card, Button, ListGroup, ListGroupItem, Dropdown, ButtonGroup } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import { useAuth } from '../../contexts/AuthContext'
import BankAccount from '../../models/BankAccount'
import { GoBackLink } from '../GoBackLink'
import { DeleteAccountModal } from '../DeleteAccountModal'

export function BankAccountView() {
  const [snapshotRequests, setSnapshotRequests] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [modalShow, setModalShow] = useState(false)
  const [accountToDelete, setAccountToDelete] = useState()
  const { currentUser } = useAuth()
  const history = useHistory()

  useEffect(() => {
    BankAccount.all().where('client.id', '==', currentUser.db.id).get().then((snapshot) => {
      setSnapshotRequests(snapshot.docs)
      setIsLoading(false)
    })
  }, [currentUser.db.id])

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
                  <Dropdown.Item
                    eventKey='1'
                    onClick={() => history.push(`/create-transaction?name=${props.doc.get('nume')}`)}>
                    Create Transaction
                  </Dropdown.Item>
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

            <Button
            variant='btn btn-danger ml-3 float-right'
            onClick={() => {setModalShow(true); setAccountToDelete(props.doc)}}>
              Close Account
            </Button>
          </Card.Body>
        </Card>
      </>
    )
  }

  return (
    <>
      {isLoading ? <div>Loading ...</div> : <BankAccountViewCreator />}
      {modalShow &&
        <DeleteAccountModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          account={accountToDelete}
        />
      }
      <GoBackLink />
    </>
  )
}
