import { useParams } from 'react-router-dom'
import { getTest } from '../data'

export default function Test() {
  // this is how you use params now
  // The params are going to have the same name as the route
  // For example, this route is :testId

  // params.testId would get me the test id
  let params = useParams()
  
  let test = getTest(parseInt(params.testId, 10))
  return (
    <>
      <h2>Test: {test.title}</h2>
      <p>
        {test.text}
      </p>
    </>
  )
}