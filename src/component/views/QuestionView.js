import React, { useState, useEffect } from 'react'
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import Question from '../../models/Question'
import Client from '../../models/Client'

export function QuestionView() {
  const [snapshotRequests, setSnapshotRequests] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const history = useHistory()

  useEffect(() => {
    async function getQuestions() {
      const questions = (await Question.all().get()).docs
      for (let question of questions)
        question.clientRef = await Client.all().doc(question.get('client.id')).get()

      setSnapshotRequests(questions)
      setIsLoading(false)
    }

    getQuestions()
  }, [])

  function QuestionViewCreator() {
    return snapshotRequests.map((request, id) => (
      <QuestionCard doc={request} id={id + 1} key={id} />
    ))
  }

  function QuestionCard(props) {
    return (
      <>
        <Card border='secondary' className='mt-3'>
          <Card.Header>Question no. {props.id}</Card.Header>
          <Card.Body>
            <ListGroup className='list-group-flush'>
              <ListGroupItem>
                <strong>From client: </strong>
                {props.doc.clientRef.get('prenume')} {props.doc.clientRef.get('nume')}
              </ListGroupItem>
              <ListGroupItem><strong>Question: </strong> {props.doc.get('intrebare')}</ListGroupItem>
            </ListGroup>
            <Button variant='btn btn-primary ml-3 float-right'>Answer</Button>
          </Card.Body>
        </Card>
      </>
    )
  }

  return (
    <>
      {isLoading ? <div>Loading ...</div> : <QuestionViewCreator />}
      <div className='w-100 text-center mt-2' style={{marginBottom:70}}>
        <Button variant='link' onClick={() => history.goBack()}>
          Go Back
        </Button>
      </div>
    </>
  )
}
