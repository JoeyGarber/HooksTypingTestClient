import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import { createTest } from '../../api/tests'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authProvider'


export default function CreateTest() {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleSubmit = (event) => {
    event.preventDefault()
    createTest({title: title, body: text}, user)
    .then(console.log('Test created successfully'))
    .then(navigate('/tests'))
    .catch((error) => console.error(error))
  }

  return (
    <div className='col-sm-10 col-md-8 mx-auto mt-5'>
      <h2>Create Test</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='title'>
          <Form.Label><span style={{ color: 'red' }}>*</span>Title</Form.Label>
          <Form.Control
          required
          type='text'
          name='title'
          value={title}
          placeholder='Test Title'
          onChange={(event) => setTitle(event.target.value)}
          />
        </Form.Group>
      </Form>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='text'>
          <Form.Label><span style={{ color: 'red' }}>*</span>Text</Form.Label>
          <Form.Control
          required
          type='text'
          name='text'
          value={text}
          placeholder='Test Text'
          onChange={(event) => setText(event.target.value)}
          />
        </Form.Group>
        <Button className='createBt' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  )
}