import React from 'react'
import { ImSearch } from "react-icons/im";

function NavBar() {
  return (
    <div className='absolute z-20 top-0 left-0 w-full flex flex-row justify-between items-center p-4 bg-none '>
        <div className='flex flex-row justify-between items-center gap-8'>
            <h1 className='text-4xl text-white cursor-pointer'>PhotoSphere</h1>
        </div>
        <div className='relative w-full sm:w-auto '> 
            <input type="text" placeholder='What are you looking for? ' className='lg:pl-5 lg:pr-40 sm:pl-3 sm:pr-10 md:pl-5 md:pr-12 py-3 rounded-3xl border border-white focus:outline-none focus:ring-2 focus:ring-gray-300' />
            <button className='absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600'> <ImSearch/></button>
        </div>
        <div className='flex flex-row gap-6 justify-center items-center mr-6 cursor-pointer'>
            <p className=' hover:text-gray-300 transform transition duration-200'>Home</p>
            <p className=' hover:text-gray-300 transform transition duration-200'>Explore</p>
            <p className=' hover:text-gray-300 transform transition duration-200'>Favourites</p>
        </div>
    </div>
  )
}

export default NavBar
