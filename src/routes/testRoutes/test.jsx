import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import { showTest } from "../../api/tests"
import { useAuth } from "../../contexts/authProvider"

export default function Test () {
  const [test, setTest] = useState(null)
  const params = useParams()
  const { user }  = useAuth()

  useEffect(() => {
      showTest(params.testId, user)
      .then(response => {
        console.log(response.data.test)
        setTest(response.data.test)
      })
  }, [])

  return (
    <>
        {test &&
          <>
          <h2>{test.title}</h2>
          <p>{test.body}</p>
          </>
        }
    </>
  )
}