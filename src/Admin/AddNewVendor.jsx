import React, { useState, useMemo } from 'react';
import { useSpring, animated } from '@react-spring/web';
import imgs from './Images/welcomeg.jpg';
import AddNewVendor2 from './AddNewVendor2';

const AddNewVendor = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const fullName = localStorage.getItem('fullName') || 'User';

  
  const welcomeProps = useMemo(
    () =>
      useSpring({
        transform: showWelcome ? 'translateX(0%)' : 'translateX(-100%)',
        opacity: showWelcome ? 1 : 0,
        config: { tension: 150, friction: 40 },
      }),
    [showWelcome]
  );

  // Animation for content div (slide in from right)
  const contentProps = useMemo(
    () =>
      useSpring({
        transform: showWelcome ? 'translateX(100%)' : 'translateX(0%)',
        opacity: showWelcome ? 0 : 1,
        config: { tension: 150, friction: 40 },
      }),
    [showWelcome]
  );

  return (
    <div className="relative w-full h-screen   bg-white">
      <animated.div
        style={welcomeProps}
        className="absolute w-full h-full flex flex-col items-center justify-center bg-white"
      >
        <img src={imgs} alt="Welcome" width={130} />
        <h1 className="text-2xl font-bold mt-4">Welcome {fullName}</h1>
        <p className="text-center mt-2 px-4">
          Start creating new vendors on Swift Suite and edit existing vendor details
        </p>
        <button
          className="mt-6 px-6 py-2 bg-[#089451] text-white rounded border hover:bg-white hover:border-[#089451] hover:text-[#089451]"
          onClick={() => {
            console.log('Proceed button clicked');
            setShowWelcome(false);
          }}
        >
          Proceed
        </button>
      </animated.div>
      <animated.div
        style={contentProps}
        className={`absolute bg-white p-4 sm:p-6 overflow-auto shadow-[0_4px_25px_0px_rgba(0,0,0,0.05)] scrollbar-none scrollbar-white ${
          showWelcome ? 'w-0 opacity-0 pointer-events-none' : 'w-full opacity-100'
        }`}
      >
        <AddNewVendor2/>
      </animated.div>
    </div>
  );
};

export default AddNewVendor;