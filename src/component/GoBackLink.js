import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export function GoBackLink(props) {
  const history = useHistory()

  return (
    <div className='w-100 text-center mt-2' style={{marginBottom:70}}>
      <Button variant='btn btn-secondary' onClick={() => history.goBack()}>
        {props.text ? props.text : 'Go Back'}
      </Button>
    </div>
  )
}
