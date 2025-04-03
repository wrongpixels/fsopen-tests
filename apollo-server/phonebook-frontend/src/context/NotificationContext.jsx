import { useState, useContext, createContext } from 'react'

const NotificationContext = createContext()

export const useNotification = () => useContext(NotificationContext)
let currentTimeout = null

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    message: '',
    isError: false,
  })

  const sendNotification = (message, isError = false) => {
    setNotification({ message, isError })
    if (currentTimeout) {
      clearTimeout(currentTimeout)
    }
    currentTimeout = setTimeout(() => {
      clearNotification()
    }, 5000)
  }

  const clearNotification = () => {
    setNotification({ message: '', isError: false })
  }

  return (
    <NotificationContext.Provider
      value={{ notification, sendNotification, clearNotification }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
