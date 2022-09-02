import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import { showTest } from "../../api/tests"
import { useAuth } from "../../contexts/authProvider"

export default function Test () {
  const [test, setTest] = useState(null)
  const [currInput, setCurrInput] = useState('')
  const [charIndex, setCharIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [incorrect, setIncorrect] = useState(0)

  const params = useParams()
  const { user }  = useAuth()

  useEffect(() => {
      showTest(params.testId, user)
      .then(response => {
        setTest(response.data.test.body.split(''))
      })
  }, [])

  const checkMatch = () => {
    let typedChar = currInput.split('')[charIndex]
    // If the user has typed a char and the char isn't Shift
    if (typedChar && typedChar.charCodeAt(0) !== 13) {
      if (typedChar === test[charIndex]) {
        console.log('correct')
      } else {
        console.log('incorrect')
      }
      setCharIndex(charIndex + 1)
    }
  }

  return (
    <div className='app'>
      <div className='control is-expanded section'>
        <div className='content'>
            <p>
              {test && test.map((char, charIndex) => {
                return (
                  <span key={charIndex}>{char}</span>
                )
              })}
            </p>
        </div>
        <input type='text' className='input' onKeyUp={checkMatch} value={currInput} onChange={(e) => setCurrInput(e.target.value)}/>
      </div>
      <div className='section'>
        <div className='column'>
          <p>Words per minute:</p>
          <p>{32}</p>
        </div>
        <div className='column'>
          <p>Accuracy:</p>
          <p>{Math.round((correct / (correct + incorrect)) * 100)} %</p>
        </div>
      </div>
    </div>
  )
}