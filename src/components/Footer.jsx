import React from 'react'
import {FaLinkedinIn, FaGithub, FaInstagram,  FaPhone } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";


function Footer() {
  return (
    <div className='w-full h-30% bg-[#021526] text-gray-300 '>
    <div className='flex flex-row justify-between items-center px-10 pt-10'>
      <div className='flex flex-col text-white text-center '>
        <h1 className='text-3xl text-white'>PhotoSphere</h1>
        <p>We love nature</p>
      </div>
      <div>
        <p className='text-2xl '>📍Nigeria</p>
      </div>
      <div className='flex flex-row gap-6 text-3xl cursor-pointer '>
        <a className='shadow-2xl' href="https://www.linkedin.com/in/abubakar-ado-garba-006255314" target='_blank'><FaLinkedinIn /></a>
        <a className='shadow-2xl' href="https://github.com/Sadiqag2001" target='_blank'><FaGithub/></a>
        <a className='shadow-2xl' href="https://instagram.com/sad33q_ag" target='_blank'><FaInstagram /></a>
        <a className='shadow-2xl' href="tel:+2347034723363" target='_blank'><FaPhone /></a>
        <a className='shadow-2xl' href="mailto:abubakaradogarba@gmail.com" target='_blank'><IoIosMail/></a>
      </div>
    </div>
      <p className='p-3 block justify-center items-center text-center text-white font-thin'>copyrights © PhotoSphere 2025</p>
    </div>
  )
}

export default Footer
