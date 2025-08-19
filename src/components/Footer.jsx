import React from 'react'
import {FaLinkedinIn, FaGithub, FaInstagram,  FaPhone } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";


function Footer() {
  return (
    <div className='relative w-full h-30% bg-[#021526] text-gray-300 '>
    <div className='flex flex-row justify-between items-center px-10 pt-10'>
      <div className='flex flex-col text-white text-center '>
        <h1 className='lg:text-3xl sm:text-xl md:text-2xl text-white'>PhotoSphere</h1>
        <p className='sm:text-xs md:text-sm lg:text-md'>We love nature</p>
      </div>
      <div>
        <p className='lg:text-2xl sm:text-xs md:text-sm'>📍Nigeria</p>
      </div>
      <div className='flex flex-row lg:gap-6 lg:text-3xl sm:text-2xl md:text-2xl sm:gap-3 md:gap-4 cursor-pointer '>
        <a className='shadow-2xl' href="https://www.linkedin.com/in/abubakar-ado-garba-006255314" target='_blank'><FaLinkedinIn /></a>
        <a className='shadow-2xl' href="https://github.com/Sadiqag2001" target='_blank'><FaGithub/></a>
        <a className='shadow-2xl' href="https://instagram.com/sad33q_ag" target='_blank'><FaInstagram /></a>
        <a className='shadow-2xl' href="tel:+2347034723363" target='_blank'><FaPhone /></a>
        <a className='shadow-2xl' href="mailto:abubakaradogarba@gmail.com" target='_blank'><IoIosMail/></a>
      </div>
    </div>
      <p className='p-3 block justify-center items-center text-center lg:text-2xl sm:text-xs md:text-sm text-white font-thin'>copyrights © PhotoSphere 2025</p>
    </div>
  )
}

export default Footer
