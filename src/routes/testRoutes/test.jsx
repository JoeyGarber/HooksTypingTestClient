import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from 'react'
import { showTest } from "../../api/tests"
import { useAuth } from "../../contexts/authProvider"
import { deleteTest } from "../../api/tests"
import { Button } from 'semantic-ui-react'

export default function Test () {
  const SECONDS = 60

  const [test, setTest] = useState(null)
  const [testUser, setTestUser] = useState(null)
  const [correct, setCorrect] = useState(0)
  const [incorrect, setIncorrect] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [countDown, setCountDown] = useState(SECONDS)
  const [timerRunning, setTimerRunning] = useState(false)
  const [disableInput, setDisableInput] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const params = useParams()
  const { user }  = useAuth()
  const IntervalRef = useRef()
  const InputRef = useRef()
  const navigate = useNavigate()

  // Get the test when this component renders, as denoted by when the params.testId changes
  useEffect(() => {
      showTest(params.testId, user)
      .then(response => {
        setTest(response.data.test.body.split(''))
        setTestUser(response.data.test.owner)
      })
  }, [params.testId, user])

  // When the clock hits zero or the user types all the text, stop the interval
  useEffect(() => {
    if (timerRunning === false) {
      clearInterval(IntervalRef.current)
    }
  }, [timerRunning])

  const start = () => {
    // Correct and incorrect update before onChange
    // This makes it so the timer starts only after user has typed their first char
    if ((correct === 1 && incorrect === 0) || (correct === 0 && incorrect === 1)) {
      setTimerRunning(true)
      IntervalRef.current = setInterval(() => {
        setCountDown((prevCountdown) => {
          if (prevCountdown === 0) {
            setTimerRunning(false)
            setDisableInput(true)
            return 0
          } else {
            return prevCountdown - 1
          }
        })
      }, 1000)
    }
  }

  const checkMatch = (event) => {
    const characters = document.querySelector('.typing-text p').querySelectorAll('span')

    // non-character keys will be undefined && the test won't error when you finish it
    if (event.key && characters[charIndex] && event.key !== 'Shift' && event.key !== 'Backspace') {
      if (event.key === characters[charIndex].innerHTML) {
        characters[charIndex].classList.add('correct')
        setCorrect(correct + 1)
      } else {
        characters[charIndex].classList.add('incorrect')
        setIncorrect(incorrect + 1)
      }
      setCharIndex(charIndex + 1)
    } else if (event.key === 'Backspace' && charIndex > 0) {
      if (characters[charIndex - 1].className === 'correct') {
        setCorrect(correct - 1)
      } else if (characters[charIndex - 1].className === 'incorrect') {
        setIncorrect(incorrect - 1)
      }
      characters[charIndex - 1].classList.remove('correct', 'incorrect')
      setCharIndex(charIndex - 1)
    } else if (!characters[charIndex]) {
      setTimerRunning(false)
      setDisableInput(true)
    }
  }

  const deleteUserTest = () => {
    deleteTest(params.testId, user)
    .then(navigate('/tests'))
    .catch((error) => console.error(error))
  }

  const resetTest = () => {
    setCorrect(0)
    setIncorrect(0)
    setCharIndex(0)
    setCountDown(SECONDS)
    setTimerRunning(false)
    setDisableInput(false)
    InputRef.current.value = ''
    document.querySelector('.typing-text p').querySelectorAll('span').forEach(span => span.classList.remove('correct', 'incorrect'))
  }

  return (
    <div className='app'>
      <div className='control is-expanded section'>
        <div className='typing-text'>
            <h2>{countDown}</h2>
            <p>
              {test && test.map((char, charIndex) => {
                return (
                  <span key={charIndex}>{char}</span>
                )
              })}
            </p>
        </div>
        <p>Start typing to begin timer.</p>
        <input type='text' className='input' ref={InputRef} autoFocus disabled={disableInput} onKeyDown={checkMatch} onChange={start}/>
      </div>
      <div className='section'>
        <div className='column'>
          <h5>Words per minute (one word = 5 chars):</h5>
          <p>{Math.round((correct * 12) / (SECONDS - countDown), 2) || 0}</p>
        </div>
        <div className='column'>
          <h5>Accuracy:</h5>
          <p>{Math.round((correct / (correct + incorrect)) * 100) || 0} %</p>
        </div>
      </div>
      <Button onClick={resetTest}>Reset Test</Button>
      {user && user._id === testUser && !confirmOpen && <Button onClick={() => setConfirmOpen(true)}>Delete test</Button>}
      {confirmOpen && <>
      <Button onClick={deleteUserTest}>Confirm</Button>
      <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
      </>}
      <Button onClick={() => console.log(user)}>Show stuff</Button>
    </div>
  )
}