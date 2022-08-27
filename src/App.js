import './App.css';
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Home from './routes/home'
import SignUp from './routes/auth/sign-up';
import SignIn from './routes/auth/sign-in';
import CreateTest from './routes/createTest';
import Tests from './routes/tests';
import Test from './routes/test';

export default function App() {
  const [user, setUser] = useState(null)

  return (
    <>
    <main>
      <Routes>
        <Route path='/' element={<Home />}>
        <Route path='sign-up' element={<SignUp setUser={setUser}/>} />
        <Route path='sign-in' element={<SignIn setUser={setUser}/>} />
        <Route path='create-test' element={<CreateTest />} />
        <Route path='tests' element={<Tests />} >
          <Route
            index
            element={
              <main>
                <p>Select a Test</p>
              </main>
            }
          />
          <Route path=':testId' element={<Test />} />
        </Route>
        {/* this route will match if nothing else matches */}
        <Route path='*' element={
          <main>
            <p>There is nothing here!</p>
          </main>
        }
        />
        </Route>
      </Routes>
    </main>
    </>
  )
}
