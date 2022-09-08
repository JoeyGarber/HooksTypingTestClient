import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import { showTest } from "../../api/tests"
import { useAuth } from "../../contexts/authProvider"

export default function Test () {
  const [test, setTest] = useState(null)
  const [userInput, setUserInput] = useState('')
  const [correct, setCorrect] = useState(0)
  const [incorrect, setIncorrect] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  const params = useParams()
  const { user }  = useAuth()

  useEffect(() => {
      showTest(params.testId, user)
      .then(response => {
        setTest(response.data.test.body.split(''))
      })
  }, [params.testId, user])

  const checkMatch = (event) => {
    const characters = document.querySelector('.typing-text p').querySelectorAll('span')

    // non-character keys will be undefined && the test won't error when you finish it
    if (userInput[charIndex] && characters[charIndex]) {
      // console.log("userInput[charIndex]: " + userInput[charIndex])
      // console.log("characters[charIndex]: " + characters[charIndex].innerHTML)
      // console.log(charIndex)

      if (userInput[charIndex] === characters[charIndex].innerHTML) {
        characters[charIndex].classList.add('correct')
        setCorrect(correct + 1)
      } else {
        characters[charIndex].classList.add('incorrect')
        setIncorrect(incorrect + 1)
      }
      setCharIndex(charIndex + 1)
    } else if (event.key === 'Backspace' && charIndex > 0) {
      console.log(characters[charIndex-1].className)

      if (characters[charIndex-1].className === 'correct') {
        setCorrect(correct - 1)
      } else if (characters[charIndex - 1].className === 'incorrect') {
        setIncorrect(incorrect - 1)
      }
      characters[charIndex - 1].classList.remove('correct', 'incorrect')
      setCharIndex(charIndex - 1)
    }
}

  return (
    <div className='app'>
      <div className='control is-expanded section'>
        <div className='typing-text'>
            <p>
              {test && test.map((char, charIndex) => {
                return (
                  <span key={charIndex}>{char}</span>
                )
              })}
            </p>
        </div>
        <input type='text' className='input' onKeyDown={checkMatch}  onChange={(e) => setUserInput(e.target.value)}/>
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