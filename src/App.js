import './App.css';
import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'

import Header from './routes/header.jsx'
import SignUp from './routes/auth/sign-up';
import SignIn from './routes/auth/sign-in';
import SignOut from './routes/auth/sign-out';
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
        <Header />
        <Routes>
          <Route path='sign-up' element={<SignUp/>} />
          <Route path='sign-in' element={<SignIn/>} />
          <Route path='sign-out' element={<SignOut/>} />
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
        </Routes>
      </AuthProvider>
    </main>
    </>
  )
}
