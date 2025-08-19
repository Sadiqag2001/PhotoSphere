import './index.css'
import Hero from './pages/Hero'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Search from './pages/Search'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/search" element={<Search />} />
      </Routes>
     <Footer />
    </Router>
    </>
  )
}

export default App
