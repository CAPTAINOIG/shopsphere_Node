import React from 'react'
import { BsFillQuestionCircleFill } from "react-icons/bs";
import EditVendorData from './EditVendorData';
import { Link } from 'react-router-dom';



const AddNewVendor2 = () => {
  return (   
    <div className='bg-white h-screen mt-10 pb-10'>
      <section className='border-b'>
      <div className='w-[267px] h-[251px] mb-5'>
        <h1 className='text-center font-semibold w-[229px] mb-2'>Create A New Vendor</h1>
        <div className='flex flex-col justify-center items-center rounded  gap-8 shadow-[0_4px_25px_0px_#0000000D] h-[211px]'>
          <span className='text-7xl text-[#a7cab9]'><BsFillQuestionCircleFill /></span>
          <Link to='/layout/newvendordetails'  className='border  py-2 px-6 rounded'>Add New Vendor</Link>
        </div>
      </div>
      </section>
      <section className=''>
        <h1 className='font-semibold text-xl mt-5'>Edit Vendor Informations</h1>
        <EditVendorData/>
      </section>
    </div>
  )
}

export default AddNewVendor2