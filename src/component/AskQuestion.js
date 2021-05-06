import React, { useRef } from 'react'
import { Card, Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import Question from '../models/Question'
import { useAuth } from '../contexts/AuthContext'

export function AskQuestion() {
  const textRef = useRef()
  const { currentUser } = useAuth()
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

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
    <Card>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Your Question</Form.Label>
            <Form.Control as="textarea" rows={4} ref={textRef} />
            <Form.Text className="text-muted">
              Tell us what bothers you. We will help you as soon as we can.
              Our answer will be sent to your email.
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}
