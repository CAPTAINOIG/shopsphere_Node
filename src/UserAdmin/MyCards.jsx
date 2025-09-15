import React from "react";
import { GrNotes } from "react-icons/gr";
import { IoMdPerson } from "react-icons/io";
import { FaEnvelope } from "react-icons/fa";

const MyCards = ({ onCardClick }) => {
  return (
    <div className="grid md:grid-cols-12 grid-cols-1 md:gap-10 gap-5">
      <div className="text-[#027840] font-semibold text-[17px] rounded-[16px] md:col-span-4 border bg-white flex flex-col gap-5 justify-center items-center p-5">
        <p><GrNotes /></p>
        <h2>Number Of Members</h2>
        <p>10</p>
        <button
          onClick={() => onCardClick("team")}
          className="bg-[#027840] text-white py-3 px-5 rounded-[8px]"
        >
          Manage Team
        </button>
      </div>

      <div className="text-[#BB8232] font-semibold text-[17px] rounded-[16px] md:col-span-4 border bg-white flex flex-col gap-5 justify-center items-center p-5">
        <p><IoMdPerson /></p>
        <h2>Active Members</h2>
        <p>5</p>
        <button
          onClick={() => onCardClick("invite")}
          className="bg-[#BB8232] text-white py-3 px-3 rounded-[8px]"
        >
          Add New Member
        </button>
      </div>

      <div className="text-[#005D68] font-semibold text-[17px] rounded-[16px] md:col-span-4 border bg-white flex flex-col gap-5 justify-center items-center p-5">
        <p><FaEnvelope /></p>
        <h2>Pending Invites</h2>
        <p>1</p>
        <button
          onClick={() => onCardClick("reminder")}
          className="bg-[#005D68] text-white py-3 px-5 rounded-[8px]"
        >
          Send Reminders
        </button>
      </div>
    </div>
  );
};

export default MyCards;
