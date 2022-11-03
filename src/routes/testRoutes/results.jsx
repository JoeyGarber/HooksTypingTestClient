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
        {results && results.map((result) =>
            <tr key={result._id}>
              <td>{result.Test.title}</td>
              <td>{result.WPM}</td>
              <td>{result.Accuracy}</td>
            </tr>
        )}
      </table>
      
    </>
  )
}