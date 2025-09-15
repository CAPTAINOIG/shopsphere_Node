import React from 'react'
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { FaEnvelope } from "react-icons/fa";
import { BsChatFill } from "react-icons/bs";
import { IoMdCall } from "react-icons/io";
import { SlLocationPin } from "react-icons/sl";


const ContactUs = () => {
  return (
    <div className='bg-[#E7F2ED] min-h-screen flex justify-center items-center'>
        <section className='flex flex-col justify-center items-center bg-white rounded-t-[24px] rounded-b-[20px] my-10'>
            <div className='flex justify-center items-center rounded-[100%] border-3 mt-10 border-[#027840] bg-[#E7F2ED] p-3 mx-10'><TfiHeadphoneAlt  size={20}/></div>
            <h1 className='font-bold text-xl'>Contact Swift Suite</h1>
            <p className='font-semibold text-gray-700'>We're here to help you with your dropshipping journey</p>
            <section className='flex gap-10 p-5 md:px-20'>
                <div className='space-y-5 p-5 font-semibold'>
                    <div className='flex gap-2'>
                        <FaEnvelope className='mt-1 text-[#027840]'/>
                        <div>
                            <p>Email</p>
                            <p className='text-[#027840] font-semibold'>Support@swiftsuite.app</p>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <BsChatFill className='mt-1 text-[#027840]'/>
                        <div>
                            <p>Live Chat</p>
                            <p className='text-[#027840] font-semibold'>Available on your Swift Suite dashboard</p>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <IoMdCall className='mt-1 text-[#027840]'/>
                        <div>
                            <p>Phone</p>
                            <p className='text-[#027840] font-semibold'>+12345657849</p>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <SlLocationPin className='mt-1 text-[#027840]'/>
                        <div>
                            <p>Location</p>
                            <p className='text-[#027840] font-semibold'>Office Address</p>
                        </div>
                    </div>
                </div>
                <div className='border-l-2 border-gray-400 p-5'>
                    <form className="space-y-6">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-[#02784066] rounded-lg focus:outline-none"
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        className="w-full px-4 py-2 border border-[#02784066] rounded-lg focus:outline-none"
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Store URL
                    </label>
                    <input
                        type="url"
                        className="w-full px-4 py-2 border border-[#02784066] rounded-lg focus:outline-none"
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                    </label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-[#02784066] rounded-lg focus:outline-none"
                    />
                    </div>
                    <button
                    type="submit"
                    className="w-full bg-[#027840] hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
                    >
                    Send Message
                    </button>
                </form>
                </div>
            </section>
            <div className='bg-[#027840] h-[1rem] rounded-b-[32px] w-full'></div>
        </section>
    </div>
  )
}

export default ContactUs