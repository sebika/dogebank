import React from 'react'
import { Modal, Button } from 'react-bootstrap'

import BankAccount from '../models/BankAccount'

export function DeleteAccountModal(props) {

  async function handleDelete() {
    await BankAccount.all().doc(props.account.id).delete()
    window.location.reload()
  }

  return (
    <Modal {...props} centered keyboard={false}>
      <Modal.Header closeButton>
        <h4>Account deletion</h4>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to delete: <strong>{props.account.get('nume')}</strong>?
          <br />
          IBAN: <i>{props.account.get('IBAN')}</i>
          <br />
          Amount: <i>{props.account.get('suma')} {props.account.get('moneda')}</i>
          <div className='text-muted text-center'>
            You need to have an empty account in order to delete it
          </div>
        </p>
        <Button
        variant='btn btn-danger ml-3 float-right'
        onClick={handleDelete}
        disabled={props.account.get('suma') !== 0}>
          Delete
        </Button>
        <Button variant='btn btn-primary ml-3 float-right' onClick={props.onHide}>
          Cancel
        </Button>
      </Modal.Body>
    </Modal>
  )
}
