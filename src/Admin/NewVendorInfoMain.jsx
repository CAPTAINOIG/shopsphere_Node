import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { FaSquareCheck } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { handleNextStep } from '../redux/newVendor';
import NewVendorInfo1 from './NewVendorInfo1';
import NewVendorInfo2 from './NewVendorInfo2';

const NewVendorInfoMain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentIndex = useSelector(state => state.newVendor.addNewVendor.currentStep);
  console.log(currentIndex);
  
  

  useEffect(() => {
    return () => {
      dispatch(handleNextStep({ currentStep: -1 }));
    };
  }, [dispatch, navigate]);

  

  const myList = [
    { name: 'Vendor Information', icon: <MdCheckBoxOutlineBlank />, icon2: <FaSquareCheck /> },
    { name: 'Pull Vendor Data', icon: <MdCheckBoxOutlineBlank />, icon2: <FaSquareCheck /> }
  ];

  

  return (
    <div className=" mt-10 bg-white lg:px-10  md:px-5 px-2 border">
      <div className="grid grid-cols-12 gap-6 items-start">
        <div className=" md:col-span-7 col-span-12 ">
          {currentIndex === 0 && <NewVendorInfo1/>}
          {currentIndex === 1 && <NewVendorInfo2/>}
        </div>

        <div className={currentIndex > 1 ? 'hidden' : 'md:col-span-4 col-span-12  md:order-last bg-white  -order-last mt-8  shadow'}>
          {myList.map((items, index) => (
            <ul key={index} className="flex justify-between border-b hover:bg-gray-100 cursor-pointer border-gray-500 px-5 py-2">
              <li className="font-semibold">{items.name}</li>
              <li className={currentIndex > index ? 'mt-2 text-[#089451]' : 'mt-2'}>{currentIndex > index ? items.icon2 : items.icon}</li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewVendorInfoMain;
