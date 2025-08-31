import React,{useState} from 'react'
import { FaPhone } from 'react-icons/fa'
import { IoIosMail } from 'react-icons/io'
import { FaLocationDot } from "react-icons/fa6";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className='w-full min-h-screen bg-[#010f1b] py-16 px-6 sm:px-12 lg:px-24 text-gray-800 flex flex-col'>
      <div className='flex justify-center items-center pb-10 text-4xl sm:text-5xl lg:text-6xl'>
        <h2 className='text-[#dedede] pt-5'>Contact Us</h2>
      </div>

      <div className='flex flex-col lg:flex-row justify-center items-stretch bg-[#dedede] shadow-4xl rounded-2xl w-full lg:w-[90%] mx-auto'>
        
        <div className='relative flex flex-col p-6 sm:p-10 items-start w-full lg:w-[45%] h-auto'>
          <p className='absolute text-gray-800 opacity-10 text-[100px] sm:text-[150px] lg:text-[200px]'>1 1 0</p>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl pb-4'>Contact Us</h2>
          <p className='pb-5 text-sm sm:text-base'>Fill up the form and our team will get back to you within 24 hours.</p>
          <div className='mt-5 flex flex-col gap-3 text-sm sm:text-base'>
            <a className='flex flex-row items-center gap-2' href="tel:+2347034723363" target='_blank'><FaPhone className='fill-green-500 text-xl sm:text-2xl' />+234-703-472-3363</a>
            <a className='flex flex-row items-center gap-2' href="mailto:abubakaradogarba@gmail.com" target='_blank'><IoIosMail className='text-xl sm:text-2xl'/>abubakaradogarba@gmail.com</a>
            <a className='flex flex-row items-center gap-2' href=""><FaLocationDot className='fill-red-600 text-xl sm:text-2xl' />Kano, Nigeria</a>
          </div>
        </div>

        <form action="https://formspree.io/f/myzdwppj" method="POST" className='w-full lg:w-[55%] bg-[#01172b] text-[#dedede] flex flex-col gap-4 p-6 sm:p-8 lg:p-10 rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none'>
          <input type="text" name="name" placeholder='Name' value={formData.name} onChange={handleChange} required className='border border-gray-500 rounded font-light py-3 px-2 opacity-70' />
          <input type="email" name="email" placeholder='E-mail' value={formData.email} onChange={handleChange} required className='border border-gray-500 rounded font-light py-3 px-2 opacity-70' />
          <textarea name="message" placeholder='Message' value={formData.message} onChange={handleChange} required className='border rounded border-gray-500 font-light py-5 px-2 opacity-70 min-h-[120px]'></textarea>
          <button type='submit' className='px-6 py-3 shadow-2xl bg-[#010f1b] text-[#dedede] rounded hover:bg-black w-full sm:w-[50%] lg:w-[40%] xl:w-[25%] mx-auto lg:mx-0'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default ContactUs
