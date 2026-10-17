import { useNavigate } from 'react-router-dom'

const AuthRoutes = ({ children }) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    if (!token) {
        return navigate('/login')
    }
    return (
        { children }
    )
}

export default AuthRoutes