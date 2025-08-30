import './index.css'
import Hero from './pages/Hero'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Search from './pages/Search'
import Explore from './pages/Explore'
import Register from './pages/Register'
import Login from './pages/Login'
import Favourites from './pages/Favourites'
import NavBar from './components/NavBar'
import ExplorePreview from './pages/ExplorePreview'
import ContactUs from './pages/ContactUs'

function Home() {
  return (
    <>
      <Hero />
      <ExplorePreview />
    </>
  )
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path='/contact' element={<ContactUs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
