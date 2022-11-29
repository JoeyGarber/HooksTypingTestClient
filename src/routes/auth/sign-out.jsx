import { signOut } from "../../api/auth";
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../../contexts/authProvider";
import { SuccessToast } from "../../messages/toastMessages"


function SignOut () {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()

  signOut(user)
  .finally(() => SuccessToast('Signed Out Successfully!'))
  .finally(() => navigate('/tests'))
  .finally(() => setUser(null))

  return ''
}

export default SignOut