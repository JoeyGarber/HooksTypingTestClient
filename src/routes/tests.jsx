import { useState, useEffect } from 'react'
import { NavLink, Outlet, useSearchParams } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import getTests from '../data'
import { indexTests } from '../api/tests'
import { useAuth } from '../contexts/authProvider'

export default function Tests() {
  const [userTests, setUserTests] = useState([])
  const tests = getTests()
  const [searchParams, setSearchParams] = useSearchParams()
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      indexTests(user)
      .then(response => setUserTests(response.data.tests))
      .catch(error => console.log(error))
    }
  }, [])


  return (
    <>
      <h1>Tests</h1>
      <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Test Chooser
      </Dropdown.Toggle>

      <Dropdown.Menu>
      {tests.map((test) => (
          <Dropdown.Item key={test._id} href={`/tests/${test._id}`}>{test.title}</Dropdown.Item>
        ))}
      {userTests.map((test) => (
        <Dropdown.Item key={test._id} href={`/tests/${test._id}`}>{test.title}</Dropdown.Item>
      ))}
      </Dropdown.Menu>
    </Dropdown>
    <Outlet />
    <button onClick={() => console.log(userTests)}>userTests</button>
    </>
  )
}