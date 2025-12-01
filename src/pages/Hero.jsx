import React, { useEffect, useState } from "react";
import { usePhotoStore } from "../store/photostore";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore"; 

const Hero = () => {
  const fetchTrending = usePhotoStore((state) => state.fetchTrending);
  const photos = usePhotoStore((state) => state.photos);
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
 
  useEffect(() => {
    fetchTrending();
  }, [fetchTrending]);

  const handleExplore = () => {
    navigate("/explore");
  };

  useEffect(() => {
    if (photos.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [photos]);

  return (
    <div className="w-full max-h-full py-80 relative text-white overflow-hidden">
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
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      {/* <NavBar /> */}
      <div className="relative z-20 flex flex-col gap-3 justify-center items-center h-full text-center">
        <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          PhotoSphere
        </h1>
        <p className="text-sm sm:text-base md:text-lg">
          By Abubakar Ado Garba
        </p>
        <p className="text-xs sm:text-sm md:text-base">
          All images are from{" "}
          <a
            href="https://pexels.com"
            target="_blank"
            rel="noreferrer"
            className="font-bold text-red-300 underline"
          >
            Pexels
          </a>
        </p>
        <button
          onClick={handleExplore}
          className="px-6 py-2 text-sm sm:text-base bg-white/15 text-white rounded-3xl cursor-pointer hover:bg-white/30 transition"
        >
          Explore
        </button>
      </div>
    </div>
  );
};

export default Hero;
