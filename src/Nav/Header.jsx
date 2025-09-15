import React, { useContext, useState } from 'react'
import { AppContext } from '../context/Dashboard'
import { MdMenu } from 'react-icons/md'
import DropdownUser from './DropdownUser'
import { IoSettingsOutline } from "react-icons/io5";
import Searchinput from './Searchinput'
import { VscBell } from "react-icons/vsc";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useEffect } from 'react';
import swift from '../Images/swift.png'
import { Link, useLocation } from 'react-router-dom';
import logo from '../Images/mainlogo.svg';



const Header = () => {
  const { toggleSideBar, sideBarOpen, setSideBarOpen, isTablet } = useContext(AppContext)

  const sidebarRef = useRef();
  const { pathname } = useLocation();
  useEffect(() => {
    if (isTablet) {
      setSideBarOpen(false)
    } else {
      setSideBarOpen(true)
    }
  }, [isTablet]);

  const Nav_animation = isTablet
    ? {
      open: {
        x: 0,
        width: "13rem",
        transition: {
          damping: 70,
        },
      },
      closed: {
        x: -250,
        width: 0,
        transition: {
          damping: 70,
          delay: 0.45,
        },
      },
    }
    : {
      open: {
        width: "16rem",
        transition: {
          damping: 40,
        },
      },
      closed: {
        width: "4rem",
        transition: {
          damping: 40,
        },
      },
    };
  // console.log(sideBarOpen);

  return (
    <>
      <div ref={sidebarRef} variants={Nav_animation} initial={{ x: isTablet ? -250 : 0 }} animate={sideBarOpen ? "open" : "closed"} className={`${!sideBarOpen ? 'fixed top-0 right-0 left-0 lg:ms-[65px] lg:p-0 lg:px-0 p-5 px-10 z-50 shadow-sm bg-white flex flex-row justify-between items-center' : 'fixed top-0 right-0 left-0 border-b-1  z-50  lg:p-0 lg:px-5 p-5 px-10 bg-white   flex flex-row justify-between items-center'}`}>
        <div className="flex items-center justify-between lg:gap-10 gap-5 lg:hidden cursor-pointer" onClick={() => toggleSideBar()}>
          <MdMenu size={25} />
        </div>
        <div className=' w-[160px] lg:block hidden'>
          <Link to="/" className=''>
            <img src={logo} alt="" className='w-[196px] h-[88.2px]' />
          </Link>
        </div>
        <div className='flex items-center justify-between md:gap-5'>
          {/* <Searchinput /> */}
          <div className='flex items-center md:gap-8 gap-5 '>
            {/* <IoSettingsOutline className='' size={20} /> */}
            <VscBell size={20} />
            <DropdownUser />
          </div>
        </div>
      </div>
      {/* </div> */}

    </>
  )
}
export default Header