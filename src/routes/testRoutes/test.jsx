import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from 'react'
import { showTest } from "../../api/tests"
import { useAuth } from "../../contexts/authProvider"
import { deleteTest } from "../../api/tests"
import { createResult, deleteResults } from "../../api/results"
import { SuccessToast, ErrorToast } from "../../messages/toastMessages"
import Button from 'react-bootstrap/Button'

export default function Test () {
  const SECONDS = 6000

  const [test, setTest] = useState(null)
  const [testUser, setTestUser] = useState(null)
  const [correct, setCorrect] = useState(0)
  const [incorrect, setIncorrect] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [countDown, setCountDown] = useState(SECONDS)
  const [timerRunning, setTimerRunning] = useState(null)
  const [disableInput, setDisableInput] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [showHelpText, setShowHelpText] = useState(true)

  const params = useParams()
  const { user }  = useAuth()
  const IntervalRef = useRef()
  const InputRef = useRef()
  const navigate = useNavigate()

  let wpm = Math.round((correct * SECONDS / 5) / ((SECONDS - countDown)), 2)
  let accuracy = Math.round((correct / (correct + incorrect)) * 100)

  // Get the test when this component renders, as denoted by when the params.testId changes
  useEffect(() => {
      showTest(params.testId, user)
      .then(response => {
        setTest(response.data.test.body.split(''))
        setTestUser(response.data.test.owner)
      })
  }, [params.testId])

  // When the clock hits zero or the user types all the text, stop the interval, try to submit (if user is logged in)
  useEffect(() => {
    if (timerRunning === false) {
      clearInterval(IntervalRef.current)
      handleSubmit(wpm, accuracy)
    } else if (timerRunning === null) {
      clearInterval(IntervalRef.current)
    }
  }, [timerRunning])

  const start = () => {
    // Correct and incorrect update before onChange
    // This makes it so the timer starts only after user has typed their first registered char
    if ((correct === 1 && incorrect === 0) || (correct === 0 && incorrect === 1)) {
      setTimerRunning(true)
      setShowHelpText(false)
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
      }, 10)
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

  const handleSubmit = (wpm, accuracy) => {
    if (user) {
      createResult(wpm, accuracy, params.testId, user)
      .then(SuccessToast('Test Submitted Successfully!'))
      .catch((error) => {
        ErrorToast('Something Went Wrong! Test Submission Unsuccessful!')
        console.log(error)
      })
    } else {
      SuccessToast('Test Completed!')
    }
  }

  const deleteUserTest = () => {
    deleteTest(params.testId, user)
    .then(deleteResults(params.testId, user))
    .then(navigate('/tests'))
    .catch((error) => console.error(error))
  }

  const resetTest = () => {
    setCorrect(0)
    setIncorrect(0)
    setCharIndex(0)
    setCountDown(SECONDS)
    setTimerRunning(null)
    setDisableInput(false)
    InputRef.current.value = ''
    document.querySelector('.typing-text p').querySelectorAll('span').forEach(span => span.classList.remove('correct', 'incorrect'))
  }

  return (
    <div className='app'>
      <div className='test control is-expanded section'>
        <div className='typing-text'>
            <h2 className="timer">Seconds Left: {Math.floor(countDown / 100)}</h2>
            <p className='col-sm-10 mx-auto'>
              {test && test.map((char, charIndex) => {
                return (
                  <span key={charIndex}>{char}</span>
                )
              })}
            </p>
        </div>
        <input type='text' className='input' ref={InputRef} autoFocus disabled={disableInput} onKeyDown={checkMatch} onChange={start}/>
        {showHelpText ? <span className="helptext">Start typing to begin timer.</span> : <p></p>}
      </div>
      <div className='stats section'>
        <div className='column'>
          <h5>Words per minute (one word = 5 chars): {wpm || 0}</h5>
        </div>
        <div className='column'>
          <h5>Accuracy: {accuracy || 0} %</h5>
        </div>
      </div>
      <div className="d-grid gap-2 buttons">
        <Button onClick={resetTest}>Reset Test</Button>
        {user && user._id === testUser && !confirmOpen && <Button variant='dark' onClick={() => setConfirmOpen(true)}>Delete test</Button>}
        {confirmOpen && <>
        <Button variant='danger' onClick={deleteUserTest}>Confirm</Button>
        <Button variant='secondary' onClick={() => setConfirmOpen(false)}>Cancel</Button>
        </>}
      </div>
    </div>
  )
}