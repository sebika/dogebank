import { useRef } from 'react'
import { Card, Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import Question from '../models/Question'
import { useAuth } from '../contexts/AuthContext'

export function AskQuestion() {
  const textRef = useRef()
  const { currentUser } = useAuth()
  const history = useHistory()

  function validateData() {
    if (textRef.current.value.length <= 0)
      throw Error('You cannot submit an empty question')

    if (textRef.current.value.length > 2000)
      throw Error('Your question is bigger than 2000 characters')
  }

  async function handleSubmit(e) {
    e.preventDefault()

    validateData()

    const data = {
      client: {
        collection: 'Client',
        id: currentUser.db.id
      },
      intrebare: textRef.current.value
    }
    await Question.create(data);

    history.push('/dashboard')
  }

  return (
    <>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Your Question</Form.Label>
              <Form.Control as='textarea' rows={4} ref={textRef} />
              <Form.Text className='text-muted'>
                Tell us what bothers you. We will help you as soon as we can.
                Our answer will be sent to your email.
              </Form.Text>
            </Form.Group>

            <Button variant='primary float-right' type='submit'>
              Submit
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
