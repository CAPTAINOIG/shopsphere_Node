import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Success = () => {
  const marketPlace = localStorage.getItem('submittedMarketPlace') || 'your marketplace';

  return (
    <div className="lg:px-[20%] h-screen  flex flex-col justify-center items-center mt-20">
      <div className="md:mt-[-360px] relative mt-[-100%]">
        <DotLottieReact
          src="https://lottie.host/9903b639-93ff-4316-b732-d70e0a851797/DhjovHDRYU.lottie"
          autoplay
          style={{ height: '200px', width: '100%' }}
          aria-label="Success animation"
        />
      </div>
      <div className="text-center lg:mx-[20%] flex justify-center items-center">
        <p className="">
          You’ve successfully enrolled for <strong> {marketPlace} </strong> marketplace. Feel free to explore, and let us know if you need any assistance along the way 🚀. Let’s make great things happen together!
        </p>
      </div>
    </div>
  );
};

export default Success;
