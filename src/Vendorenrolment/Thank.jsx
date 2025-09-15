import React from 'react'
import success from '../Images/success.png'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Thank = () => {

    const store = useSelector(state => state.vendor.vendorData)
    const vendor_name = localStorage.getItem('vendor_name')

    const navigate = useNavigate()


    const catalogue = () => {
        navigate("/layout/catalogue")
    }

    return (
        <>
            <div className=' w-full'>
                <section className='flex flex-col justify-center items-center h-full mt-[-60px] md:mx-40 mx-20'>
                    <div className='text-center text-[15px] '>
                        <img className='mx-auto' src={success} width={150} alt="" />
                        <p className="my-3">{vendor_name && `${vendor_name} enrollment successful!`}</p>
                        <p className={vendor_name === 'RSR' ? 'block text-red-400' : 'hidden'}>RSR processing started in the background. Please check back later</p>
                        <p className=''>Thanks for ......! We hope you have fun using our platform. If you ever need support, please feel free to email us at abrahamoladotun@gmail.com.</p>
                    </div>
                    <div className='text-center my-5'>
                        <button onClick={() => catalogue()} type='submit' className='bg-[#089451] text-white border py-1 px-5 rounded hover:bg-white  hover:text-[#089451] border-[#089451]'>Go To Catalogue</button>
                    </div>
                </section>
            </div>

        </>
    )
}

export default Thank