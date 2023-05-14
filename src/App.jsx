import './App.css'
import './normalize.css'
import { CardController } from './components/CardController'
import { Movie } from './components/Movie'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<CardController/>}/>
        <Route path='/:movie/:id' element={<Movie/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
