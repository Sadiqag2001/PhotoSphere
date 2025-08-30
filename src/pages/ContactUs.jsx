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
    <div className='w-full h-full bg-[#010f1b] py-25 px-25 text-gray-800 '>
      <div className='flex flex-row justify-center items-center pb-10 text-6xl'>
        <h2>Contact Us </h2>
      </div>
      <div className='flex justify-center items-center bg-[#dedede] shadow-4xl rounded-2xl w-[90%] h-full'>
        <div className='relative flex flex-col p-10 items-start w-[45%] h-auto'>
            <p className='absolute text-gray-800 opacity-10 text-[200px]'>1 1 0</p>
            <h2 className='text-4xl pb-4'>Contact Us</h2>
            <p className='pb-5'>Fill up the form and our team will get back to you within 24 hours.</p>
            <div className='mt-5  flex flex-col gap-3'>
                <a className=' flex flex-row justify-start items-center gap-2' href="tel:+2347034723363" target='_blank'><FaPhone className='fill-green-500 text-2xl' />+234-703-472-3363</a>
                <a className=' flex flex-row justify-start items-center gap-2' href="mailto:abubakaradogarba@gmail.com" target='_blank'><IoIosMail className='text-2xl'/>abubakaradogarba@gmail.com</a>
                <a className=' flex flex-row justify-start items-center gap-2' href=""><FaLocationDot className='fill-red-600 text-2xl' />Kano, Nigeria</a>
            </div>
        </div>
        <form  action="https://formspree.io/f/myzdwppj" method="POST" className='w-[55%] h-full bg-[#01172b] text-[#dedede] flex flex-col gap-4 p-5 pb-10 pt-15 rounded-lg'>
            <input type="text" placeholder='Name' value={formData.name} onChange={handleChange} required className='border border-gray-500 rounded font-light py-3 px-2 opacity-50' />
            <input type="email" placeholder='E-mail'  value={formData.email} onChange={handleChange} required className='border border-gray-500 rounded font-light py-3  px-2 opacity-50' />
            <textarea name="message" placeholder='Message' value={formData.message} onChange={handleChange} required className='border rounded border-gray-500 font-light py-7 px-2 opacity-50'></textarea>
            <button type='submit' className='px-6 py-3 shadow-2xl bg-[#010f1b] text-[#dedede] rounded flex justify-center hover:bg-[#000000] items-end w-[25%]'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default ContactUs
