import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Home from './assets/Pages/Home'
import Login from './assets/Pages/Login'



function App() {

  return (

    <main className="App">
      {/* <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          
        </ul>
      </nav> */}
    
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>

    </Routes>
    </main>
  )
}

export default App
