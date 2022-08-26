import { NavLink, Outlet, useSearchParams } from 'react-router-dom'
import getTests from '../data'

export default function Tests() {
  let tests = getTests()
  let [searchParams, setSearchParams] = useSearchParams()

  return (
    <>
      <h1>Tests</h1>
      <input
      value={searchParams.get('filter') || ''}
      // This works just like state, except it also shows up in the url
      onChange={(event) => {
        let filter = event.target.value
        if (filter) {
          setSearchParams({ filter })
        } else {
          setSearchParams({})
        }
      }}
      />
      {tests.filter((test) => {
        let filter = searchParams.get('filter')
        if (!filter) return true
        let title = test.title.toLowerCase()
        return title.startsWith(filter.toLowerCase())
      }).map((test) => (
        <NavLink to={`/tests/${test._id}`}
        key={test._id}>{test.title}</NavLink>
      ))}
      <Outlet />
    </>
  )
}