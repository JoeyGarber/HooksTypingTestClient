import { Link, NavLink } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useAuth } from '../contexts/authProvider'


const authenticatedOptions = (
  <>    
    <NavLink to='sign-out'>Sign Out</NavLink>
    <NavLink to='create-test'>Create Test</NavLink>
  </>
)

const unauthenticatedOptions = (
  <>
    <NavLink to='sign-up'>Sign Up</NavLink>
    <NavLink to='sign-in'>Sign In</NavLink>
  </>
)

const alwaysOptions = (
  <>
    <NavLink to='tests'>Tests</NavLink>
  </>
)

export default function Header () {
  const { user } = useAuth()
  return (
    <Navbar bg='dark' variant='dark' expand='md'>
      <Navbar.Brand>
        <Link style={{ textDecoration: 'none' }} to='tests'>Joey's Typing Test</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ml-auto d-flex justify-content-between'>
          {user && (
            <span className='navbar-text mr-2'>Welcome, {user.email}</span>
          )}
          { alwaysOptions }
          {user ? authenticatedOptions : unauthenticatedOptions}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}