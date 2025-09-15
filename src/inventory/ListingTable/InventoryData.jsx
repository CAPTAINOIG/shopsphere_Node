import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import gif from "../../Images/gif.gif";
import Loader from "../../hooks/Loader";
import InventoryModal from "./InventoryModal";
import { useDisclosure, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { deleteProductFromInventory } from "../../api/authApi";
import { Image } from "@heroui/react";
import { toast, Toaster } from "sonner";

const InventoryData = () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const productsPerPage = Number(localStorage.getItem("inventorySavedProductPerPage")) || 20;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [actionDropdown, setActionDropdown] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState(productsPerPage);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [onSubmitLoader, setOnSubmitLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [checkedItems, setCheckedItems] = useState([]);
  const [viewItem, setViewItem] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [totalItems, setTotalItems] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActionDropdown(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    setLoader(true);
    axiosInstance.get(`/inventoryApp/get_all_saved_inventory_items/${userId}/${currentPage}/${entriesPerPage}`)
      .then((res) => {
        const items = res?.data?.saved_items || [];
        const parsedItems = items.map((item) => {
          if (item) {
            try {
              const itemSpecific = JSON.parse(
                item.item_specific_fields || "{}"
              );
              const marketLogos = JSON.parse(item.market_logos || "{}");
              const brand = itemSpecific?.Brand || "Unknown";
              return {
                ...item,
                parsedItemSpecific: itemSpecific,
                marketLogos,
                brand,
              };
            } catch (error) {
              return {
                ...item,
                parsedItemSpecific: {},
                marketLogos: {},
                brand: "Unknown",
              };
            }
          }
          return item;
        });
        setInventoryItems(parsedItems);
        setTotalItems(res.data.Total_count || 0);
        setTotalPages(Math.ceil(res.data.Total_count / entriesPerPage));
        setHasNextPage(
          currentPage * entriesPerPage < (res.data.Total_count || 0)
        );
        setHasPreviousPage(currentPage > 1);
        setLoader(false);
      })
      .catch((err) => {
        toast.error("Error fetching data");
        setInventoryItems([]);
        setLoader(false);
      });
  }, [currentPage, entriesPerPage]);


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleEntriesChange = (e) => {
    const value = Number(e.target.value);
    setEntriesPerPage(value);
    localStorage.setItem("inventorySavedProductPerPage", value);
    setCurrentPage(1);
  };

  const sortedUsers = [...inventoryItems].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
    }
    return 0;
  });

  const handleDelete = async (id) => {
    setDeleteLoader((prev) => ({ ...prev, [id]: true }));
    try {
      const response = await deleteProductFromInventory(id);
      const deletedItem = inventoryItems.filter((item) => item.id !== id);
      setInventoryItems(deletedItem);
      setDeleteLoader((prev) => ({ ...prev, [id]: false }));
      toast.success("Item deleted successfully");
    } catch (err) {
      setDeleteLoader((prev) => ({ ...prev, [id]: false }));
      toast.error("Failed to delete item");
    }
  };

  const filteredUsers = sortedUsers.filter((user) =>
    user.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const indexOfLastUser = currentPage * entriesPerPage;
  // const indexOfFirstUser = indexOfLastUser - entriesPerPage;
  // const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // const totalItems = Math.ceil(filteredUsers.length / entriesPerPage);

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleActionClick = (id) => {
    setActionDropdown(actionDropdown === id ? null : id);
  };

  const handleActionSelect = (userId) => {
    const selectedItem = inventoryItems.filter((item) => item.id === userId);
    setViewItem(selectedItem[0]);
    onOpen(inventoryItems);
    setActionDropdown(null);
  };

  const handleListing = (savedListingId) => {
    navigate(`/layout/listing/${savedListingId}`, {state: { isFromEdit: true }});
  };

  return (
    <div className="pb-20">
      <Toaster position="top-right" />
      <div className="overflow-x-auto p-6 mt-8 rounded-lg shadow-md bg-white mx-4 md:mx-10">
        {loader ? (
          <Loader />
        ) : inventoryItems.length > 0 ? (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h1 className="text-2xl font-bold text-gray-800">
                Saved Listings
              </h1>

              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="relative flex-grow">
                  <div className="flex items-center">
                    <label className="mr-2 text-sm text-gray-600">
                      Search:
                    </label>
                    <div className="relative flex-grow">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Search listings..."
                      />
                      {searchTerm && (
                        <button
                          onClick={handleClearSearch}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          &times;
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="mr-2 text-sm text-gray-600">Show:</label>
                  <select
                    value={entriesPerPage}
                    onChange={handleEntriesChange}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                  </select>
                  <span className="ml-2 text-sm text-gray-600">entries</span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full bg-white divide-y divide-gray-200" >
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SKU
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Marketplace
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200" ref={dropdownRef}>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user?.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Image isZoomed
                          src={user?.picture_detail}
                          alt="Product"
                          className="w-10 h-10 rounded object-cover -z-1"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user?.sku}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {user?.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${user?.start_price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user?.date_created}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={user?.marketLogos?.ebay_logo}
                          alt="Marketplace"
                          className="w-8 h-8 object-contain"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 relative">
                        {actionDropdown === user?.product_id && (
                          <div className="absolute right-12 bottom-0 mb-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => handleActionSelect(user?.id)}
                            >
                              View Details
                            </button>
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => handleListing(user?.id)}
                            >
                              Proceed to Listing
                            </button>
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                              onClick={() => handleDelete(user?.id)}
                            >
                              {deleteLoader[user?.id] ? (
                                <div className="flex items-center justify-center">
                                  <img
                                    src={gif}
                                    alt="Loading..."
                                    className="w-4 h-4"
                                  />
                                </div>
                              ) : (
                                "Delete"
                              )}
                            </button>
                          </div>
                        )}
                        <button
                          className="p-2 rounded-md hover:bg-gray-100 text-gray-600 hover:text-gray-900 z-50"
                          onClick={() => handleActionClick(user?.product_id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
              <div className="text-sm text-gray-600">
                Showing page {currentPage} of {totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-md border ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                      : "bg-white text-green-700 border-green-500 hover:bg-green-50 transition-colors duration-200"
                  } flex items-center gap-1`}
                >
                  <IoIosArrowDropleft className="text-lg" />
                  <span>Previous</span>
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-md border ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                      : "bg-white text-green-700 border-green-500 hover:bg-green-50 transition-colors duration-200"
                  } flex items-center gap-1`}
                >
                  <span>Next</span>
                  <IoIosArrowDropright className="text-lg" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center p-10 rounded-lg bg-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="mt-4 text-gray-600 font-medium text-lg">
              No Saved Listings Found
            </p>
            <p className="text-gray-500 mt-2">
              Start by creating a new listing
            </p>
          </div>
        )}

        <InventoryModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          onClose={onClose}
          viewItem={viewItem}
        />
      </div>
    </div>
  );
};

export default InventoryData;
