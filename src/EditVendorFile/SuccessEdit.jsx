import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link } from 'react-router-dom';


const SuccessEdit = () => {
  const vendor = localStorage.getItem('matchedVendor') || 'this vendor';

  return (
    <div className="md:ms-[20%] mx-10 h-screen bg-[#E7F2ED] flex flex-col justify-center items-center w-full">
      <div className="md:mt-[-200px] relative mt-[-100%] md:w-[60%] ">
        <DotLottieReact
          src="https://lottie.host/9903b639-93ff-4316-b732-d70e0a851797/DhjovHDRYU.lottie"
          autoplay
          aria-label="Success animation"
        />
      </div>
      <div className="text-center md:mx-[20%] mx-10 flex flex-col gap-5 justify-center items-center">
        <p className="">
          You’ve successfully edit/update this enrolment. Feel free to explore, and let us know if you need any assistance along the way 🚀. Let’s make great things happen together!
        </p>
        <Link to='/layout/editenrollment' className='underline text-green-500'>Back to Vendor</Link>
      </div>
    </div>
  );
};

export default SuccessEdit;
