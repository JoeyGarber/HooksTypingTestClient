import { useParams } from "react-router-dom"
import { useEffect, useState, useRef } from 'react'
import { showTest } from "../../api/tests"
import { useAuth } from "../../contexts/authProvider"

export default function Test () {
  const SECONDS = 10

  const [test, setTest] = useState(null)
  const [correct, setCorrect] = useState(0)
  const [incorrect, setIncorrect] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [countDown, setCountDown] = useState(SECONDS)
  const [timerRunning, setTimerRunning] = useState(false)

  const params = useParams()
  const { user }  = useAuth()
  const Ref = useRef()

  // Get the test when this component renders, as denoted by when the params.testId changes
  useEffect(() => {
      showTest(params.testId, user)
      .then(response => {
        setTest(response.data.test.body.split(''))
      })
  }, [params.testId, user])

  useEffect(() => {
    if (timerRunning === false) {
      clearInterval(Ref.current)
    }
  }, [timerRunning])

  const start = () => {
    setTimerRunning(true)
    Ref.current = setInterval(() => {
      setCountDown((prevCountdown) => {
        if (prevCountdown === 0) {
          clearInterval(Ref.current)
          setTimerRunning(false)
          return SECONDS
        } else {
          return prevCountdown - 1
        }
      })
    }, 1000)
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
    }
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
        <input type='text' className='input' disabled={timerRunning !== true} onKeyDown={checkMatch}/>
      </div>
      <div className='section'>
        <div className='column'>
          <p>Words per minute (one word = 5 chars):</p>
          <p>{Math.round((correct * 12) / (SECONDS - countDown), 2)}</p>
        </div>
        <div>
          <button className='start' onClick={start}>Start</button>
        </div>
        <div className='column'>
          <p>Accuracy:</p>
          <p>{Math.round((correct / (correct + incorrect)) * 100)} %</p>
        </div>
      </div>
    </div>
  )
}