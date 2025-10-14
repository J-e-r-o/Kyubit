import { useState } from 'react'
import {useNavigate} from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();

    const manejoLogin = (e) => {
        e.preventDefault()

        const newErrors = {}

        if (!email.trim()) {
            newErrors.email = 'El campo "Email" es obligatorio'
        }

        if (!password.trim()){
            newErrors.password = 'El campo "Contraseña" es obligatorio'
        }

        if (Object.keys(newErrors).length > 0){
            setErrors(newErrors)
            return
        }

        console.log('Email:', email)
        console.log ('Password', password)
        navigate('/dashboard')
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={manejoLogin}>
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

                <input
                    type='password'
                    placeholder='Contraseña'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

                <button>Login</button>
            </form>
        </div>
    )
}

export default Login
