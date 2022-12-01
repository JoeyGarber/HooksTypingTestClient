import React, { useState, createContext, useContext } from 'react'

const SettingsContext = createContext(null)

const useSettings = () => {
  const context = useContext(SettingsContext)

  if (context === undefined) {
    throw new Error("useSettings was used outside of its provider")
  }

  return context
}

const SettingsProvider = ({ children }) => {
  const [SECONDS, setSECONDS] = useState(6000)
  const [countDown, setCountDown] = useState(SECONDS)
  const [showWPM, setShowWPM] = useState(true)

  const value = {
    SECONDS,
    setSECONDS,
    countDown,
    setCountDown,
    showWPM,
    setShowWPM
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

export { SettingsProvider, useSettings }