import { signOut } from "../../api/auth";
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../../contexts/authProvider";

function SignOut () {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()

  signOut(user)
  .finally(() => console.log('Signed out successfully'))
  .finally(() => navigate('/tests'))
  .finally(() => setUser(null))

  return ''
}

export default SignOut