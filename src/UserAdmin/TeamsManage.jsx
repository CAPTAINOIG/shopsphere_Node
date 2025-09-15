import React, { useState } from 'react';
import { MdArrowBackIos, MdOutlineArrowDropDown, MdSearch } from "react-icons/md";
import { BsFunnel } from "react-icons/bs";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const TeamsManage = ({ onBack }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [actionDropdownIndex, setActionDropdownIndex] = useState(null);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleActionDropdown = (index) => {
    setActionDropdownIndex(actionDropdownIndex === index ? null : index);
  };

  const teams = [
    {
      firstname: "Jane",
      lastname: "John",
      email: "janejohn@gmail.com",
      position: "Admin"
    },
    {
      firstname: "Samsudeen",
      lastname: "Abdullahi",
      email: "abdullahisamsudeen@gmail.com",
      position: "Member"
    },
  ];

  const getPositionStyles = (position) => {
    switch (position.toLowerCase()) {
      case 'admin':
        return 'bg-green-100 text-green-700';
      case 'member':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <button
        onClick={onBack}
        className="text-white bg-[#bb8232] flex items-center rounded-[8px] px-2 py-1 my-2"
      >
        <MdArrowBackIos /> Back
      </button>

      <h1 className="font-semibold text-2xl mb-4">Manage Teams</h1>

      {/* Filter and Search Row */}
      <div className="flex items-center gap-4 mb-6">
        {/* Dropdown Button */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md bg-white text-gray-700 font-medium min-w-[140px]"
          >
            <BsFunnel className="text-lg" />
            Active
            <MdOutlineArrowDropDown
              className={`text-xl transform transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>
          {dropdownOpen && (
            <div className="absolute z-10 bg-white border border-gray-200 shadow-md mt-2 rounded-md w-full">
              <ul className="text-sm text-gray-700">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 1</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 2</li>
              </ul>
            </div>
          )}
        </div>

        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Enter name or email address to search"
            className="w-full border border-gray-300 rounded-md pl-4 pr-10 py-2 text-gray-700 outline-none placeholder:text-green-700"
          />
          <MdSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
        </div>
      </div>

      {/* Team Members */}
      <div className="space-y-4">
        {teams.map((member, index) => {
          const initials = `${member.firstname[0] || ''}${member.lastname[0] || ''}`;

          return (
            <div
              key={index}
              className="flex justify-between items-center border border-gray-200 rounded-lg p-4 bg-white"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#bb8232] text-white flex items-center justify-center text-xl font-bold rounded-full">
                  {initials}
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[17px] font-semibold">
                    {member.lastname} {member.firstname}
                    <span className={`text-xs px-2 py-1 rounded-full ${getPositionStyles(member.position)}`}>
                      {member.position}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">{member.email}</div>
                </div>
              </div>

              <div className="relative">
                <button onClick={() => toggleActionDropdown(index)}>
                  <HiOutlineDotsHorizontal className="text-2xl text-gray-600 hover:text-black" />
                </button>
                {actionDropdownIndex === index && (
                  <div className="absolute right-0 top-[20px] bg-white border border-gray-200 rounded-md shadow-lg z-10 w-44 text-sm text-gray-700">
                    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Manage Privileges</div>
                    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Suspend Member</div>
                    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">Delete Member</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamsManage;
