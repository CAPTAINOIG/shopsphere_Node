import React, { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaTh, FaList, FaThList } from "react-icons/fa";
import { Tooltip } from "antd";
import InventoryData from "./ListingTable/InventoryData";
import { RiDeleteBin5Line, RiLayoutGridFill } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { MdOutlineCalendarViewMonth, MdOutlineCancel } from "react-icons/md";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import EditInventoryModal from "./EditInventoryModal";
import gif from "../Images/gif.gif";
import { Toaster, toast } from "sonner";
import Loader from "../hooks/Loader";
import InventoryPagination from "./InventoryPagination";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CustomDropdown from "../cataloguedetails/Dropdown/CustomDropdown";
import axiosInstance from "../utils/axiosInstance";
import { deleteProduct } from "../api/authApi";

const Inventory = () => {
  const token = localStorage.getItem("token");
  const productsPerPage =
    Number(localStorage.getItem("inventoryProductPerPage")) || 20;

  const inventoryRef = useRef();

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [listingDetail, setlistingDetail] = useState([]);
  const [loader, setLoader] = useState(false);
  const userId = localStorage.getItem("userId");
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [inventoryEdit, setInventoryEdit] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [count, setCount] = useState(false);
  const [selectedProductPerPage, setSelectedProductPerPage] =
    useState(productsPerPage);
  const [pageCount, setPageCount] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLoader(true);
    axiosInstance.get(`/inventoryApp/get_all_inventory_items/${userId}/${page}/${selectedProductPerPage}`)
      .then((res) => {
        console.log(res);
        const items = res?.data?.Inventory_items || [];
        const parsedItems = items.map((item) => {
          if (item) {
            let itemSpecific = [];
            let marketLogos = {};
            let brand = "Unknown";
            let upc = "N/A";
            try {
              const rawField = item.item_specific_fields || "[]";
              const fixedField = rawField.replace(/'/g, '"');
              itemSpecific = JSON.parse(fixedField);
              brand =
                itemSpecific.find((field) => field.name === "Brand")?.value ||
                "Unknown";
              upc =
                itemSpecific.find((field) => field.name === "UPC")?.value ||
                "N/A";
            } catch (error) {}
            try {
              marketLogos = JSON.parse(item.market_logos || "{}");
            } catch (error) {}
            
            return {
              ...item,
              parsedItemSpecific: itemSpecific,
              marketLogos,
              brand,
              upc,
            };
          }
          return item;
        });

        setlistingDetail(parsedItems);
        setCount(res.data.Total_count || 0);
        setPageCount(Math.ceil(res.data.Total_pages / selectedProductPerPage));
        setHasNextPage(
          page * selectedProductPerPage < (res.data.Total_count || 0)
        );
        setHasPreviousPage(page > 1);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error fetching data");
        setlistingDetail([]);
        setLoader(false);
      });
  }, [page, selectedProductPerPage]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = listingDetail.filter(
    (item) =>
      (item?.upc &&
        item?.upc.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item?.sku && item?.sku.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleProductPerPageChange = async (value) => {
    const num = Number(value);
    setSelectedProductPerPage(num);
    localStorage.setItem("inventoryProductPerPage", num);
    setPage(1);
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (hasPreviousPage && page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "list" ? "grid" : "list");
  };

  const handleDelete = async (id, endOnEbay = false) => {
    setShowModal(false);
    setDeleteLoader((prev) => ({ ...prev, [id]: true }));
    try {
      await deleteProduct(userId, id, endOnEbay);
      setDeleteLoader((prev) => ({ ...prev, [id]: false }));
      setlistingDetail(listingDetail.filter((item) => item.id !== id));
      toast.success("Item deleted successfully");
    } catch (err) {
      setDeleteLoader((prev) => ({ ...prev, [id]: false }));
      toast.error("Failed to delete item");
    }
  };

  const handleEditInventory = (inventoryId) => {
    navigate(`/layout/listing/${inventoryId}`, {
      state: { isFromUpdate: true },
    });
  };

  const handleInventoryDetail = (item) => {
    localStorage.setItem("inventoryDetail", JSON.stringify(item));
    navigate("/layout/inventory/detail");
  };

  return (
    <div className="bg-[#E7F2ED] px-4">
      <Toaster position="top-right" />
      <section
        id="headerSection"
        className="sticky grid rounded mx-auto px-4 sm:px-6 z-10 md:h-[20%] top-14 bg-white py-3"
      >
        <motion.h1
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
          className="text-xl sm:text-2xl font-bold text-green-700 mb-3"
        >
          Inventory
        </motion.h1>

        <div className="flex flex-col sm:flex-row sm:gap-6 gap-3 w-full">
          <div className="flex w-full sm:w-auto">
            <CustomDropdown
              selected={selectedProductPerPage}
              onChange={handleProductPerPageChange}
              open={open}
              setOpen={setOpen}
            />
          </div>

          <div className="flex w-full rounded-md border border-gray-300 bg-gray-100 overflow-hidden">
            <input
              className="flex-grow px-3 py-2 bg-transparent outline-none text-sm"
              type="text"
              placeholder="Search for products by keyword, SKU, UPC, MPN..."
              value={searchQuery}
              onChange={handleSearch}
            />
            {searchQuery.length > 0 && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-[#089451] hover:text-red-600 px-2"
              >
                <MdOutlineCancel size={20} />
              </button>
            )}
            <button type="submit" className="bg-[#089451] text-white px-4">
              <BsSearch />
            </button>
          </div>

          <div className="flex w-full sm:w-auto items-center bg-gray-100 rounded-lg p-1 gap-3 justify-between sm:justify-start">
            <div className="flex items-center gap-1">
              <p className="text-sm">List</p>
              <Tooltip title="List View">
                <button
                  className={`p-2 rounded ${
                    viewMode === "list"
                      ? "bg-white text-green-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => setViewMode("list")}
                  aria-label="Switch to List View"
                >
                  <FaThList size={16} />
                </button>
              </Tooltip>
            </div>

            <div className="flex items-center gap-1">
              <p className="text-sm">Grid</p>
              <Tooltip title="Grid View">
                <button
                  className={`p-2 rounded ${
                    viewMode === "grid"
                      ? "bg-white text-green-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => setViewMode("grid")}
                  aria-label="Switch to Grid View"
                >
                  <RiLayoutGridFill size={16} />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between mt-4 gap-3">
          <div className="text-green-600 font-semibold hover:text-green-900 cursor-pointer py-2 rounded">
            <InventoryPagination
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
              listingDetail={listingDetail}
              currentPage={page}
              pageCount={pageCount}
              totalItems={count}
              itemsPerPage={selectedProductPerPage}
            />
          </div>
          <div className="flex items-center">
            <Button
              onClick={() => {
                inventoryRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="capitalize text-green-700 font-semibold"
              variant="bordered"
              color="success"
            >
              View Saved Listings
            </Button>
          </div>
        </div>
      </section>

      <div className="mt-12">
        {loader ? (
          <div className="overflow-x-auto p-10 mt-20 shadow-lg relative bg-white mx-10">
            <Loader />
          </div>
        ) : filteredData && filteredData.length > 0 ? (
          <>
            {viewMode === "list" && (
              <div className="space-y-6 p-4 bg-[#f3f8f6]">
                {filteredData.map((item) => (
                  <div
                    key={item.id}
                    className="relative flex flex-row rounded-xl overflow-hidden bg-white shadow-sm"
                  >
                    <div className="flex items-center justify-center p-5 w-[20%]">
                      <Image
                        isZoomed
                        src={
                          item?.picture_detail
                            ? item?.picture_detail
                            : "NoImage"
                        }
                        alt={item?.title ? item?.title : "N/A"}
                        className="w-24 h-24 object-cover rounded-md -z-1"
                      />
                    </div>
                    <div className="w-[22%] bg-[#e6f0eb] p-3 flex flex-col justify-center">
                      <div className="mb-3">
                        <h3 className="text-center font-medium text-sm">
                          Title
                        </h3>
                        <p className="text-center text-sm">
                          {item?.title || "N/A"}
                        </p>
                      </div>
                      <div className="mb-3">
                        <h3 className="text-center font-medium text-sm">
                          Minimum Profit Margin
                        </h3>
                        <p className="text-center text-sm">
                          {item?.min_profit_mergin || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="w-[58%] p-3">
                      <h3 className="font-medium text-base mb-2">
                        {item?.title || "Fendi XL latest female Handbag"}
                      </h3>
                      <div className="grid grid-cols-2 gap-y-1 text-sm">
                        <div className="flex">
                          <p className="font-medium w-16">Price:</p>
                          <p className="text-[#e6967a]">
                            {item?.price &&
                            item.price !== "null" &&
                            item.price !== "Null"
                              ? item.price
                              : "N/A"}
                          </p>
                        </div>
                        <div className="flex">
                          <p className="font-medium w-24">Fixed Markup:</p>
                          <p>{item?.fixed_markup || "N/A"}</p>
                        </div>
                        <div className="flex">
                          <p className="font-medium w-16">SKU:</p>
                          <p>{item?.sku || "N/A"}</p>
                        </div>
                        <div className="flex">
                          <p className="font-medium w-24">UPC:</p>
                          <p>{item?.upc || "N/A"}</p>
                        </div>
                        <div className="flex">
                          <p className="font-medium w-16">Shipping:</p>
                          <div>
                            <span>
                              {item?.shipping_cost
                                ? item?.shipping_cost
                                : "N/A"}
                            </span>
                          </div>
                        </div>
                        <div className="flex">
                          <p className="font-medium w-24">Brand:</p>
                          <p>{item?.brand || "N/A"}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-2">
                        {item?.marketLogos?.ebay_logo && (
                          <p>
                            <img
                              src={item?.marketLogos?.ebay_logo}
                              alt="eBay"
                              className="w-20 h-10"
                            />
                          </p>
                        )}
                        {item?.marketLogos?.shopify_logo && (
                          <p>
                            <img
                              src={item?.marketLogos?.shopify_logo}
                              alt="Shopify"
                              className="w-20 h-10"
                            />
                          </p>
                        )}
                        {item?.marketLogos?.amazon_logo && (
                          <p>
                            <img
                              src={item?.marketLogos?.amazon_logo}
                              alt="Amazon"
                              className="w-20 h-10"
                            />
                          </p>
                        )}
                        {item?.marketLogos?.walmart_logo && (
                          <p>
                            <img
                              src={item?.marketLogos?.walmart_logo}
                              alt="Walmart"
                              className="w-20 h-10"
                            />
                          </p>
                        )}
                        <p>
                          {item?.marketLogos?.woocommerce_logo && (
                            <img
                              src={item?.marketLogos?.woocommerce_logo}
                              alt="WooCommerce"
                              className="w-20 h-10"
                            />
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-3 px-5">
                      <div className=" text-[#089451] text-xl cursor-pointer">
                        <CiEdit onClick={() => handleEditInventory(item.id)} />
                      </div>
                      <div
                        className=" text-[#089451] text-xl cursor-pointer"
                        onClick={() => {
                          setSelectedItemId(item?.id);
                          setShowModal(true);
                        }}
                      >
                        {deleteLoader[item?.id] ? (
                          <img
                            src={gif}
                            alt="Loading..."
                            className="w-[25px] mx-auto"
                          />
                        ) : (
                          <RiDeleteBin5Line className="hover:text-red-600" />
                        )}
                      </div>
                      <div
                        className=" text-[#089451] text-xl cursor-pointer"
                        onClick={() => handleInventoryDetail(item)}
                      >
                        <Tooltip placement="top" title="View Inventory Details">
                          <MdOutlineCalendarViewMonth />
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {showModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
                  <h2 className="text-lg font-semibold mb-4">
                    Do you also want to end the listing on eBay?
                  </h2>
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => handleDelete(selectedItemId, true)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Yes, End on eBay
                    </button>
                    <button
                      onClick={() => handleDelete(selectedItemId, false)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    >
                      No, Just Delete
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {filteredData && filteredData.length > 0 && viewMode === "grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-[#f3f8f6]">
                {filteredData.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col bg-[#f3f8f6] rounded-lg overflow-hidden"
                  >
                    <div className="relative bg-white p-4">
                      <div className="absolute top-2 left-2 bg-[#e6f0eb] px-2 py-0.5 rounded text-xs">
                        {item?.sku || "N/A"}
                      </div>
                      </div>
                      <div className="flex items-center justify-center p-5 w-full bg-white">
                      <Image isZoomed
                        src={item?.picture_detail || "/default-bag.jpg"}
                        alt={item?.title || "Product"}
                        className="h-32 object-contain -z-1"
                        />
                      </div>

                    <div className="p-2 bg-white">
                      <h3 className="text-sm font-medium mb-1">
                        {item?.title || "N/A"}
                      </h3>

                      <div className="text-xs mb-1">
                        <p className="text-gray-500 mb-0.5">SKU</p>
                        <p>{item?.sku || "N/A"}</p>
                      </div>

                      <div className="text-xs mb-1">
                        <p className="text-gray-500 mb-0.5">Brand</p>
                        <p>{item?.brand || "N/A"}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 text-xs bg-[#e6f0eb] p-2">
                      <div className="text-center">
                        <p className="font-medium mb-0.5">Fixed Markup</p>
                        <p>{item?.fixed_markup || "N/A"}</p>
                      </div>

                      <div className="text-center">
                        <p className="font-medium mb-0.5">
                          Minimum Profit margin
                        </p>
                        <p>{item?.min_profit_mergin || "N/A"}</p>
                      </div>

                      <div className="text-center col-span-1 mt-1">
                        <p className="font-medium mb-0.5">MAP</p>
                        <p>{item?.map || "N/A"}</p>
                      </div>

                      <div className="text-center col-span-1 mt-1">
                        <p className="font-medium mb-0.5">PRICE</p>
                        <p className="text-[#e6967a]">
                          {item?.price &&
                          item.price !== "null" &&
                          item.price !== "Null"
                            ? item.price
                            : "N/A"}
                        </p>
                      </div>

                      <div className="text-center col-span-1 mt-1">
                        {item?.sale_price && (
                          <div className="flex justify-center items-center">
                            <div className="h-2 w-2 rounded-full bg-red-500 mr-1"></div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-2 bg-white">
                      <div className="flex justify-center space-x-3 mb-2">
                        <div className="text-[#089451] text-xl cursor-pointer">
                          <Tooltip
                            placement="top"
                            title="View Inventory Details"
                            onClick={() => handleInventoryDetail(item)}
                          >
                            <MdOutlineCalendarViewMonth />
                          </Tooltip>
                        </div>
                        <div
                          className="text-[#089451] text-xl cursor-pointer"
                          onClick={() => handleEditInventory(item.id)}
                        >
                          <CiEdit />
                        </div>
                        <div
                          className="text-[#089451] text-xl cursor-pointer"
                          onClick={() => {
                            setSelectedItemId(item?.id);
                            setShowModal(true);
                          }}
                        >
                          {deleteLoader[item?.id] ? (
                            <img
                              src={gif}
                              alt="Loading..."
                              className="w-[15px] mx-auto"
                            />
                          ) : (
                            <RiDeleteBin5Line />
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-2">
                        {item?.marketLogos?.ebay_logo && (
                          <p>
                            <img
                              src={item?.marketLogos?.ebay_logo}
                              alt="eBay"
                              className="w-20 h-10"
                            />
                          </p>
                        )}
                        {item?.marketLogos?.shopify_logo && (
                          <p>
                            <img
                              src={item?.marketLogos?.shopify_logo}
                              alt="Shopify"
                              className="w-20 h-10"
                            />
                          </p>
                        )}
                        {item?.marketLogos?.amazon_logo && (
                          <p>
                            <img
                              src={item?.marketLogos?.amazon_logo}
                              alt="Amazon"
                              className="w-20 h-10"
                            />
                          </p>
                        )}
                        {item?.marketLogos?.walmart_logo && (
                          <p>
                            <img
                              src={item?.marketLogos?.walmart_logo}
                              alt="Walmart"
                              className="w-20 h-10"
                            />
                          </p>
                        )}
                        <p>
                          {item?.marketLogos?.woocommerce_logo && (
                            <img
                              src={item?.marketLogos?.woocommerce_logo}
                              alt="WooCommerce"
                              className="w-20 h-10"
                            />
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center  mt-5 p-6 rounded-lg">
            <p className="text-black font-semibold text-lg text-center my-5">
              No Products Found
            </p>
          </div>
        )}
      </div>
      <EditInventoryModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        useDisclosure={useDisclosure}
        onClose={onClose}
        inventoryEdit={inventoryEdit}
        setInventoryEdit={setInventoryEdit}
        token={token}
        userId={userId}
      />
      <div ref={inventoryRef} style={{ scrollMarginTop: "120px" }}>
        <InventoryData />
      </div>
    </div>
  );
};

export default Inventory;
