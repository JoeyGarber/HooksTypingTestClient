import React, { useState, createContext, useContext } from 'react'

const AuthContext = createContext(null)

const useAuth = () => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth was used outside of its provider")
  }

  return context
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  // this is how I pass functions via context
  // it appears I can't pass them "individually",
  // it has to be like this, in an object
  const value = {
    user,
    setUser: setUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, useAuth }