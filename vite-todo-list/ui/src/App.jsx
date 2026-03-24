import './styles/App.css'
import { Route, Routes, useNavigate } from 'react-router-dom';
import { SelectedDateProvider } from './context/selectedDateContext';
import Home from './components/Home'
import AllRates from './components/AllRates'
import  DailyNotes from './components/DailyNotes'

function App() {

  const navigate = useNavigate();

  function handleLinkClick(link) {
    navigate(link);
  }

  return (
    <>
      <SelectedDateProvider>
        <h1>Dash</h1>
        <div className='header-container'>
          <div className='spacer'>
            <div className='header-link' onClick={() => handleLinkClick('/')}>Home</div>
            <div className='header-link' onClick={() => handleLinkClick('/notes')}>Notes</div>
          </div>
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/allrates' element={<AllRates />} />
          <Route path='/notes' element={<DailyNotes />} />
        </Routes>
      </SelectedDateProvider>
    </>
  )
}

export default App
