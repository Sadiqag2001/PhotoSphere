import React, { useEffect, useState } from 'react'
// import BgImg0 from "../assets/bgImg0.jpg";
// import BgImg1 from "../assets/bgImg1.jpg";
// import BgImg2 from "../assets/bgImg2.jpg";
// import BgImg3 from "../assets/bgImg3.jpg";
// import BgImg4 from "../assets/bgImg4.jpg";
// import BgImg5 from "../assets/bgImg5.jpg";
// import BgImg6 from "../assets/bgImg6.jpg";
import { usePhotoStore } from '../store/photostore';
import NavBar from '../components/NavBar';

const Hero = () => {
  const fetchTrending = usePhotoStore((state) => state.fetchTrending);
  const photos = usePhotoStore((state) => state.photos);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchTrending();
  }, [fetchTrending]);


  useEffect(() => {
    if (photos.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [photos]);

  return (
    <div className="w-full h-screen relative text-white overflow-hidden">
    
      <div className="absolute inset-0 z-0">
        {photos.map((photo, index) => (
          <img
            key={photo.id}
            src={photo.src.landscape}
            alt={photo.alt}
            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      <div className="absolute z-10 inset-0 bg-black/50"></div>
      <NavBar />
      <div className="relative z-20 flex flex-col gap-3 justify-center items-center h-full">
        <h1 className="text-8xl font-bold">PhotoSphere</h1>
        <p className="text-md">By Abubakar Ado Garba</p>
        <p>All images are gotten from <a href="https://pexels.com" target='_blank' className='font-bold text-gray-300'> Pexels</a></p>
        <button className="px-4 py-2 bg-white/15 text-white text-md rounded-3xl cursor-pointer hover:bg-white/30">
          Explore
        </button>
      </div>
    </div>
  );
};

export default Hero;
