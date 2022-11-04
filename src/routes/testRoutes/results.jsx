import { useState, useEffect } from 'react'
import { useAuth } from "../../contexts/authProvider"
import { indexResults } from "../../api/results"



export default function Results () {
  const [results, setResults] = useState(null)

  const { user } = useAuth()

  useEffect(() => {
    indexResults(user)
    .then(results => setResults(results.data.results))
  }, [user])


  return (
    <>
      <table>
        <thead>
        <tr>
          <th>Title</th>
          <th>WPM</th>
          <th>Accuracy</th>
        </tr>
        </thead>
        <tbody>
          {results && results.map((result) => {
            // Filter out results from deleted tests
              if (result.Test) {
                return (
                  <tr key={result._id}>
                  <td>{result.Test && result.Test.title}</td>
                  <td>{result.WPM}</td>
                  <td>{result.Accuracy}</td>
                  </tr>
                )
              }
            }
          )}
        </tbody>
      </table>
      
    </>
  )
}