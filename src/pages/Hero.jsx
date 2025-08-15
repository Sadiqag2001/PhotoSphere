import React, { useEffect } from 'react'
import BgImg0 from "../assets/bgImg0.jpg";
import BgImg1 from "../assets/bgImg1.jpg";
import BgImg2 from "../assets/bgImg2.jpg";
import BgImg3 from "../assets/bgImg3.jpg";
import BgImg4 from "../assets/bgImg4.jpg";
import BgImg5 from "../assets/bgImg5.jpg";
import BgImg6 from "../assets/bgImg6.jpg";
// import { usePhotoStore } from '../store/photostore';
import NavBar from '../components/NavBar';



const Hero = () => {
  // const fetchTrending = usePhotoStore((state) => state.fetchTrending);

  // useEffect(()=> {
  //   fetchTrending();
  // }, [fetchTrending]);

  return (
    <div className='w-full h-screen relative text-white'>

        <img src={BgImg3} alt="" className='w-full h-full absolute z-0 object-cover' /> {/*input fetchTrending in src */}
        <div className="absolute z-20 inset-0 bg-black/50"></div>
     
        <NavBar />
      <div className='relative z-20 flex flex-col gap-3 justify-center items-center top-70'>
        <h1 className='text-8xl text-white'>PhotoSphere</h1>
        <p className='text-md'>By Abubakar Ado Garba</p>
        <button className='px-4 py-2 bg-white/15 text-gray-950 text-md rounded-3xl cursor-pointer hover:bg-white/30'>Explore</button>
      </div>      
    </div>
  )
}

export default Hero
