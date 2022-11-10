import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../../api/auth'


import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useAuth } from '../../contexts/authProvider'

function SignIn () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useAuth()
  const navigate = useNavigate()

  const onSignIn = (event) => {
    event.preventDefault()

    signIn({email, password})
    .then((response) => setUser(response.data.user))
    .then(() => console.log('Successfully signed in'))
    .then(navigate('/tests'))
    .catch((error) => {
      setEmail('')
      setPassword('')
      console.log(error)
    })
  }

  return (
    <div className='sign'>
      <div className='col-sm-6 mx-auto mt-5'>
        <h4>Sign In</h4>
        <Form onSubmit={onSignIn}>
          <Form.Group controlId='email'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type='email'
              name='email'
              placeholder='Enter email'
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              name='password'
              type='password'
              placeholder='Password'
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group >
          <Button className='signBt' type='submit'>Submit</Button>
        </Form>
      </div>
    </div>
  )
}

export default SignIn