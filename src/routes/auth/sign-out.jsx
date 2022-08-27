import { signOut } from "../../api/auth";
import { useNavigate } from 'react-router-dom'

function SignOut (props) {
  const { setUser } = props
  const navigate = useNavigate()

  signOut()
  .finally(() => console.log('Signed out successfully'))
  .finally(() => navigate('/'))
  .finally(() => setUser(null))

  return ''
}

export default SignOut