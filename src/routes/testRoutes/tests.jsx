import { useState, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import { indexTests, indexUserTests } from '../../api/tests'
import { useAuth } from '../../contexts/authProvider'


export default function Tests() {
  const [tests, setTests] = useState([])
  const [userTests, setUserTests] = useState([])
  const { user } = useAuth()

  useEffect(() => {
      indexTests()
      .then(response => setTests(response.data.tests))
      .catch(error => console.log(error))
  }, [])


  // This runs when user changes
  // And also right at the beginning when user gets declared
  // The 'if (user)' prevents it from trying to read the token of a user that isn't signed in
  // The '[user]' triggers the API call once the user signs in
  useEffect(() => {
    if (user) {
      indexUserTests(user)
      .then(response => {
        setUserTests(response.data.tests)
      })
      .catch(error => console.log(error))
    }
  }, [ user ])


  return (
    <div className="test-chooser">
      <h1>Tests</h1>
      <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Test Chooser
      </Dropdown.Toggle>

      <Dropdown.Menu>
      {tests.map((test) => (
        <Dropdown.Item key={test._id} as={Link} to={`/tests/${test._id}`}>{test.title}</Dropdown.Item>
        ))}
      {userTests.map((test) => (
        <Dropdown.Item key={test._id} as={Link} to={`/tests/${test._id}`}>{test.title}</Dropdown.Item>
      ))}
      </Dropdown.Menu>
    </Dropdown>
    <Outlet />
    </div>
  )
}