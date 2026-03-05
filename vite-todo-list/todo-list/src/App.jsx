import './styles/App.css'
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home'
import AllRates from './components/AllRates'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/allrates' element={<AllRates />} />
      </Routes>
    </>
  )
}

export default App
