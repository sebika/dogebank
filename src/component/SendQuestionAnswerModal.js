import React, { useRef } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import emailjs from 'emailjs-com'

import Question from '../models/Question'

export function SendQuestionAnswerModal(props) {
  const textRef = useRef()

  async function answer() {
    await emailjs.send(
      process.env.REACT_APP_MAIL_SERVICE_ID,
      process.env.REACT_APP_MAIL_TEMPLATE_ID,
      {
        to_email: props.account.get('mail'),
        message: textRef.current.value,
      },
      process.env.REACT_APP_MAIL_USER_ID
    )

    await Question.all().doc(props.currentQuestion.id).delete()

    window.location.reload();
  }

  return (
    <Modal {...props} centered keyboard={false}>
      <Modal.Header closeButton>
        Answer
      </Modal.Header>
      <Modal.Body>
        <Form.Control as='textarea' rows={4} ref={textRef} />
        <br />

        <Button variant='btn btn-primary ml-3 float-right' onClick={answer}>
          Send
        </Button>
      </Modal.Body>
    </Modal>
  )
}
