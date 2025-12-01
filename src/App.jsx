import './index.css'
import Hero from './pages/Hero'
import Footer from './components/Footer'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Search from './pages/Search'
import Explore from './pages/Explore'
import Register from './pages/Register'
import Login from './pages/Login'
import Favourites from './pages/Favourites'
import NavBar from './components/NavBar'
import ExplorePreview from './pages/ExplorePreview'
import ContactUs from './pages/ContactUs'
import Profile from './pages/Profile'
import { useEffect, useRef } from 'react'; 
import { useUserStore } from './store/userStore';
import EditProfile from './pages/EditProfile'
import SkeletonLoader from './components/SkeletonLoader'

function Home() {
  return (
    <>
      <Hero />
      <ExplorePreview />
    </>
  )
}

function App() {
  const initAuthListener = useUserStore((state) => state.initAuthListener);
  const user = useUserStore((state) => state.user);
  const isLoadingAuth = useUserStore((state) => state.isLoadingAuth);
  const navigate = useNavigate();
  const location = useLocation();

  const listenerInitialized = useRef(false);

  useEffect(() => {
    if (!listenerInitialized.current) {
      initAuthListener();
      listenerInitialized.current = true;
    }
  }, [initAuthListener]);

 
  useEffect(() => {
    if (!isLoadingAuth) { 
      const storedRedirectPath = sessionStorage.getItem('redirectAfterLogin');

      if (user && storedRedirectPath) {
        sessionStorage.removeItem('redirectAfterLogin');
        const targetPath = storedRedirectPath !== '/login' ? storedRedirectPath : '/';
        navigate(targetPath, { replace: true });
      }
      if (!user) {
        sessionStorage.removeItem('redirectAfterLogin');
      }
    }
  }, [user, navigate, isLoadingAuth]);

  useEffect(() => {
    if (!isLoadingAuth) { 
      const protectedRoutes = ['/favourites', '/profile', '/edit-profile'];
      if (!user && protectedRoutes.includes(location.pathname)) {
        sessionStorage.setItem('redirectAfterLogin', location.pathname);
        navigate('/login', { state: { from: location } });
      }
    }
  }, [user, location.pathname, navigate, isLoadingAuth]); 


  if (isLoadingAuth) {
    return (
      <SkeletonLoader />
    );
  }


  return (
    // <Router>
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
            <Route path='/profile' element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    // </Router>
  )
}

export default App
