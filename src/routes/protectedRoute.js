import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/authProvider"


export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    return navigate('/home')
  }

  return children
}