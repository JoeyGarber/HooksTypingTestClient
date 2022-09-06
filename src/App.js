import './App.css';
import './index.css'
import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'

import Header from './routes/header/header.jsx'
import SignUp from './routes/auth/sign-up';
import SignIn from './routes/auth/sign-in';
import SignOut from './routes/auth/sign-out';
import CreateTest from './routes/testRoutes/createTest';
import Tests from './routes/testRoutes/tests';
import Test from './routes/testRoutes/test';

import { AuthProvider } from './contexts/authProvider';
import { ProtectedRoute } from './routes/protectedRoute/protectedRoute';


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
          <Route path='tests' element={<Tests />} />
          <Route path='tests/:testId' element={<Test />} />
          {/* this route will match if nothing else matches */}
          <Route path='*' element={<Tests />}
          />
        </Routes>
      </AuthProvider>
    </main>
    </>
  )
}
