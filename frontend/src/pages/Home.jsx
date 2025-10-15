import {useNavigate} from "react-router-dom";

function Home() {
    const navigate = useNavigate()

    const Logearse = () => {
        navigate('/login')
    }
    const Registrarse = () => {
        navigate ('/SignUp')
    }

    return (
        <div>
            <h1> ¿Desea registrarse o iniciar sesion? </h1>
            <button onClick={Logearse}> Iniciar sesion </button>
            <button onClick={Registrarse}> Registrarse </button>
        </div>
    )
}

 export default Home