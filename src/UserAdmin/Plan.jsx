import React from "react";
import { FiClock } from "react-icons/fi";
import leather from "../Images/Sneak.png"
import { Link } from "react-router-dom";


const Plan = () => {



    return (
        <div className="grid md:grid-cols-12 grid-cols-1 gap-5 my-5">
            <div className="md:col-span-5 col-span-6 flex flex-col gap-3 p-5 bg-white rounded-[8px]">
                <h2 className="font-semibold">Current Plan</h2>
                <div className="border p-2 bg-[#BB8232] w-[80px] text-white rounded-[8px] text-center font-semibold">Starter</div>
                <p className="text-[#027840]">Upgrade your subscription plan to enjoy more advanced admin priviledges. Add more team members and integrate new features.</p>
                <div className="flex justify-between">
                    <p className="text-[#00000099] font-[500] ">Want to Upgrade?</p>
                    <Link to='/pricing' className="border border-[#027840] text-[#027840] py-2 px-7 font-semibold rounded-[8px]">See Other Plans</Link>
                </div>
            </div>
            <div className="md:col-span-7 col-span-6">
                <div className="flex justify-between">
                <h2 className="font-semibold mb-2">Recent Activities by all members</h2>
                <Link to='' className="underline text-[#005D68]">See more</Link>
                </div>
                <div className="flex flex-col gap-5">
                <div className="flex bg-white items-center justify-between px-4 py-2 rounded-[8px]">
                  <p className="text-[#005D68] "><span className="font-bold text-black">Tori Vega</span> listed a product</p>  
                  <p className="flex item-center gap-1 text-[#00000099]"><FiClock className="mt-[3px]" />  Just now</p>
                  <img src={leather} alt=""  className="w-[40px] rounded"/>
                </div>
                <div className="flex bg-white items-center justify-between px-4 py-2 rounded-[8px]">
                  <p className="text-[#005D68] "><span className="font-bold text-black">Tesi Love</span> edited inventory</p>  
                  <p className="flex item-center gap-1 text-[#00000099]"><FiClock className="mt-[3px]" />  1 hr ago</p>
                  <img src={leather} alt=""  className="w-[40px] rounded"/>
                </div>
                <div className="flex bg-white items-center justify-between px-4 py-2 rounded-[8px]">
                  <p className="text-[#005D68] "><span className="font-bold text-black">Andy Ray</span> listed a product</p>  
                  <p className="flex item-center gap-1 text-[#00000099]"><FiClock className="mt-[3px]" />5 hrs ago</p>
                  <img src={leather} alt=""  className="w-[40px] rounded"/>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Plan;