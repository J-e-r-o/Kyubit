import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />     {/*poner aca las rutas*/}
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='*' element={<NotFound />} />
                <Route path='/signUp' element={<SignUp/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
