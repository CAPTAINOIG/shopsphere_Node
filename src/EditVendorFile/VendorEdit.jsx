import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { FaSquareCheck } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { handleNextStep } from '../redux/EditVendor';
import EditProductType from './EditProductType';
import VendorEnrollment from './VendorEnrollment';
import EditIdentifier from './EditIdentifier';
import EditVendorOption from './EditVendorOption';
import SuccessEdit from './SuccessEdit';

const VendorEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentIndex = useSelector(state => state.editVendor.enrolmentUpdate.currentStep);
  
  // Load the vendor data from localStorage on mount
  const [vendorData, setVendorData] = useState(null);

  useEffect(() => {
    const storedVendor = localStorage.getItem('matchedVendor');
    console.log(storedVendor);
    if (storedVendor) {
      setVendorData(JSON.parse(storedVendor));
    } else {
      navigate('/'); 
    }

    return () => {
      dispatch(handleNextStep({ currentStep: -1 }));
    };
  }, [dispatch, navigate]);

  if (!vendorData) {
    return <div className="text-center text-xl font-semibold mt-20">Loading...</div>;
  }

  const myList = [
    // { name: 'Vendor Enrollment', icon: <MdCheckBoxOutlineBlank />, icon2: <FaSquareCheck /> },
    { name: 'Edit Identifier', icon: <MdCheckBoxOutlineBlank />, icon2: <FaSquareCheck /> },
    // { name: 'Vendor Options', icon: <MdCheckBoxOutlineBlank />, icon2: <FaSquareCheck /> },
    { name: 'Product Type', icon: <MdCheckBoxOutlineBlank />, icon2: <FaSquareCheck /> }
  ];

  const handleStepChange = (step) => {
    dispatch(handleNextStep({ currentStep: step - 1 }));
  };

  return (
    <section className="bg-[#E7F2ED] md:mx-10 mx-5 my-10 ">
      <div className="grid grid-cols-12 gap-6 items-start">
        <div className=" md:col-span-7 col-span-12 ">
          {/* {currentIndex === 0 && <VendorEnrollment vendorData={vendorData} />} */}
          {currentIndex === 0 && <EditIdentifier vendorData={vendorData} />}
          {/* {currentIndex === 1 && <EditVendorOption vendorData={vendorData} />} */}
          {currentIndex === 1 && <EditProductType vendorData={vendorData} />}
          {currentIndex === 2 && <SuccessEdit />}
        </div>

        <div className={currentIndex > 1 ? 'hidden' : 'md:col-span-4 col-span-12  md:order-last bg-white  -order-last mt-8  shadow'}>
          {myList.map((items, index) => (
            <ul key={index} className="flex justify-between border-b hover:bg-gray-100 cursor-pointer border-gray-500 px-5 py-2" onClick={() => handleStepChange(index)}>
              <li className="font-semibold">{items.name}</li>
              <li className={currentIndex > index ? 'mt-2 text-[#089451]' : 'mt-2'}>{currentIndex > index ? items.icon2 : items.icon}</li>
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VendorEdit;
