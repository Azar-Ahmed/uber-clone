import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from '../src/pages/Home'
import UserLogin from '../src/pages/UserLogin'
import UserSignup from '../src/pages/UserSignup'
import CaptainSignup from '../src/pages/CaptainSignup'
import CaptainLogin from '../src/pages/CaptainLogin'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />

        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />


      </Routes>
    </>
  )
}

export default App
