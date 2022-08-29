import './App.css';
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './routes/home'
import SignUp from './routes/auth/sign-up';
import SignIn from './routes/auth/sign-in';
import CreateTest from './routes/createTest';
import Tests from './routes/tests';
import Test from './routes/test';

import { AuthProvider } from './contexts/authProvider';
import { ProtectedRoute } from './routes/protectedRoute';


export default function App() {

  return (
    <>
    <main>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home />}>
          <Route path='sign-up' element={<SignUp/>} />
          <Route path='sign-in' element={<SignIn/>} />
          <Route path='create-test' element={
            <ProtectedRoute>
              <CreateTest />
            </ProtectedRoute>} />
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
      </AuthProvider>
    </main>
    </>
  )
}
