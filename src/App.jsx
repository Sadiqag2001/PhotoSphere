import './index.css'
import Hero from './pages/Hero'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Search from './pages/Search'
import Explore from './pages/Explore'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/search" element={<Search />} />
        <Route exact path='/explore' element={<Explore />}>
        </Route>
      </Routes>
        <Explore />
     <Footer />
    </Router>
    </>
  )
}

export default App
