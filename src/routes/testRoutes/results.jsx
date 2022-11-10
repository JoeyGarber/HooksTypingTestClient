import { useState, useEffect } from 'react'
import { useAuth } from "../../contexts/authProvider"
import { indexResults } from "../../api/results"



export default function Results () {
  const [results, setResults] = useState(null)
  const [sortedField, setSortedField] = useState(null)

  const { user } = useAuth()

  useEffect(() => {
    indexResults(user)
    .then(results => {
      setResults(results.data.results)
    })
  }, [user])

  if (sortedField !== null && sortedField !== 'Title' && sortedField !== 'createdAt') {
    results.sort((a, b) => {
      return b[sortedField] - a[sortedField]
    })
  } else if (sortedField === 'Title') {
    results.sort((a, b) => {
      if (a.Test.title < b.Test.title) {
        return -1
      }
      if (a.Test.title > b.Test.title) {
        return 1
      }
      return 0
    })
  } else if (sortedField === 'createdAt') {
    results.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1
      }
      if (a.createdAt < b.createdAt) {
        return 1
      }
      return 0
    })
  }

  return (
    <>
      <div className="resultTable">
        <h2>Results</h2>
        <h5>Click Table Header to Sort Table</h5>
        <table>
          <thead>
          <tr>
            <th>
              <button type='button' onClick={() => setSortedField('Title')}>Title</button>
            </th>
            <th>
              <button type='button' onClick={() => setSortedField('WPM')}>WPM</button>
            </th>
            <th>
              <button type='button' onClick={() => setSortedField('Accuracy')}>Accuracy</button>
            </th>
            <th>
              <button type='button' onClick={() => setSortedField('createdAt')}>Chronologically</button>
            </th>
          </tr>
          </thead>
          <tbody>
            {results && results.map(result => {
              // Filter out results from deleted tests.
              // Should not be a problem anyway, because results delete for
              // deleted tests, but serves as a failsafe
                if (result.Test) {
                  return (
                    <tr key={result._id}>
                    <td>{result.Test && result.Test.title}</td>
                    <td>{result.WPM}</td>
                    <td>{result.Accuracy}</td>
                    <td>{new Date(result.createdAt).toString()}</td>
                    </tr>
                  )
                }
              }
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}