import { NavLink, Outlet, useSearchParams } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import getTests from '../data'

export default function Tests() {
  let tests = getTests()
  let [searchParams, setSearchParams] = useSearchParams()

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
      </Dropdown.Menu>
    </Dropdown>
    <Outlet />
    </>
  )
}