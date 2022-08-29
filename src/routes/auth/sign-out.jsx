import { signOut } from "../../api/auth";
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../../contexts/authProvider";

function SignOut (props) {
  const { setUser } = useAuth()
  const navigate = useNavigate()

  signOut()
  .finally(() => console.log('Signed out successfully'))
  .finally(() => navigate('/'))
  .finally(() => setUser(null))

  return ''
}

export default SignOut