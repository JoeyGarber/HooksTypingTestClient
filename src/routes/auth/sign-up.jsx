import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signUp, signIn } from '../../api/auth'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useAuth } from '../../contexts/authProvider'
import { SuccessToast, ErrorToast } from "../../messages/toastMessages"


function SignUp (props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const { setUser } = useAuth()
  const navigate = useNavigate()

  const onSignUp = (event) => {
    event.preventDefault()

    signUp({email, password, passwordConfirmation})
    .then(() => signIn({email, password, passwordConfirmation}))
    .then((response) => setUser(response.data.user))
    .then(() => SuccessToast('Sign Up Successful!'))
    .then(() => navigate('/tests'))
    .catch((error) => {
      ErrorToast('Something Went Wrong! Sign Up Failed!')
      setEmail('')
      setPassword('')
      setPasswordConfirmation('')
      console.error(error)
    })
  }

  return (

    <div className='sign'>
      <div className='col-sm-6 mx-auto mt-5'>
        <h4>Sign Up</h4>
        <Form onSubmit={onSignUp}>
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
          <Form.Group controlId='passwordConfirmation'>
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
              required
              name='passwordConfirmation'
              type='password'
              placeholder='Confirm Password'
              onChange={(event) => setPasswordConfirmation(event.target.value)}
            />
          </Form.Group>
          <Button className='signBt' type='submit'>Submit</Button>
        </Form>
      </div>
    </div>
  )
}

export default SignUp