import './styles/App.css'
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home'
import AllRates from './components/AllRates'
import  Calendar from './components/Calendar'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/allrates' element={<AllRates />} />
        <Route path='/calendar' element={<Calendar />} />
      </Routes>
    </>
  )
}

export default App
