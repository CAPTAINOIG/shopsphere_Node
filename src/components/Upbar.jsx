import React from "react";
import { Link, useLocation } from "react-router-dom";

const Upbar = ({ onClickHandler }) => {
  const token = localStorage.getItem("token");

  // const location = useLocation()
  // const hiddenRoutes = []

  // const isHidden = hiddenRoutes.some(route => location.pathname.startsWith(route));

  return (
    <>
      <div
        className="fixed w-screen lg:hidden ms-[-5%] bg-white p-5 rounded"
        style={{ zIndex: "2" }}
      >
        <section className="mx-1">
          <div className="grid grid-cols-2 gap-2 justify-center items-center">
            <Link to="" className="font-semibold">
              Home
            </Link>
            <Link to="" className="font-semibold">
              Features
            </Link>
            <Link className="font-semibold" href="">
              Pricing
            </Link>
            <Link className="font-semibold" href="">
              Blog
            </Link>
            <Link className="font-semibold" href="">
              About
            </Link>
            <Link className="font-semibold" href="">
              Contact
            </Link>
          </div>
          <div className="flex md:gap-22 gap-5 my-4">
            <div className="hidden lg:flex justify-center items-center gap-6 md:me-10 mt-1">
              {token ? (
                <Link
                  to="/layout/home"
                  className="border w-[165px] text-white text-center py-1 bg-[#089451] hover:border-[#089451] hover:bg-white hover:text-[#089451] rounded-[6px]"
                >
                  Go Back to Dashboard
                </Link>
              ) : (
                <div className="hidden lg:flex justify-center items-center gap-6 md:me-10 mt-1">
                  <Link
                    to="/signup"
                    className="border w-[165px] text-white text-center py-1 bg-[#089451] hover:border-[#089451] hover:bg-white hover:text-[#089451] rounded-[6px]"
                  >
                    Get Started For Free
                  </Link>
                  <Link
                    to="/signin"
                    className="border w-[150px] border-[#089451] hover:border-green-900 text-center py-1 text-[#089451] hover:text-white rounded-[6px] hover:bg-[#089451]"
                  >
                    Sign in
                  </Link>
                </div>
              )}
            </div>
            {/*                    
                    <Link className='bg-[#089451] text-white text-center py-1 w-[200px]' to="/signup">Get Started For Free</Link>
                    <Link to='/signin' className='border border-[#089451] py-1 text-center w-[200px]'>Sign in</Link> */}
          </div>
        </section>
      </div>
    </>
  );
};

export default Upbar;

