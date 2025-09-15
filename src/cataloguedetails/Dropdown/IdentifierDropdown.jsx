import { useState, useRef, useEffect } from "react";
import { IoIosCheckmark } from "react-icons/io";
import { IoChevronDown } from "react-icons/io5";

const IdentifierDropdown = ({
  selected,
  onChange,
  open,
  setOpen,
  catalogueIdentifiers,
}) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="capitalize bg-white border-2 border-[#089451] text-[#089451] font-semibold hover:bg-[#089451] hover:text-white transition-colors duration-200 min-w-[120px] px-4 py-2 flex items-center justify-between gap-2 w-full rounded-lg"
      >
        <span>{selected}</span>
        <IoChevronDown
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded shadow-md z-10">
          {catalogueIdentifiers.map((identier) => (
            <button
              key={identier.vendor_identifier}
              onClick={() => {
                onChange(identier);
                setOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-200 text-green-700 hover:text-black ${
                identier === selected ? "bg-gray-200 text-black" : "text-gray-700"
              }`}
            >
            <div className="flex items-center gap-2">
              <p>{identier.vendor_identifier}</p>
              <p>
                {selected === identier.vendor_identifier ? (
                    <IoIosCheckmark className="text-base" size={20} />
                ) : (
                    ""
                )}
              </p>
            </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default IdentifierDropdown;
