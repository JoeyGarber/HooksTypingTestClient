import { Link, Outlet } from 'react-router-dom'

export default function Home (props) {
  return (
    <>
      <h1>This is home</h1>
      <Link to='/'>Home</Link>
      <Link to='sign-up'>Sign Up</Link>
      <Link to='create-test'>Create Test</Link>
      <Link to='tests'>Tests</Link>
      <Outlet />
    </>
  )
}