import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Profileimage from './Profileimage';
import { GrUserAdmin } from "react-icons/gr";
import SignOutButton from '../pages/SignOutButton';
import { MdArrowDropUp } from "react-icons/md";
import { TfiWallet } from "react-icons/tfi";
import { MdOutlineSettings } from "react-icons/md";
import { LiaSignOutAltSolid } from "react-icons/lia";

const DropdownUser = () => {
  let fullName = localStorage.getItem('fullName');
  const Admin = JSON.parse(localStorage.getItem('Admin'));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const handleSignOut = () => {
    localStorage.removeItem("token");
    closeModal();
    navigate("/signin");
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div className="relative flex gap-3">
      {/* Trigger */}
      <Profileimage />
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-bold text-black dark:text-white">
            {fullName}
          </span>
          <span className="block  text-start font-bold text-[#027840]">
            Vendor
          </span>
        </span>

        <MdArrowDropUp
          className={`hidden text-current sm:block transition-transform duration-200 ${
            dropdownOpen ? 'rotate-180' : 'rotate-0'
          }`}
          size={20}
        />
      </Link>

      {/* Dropdown */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0  w-[220px] rounded-sm border py-5 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen ? 'block' : 'hidden'
        }`}
      >
        {/* Top Section inside dropdown */}
        <div className="flex items-center justify-between px-4 py-3 border-stroke dark:border-strokedark">
          <div className="flex items-center gap-3">
            <Profileimage />
            <div>
              <p className="text-sm font-bold text-black dark:text-white">{fullName}</p>
              <p className=" font-bold text-[#027840]">Vendor</p>
            </div>
          </div>
          {/* Close dropdown icon */}
          <button onClick={() => setDropdownOpen(false)}>
            <MdArrowDropUp size={20} className="rotate-180 text-current" />
          </button>
        </div>

        {/* Menu */}
        <ul className="flex flex-col gap-5 mt-4 border-stroke px-6 py-7.5 dark:border-strokedark">
          <li>
            <Link
              to="/layout/payment-history"
              className="flex items-center  gap-3.5  text-sm  duration-300 ease-in-out text-[#005D68] font-semibold lg:text-base"
            >
              < TfiWallet size={18} />
              <span>Payment History</span>
            </Link>
          </li>

          <li>
            <Link
              to="/layout/settings"
              className="flex items-center  gap-3.5 text-[#005D68] mt-2 text-sm font-semibold duration-300 ease-in-out lg:text-base"
            >
              < MdOutlineSettings size={18} />
              <span>Settings</span>
            </Link>
          </li>
          <li className={Admin ? 'block' : 'hidden'}>
            <Link
              to="/layout/addnewvendor"
              className="ps-1 flex items-center mt-4 gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-green-700 lg:text-base"
            >
              <span className="text-xl"><GrUserAdmin /></span>
              <span>Admin</span>
            </Link>
          </li>
        </ul>

        {/* Sign Out */}
        <button className="flex items-center gap-3.5 mt-7 px-6 text-sm text-[#BB8232] font-semibold duration-300 ease-in-out  lg:text-base">
          <LiaSignOutAltSolid  size={18}/>
          <Link to="/signin" onClick={(e) => { e.preventDefault(); openModal(); }}>Sign Out</Link>
        </button>
      </div>

      <SignOutButton openModal={openModal} closeModal={closeModal} isOpen={isOpen} />
    </div>
  );
};

export default DropdownUser;
