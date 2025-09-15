import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const InventoryPagination = ({
  pageCount,
  currentPage,
  itemsPerPage,
  totalItems,
  handleNextPage,
  handlePreviousPage,
  listingDetail,
}) => {
  return (
    <div className="flex justify-between text-xs w-full text-green-700">
      {listingDetail.length > 0 && (
        <ul className="flex space-x-2 justify-center items-center">
          {currentPage > 1 && (
            <li className="inline-block text-sm">
              <button
                className="py-1 rounded-full bg-white-500 hover:text-black text-green-700 text-sm transition-colors duration-300"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <FaChevronLeft />
              </button>
            </li>
          )}

          <div>
            Viewing{" "}
            {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} -{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
          </div>

          <li className="inline-block">
            <button
              className="py-1 rounded-full hover:text-black text-green-700 transition-colors duration-300"
              onClick={handleNextPage}
              disabled={currentPage >= totalItems / itemsPerPage}
            >
              <FaChevronRight />
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default InventoryPagination;
