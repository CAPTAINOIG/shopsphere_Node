import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { RiDeleteBin5Line, RiLayoutGridFill } from "react-icons/ri";
import { FaList, FaTh, FaThList } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import CustomPagination from "../cataloguedetails/CustomPagination";
import { Image } from "@heroui/react";
import { Tooltip } from 'antd';
import FixedCustomPagination from "./FixedCustomPagination";
import CatalogueSkeleton from "./CatalogueSkeleton";
import CatalogueGridSkeleton from "./CatalogueGridSkeleton";
import { useDeleteProduct, useGetProducts } from "./CatalogueFetch";

import {
  useFetchPageData,
  useFetchProductPageData,
} from "../hooks/useFetchPageData";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import CustomDropdown from "./Dropdown/CustomDropdown";
import { MdOutlineCancel } from "react-icons/md";
import { HiAdjustments } from "react-icons/hi";
import { IoIosCart } from "react-icons/io";
import { IoPricetag } from "react-icons/io5";

const Product = () => {
  const navigate = useNavigate();
  const store = useSelector((state) => state.vendor.productId);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const productsPerPage = Number(localStorage.getItem("selectUserProductPerPage")) || 20;
  const queryClient = useQueryClient();

  const [viewMode, setViewMode] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [page, setPage] = useState(1);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [activeProductId, setActiveProductId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectProductPerPage, setSelectProductPerPage] = useState(productsPerPage);
  const [open, setOpen] = useState(false);
  const [showActionsMobile, setShowActionsMobile] = useState(false);

  const { mutateAsync: deleteProduct } = useDeleteProduct();

  const { data, isSuccess, isLoading, isError } = useGetProducts({
    userId,
    page,
    selectProductPerPage,
    token,
    searchQuery: debouncedQuery,
    enabled: !!debouncedQuery,
  });

  const handleDelete = async (item) => {
    try {
      await deleteProduct({ token, userId, productId: item.id });
      setShowModal(false);
      queryClient.invalidateQueries([
        "getVendorProducts",
        userId,
        page,
        selectProductPerPage,
        searchQuery,
      ]);
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const userProduct = data?.results || [];
  const count = data?.count || 0;
  const hasNextPage = page * selectProductPerPage < count;
  const hasPreviousPage = page > 1;

  useFetchProductPageData({
    isSuccess,
    hasNextPage,
    userId,
    page,
    token,
    selectProductPerPage,
    searchQuery: debouncedQuery,
  });

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timerId);
  }, [searchQuery]);

  const handleNextPage = () => {
    if (hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleProductPerPageChange = async (value) => {
    const num = Number(value);
    setSelectProductPerPage(num);
    localStorage.setItem("selectUserProductPerPage", num);
    setPage(1);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(0);
  };

  const handleListing = async (product) => {
    setActiveProductId((prevId) => (prevId === product.id ? null : product.id));
    const marketplaceProductId = product.id;
    const selection = window.getSelection();
    if (selection.toString().length > 0) {
      navigator.clipboard.writeText(selection.toString());
      return;
    }
    navigate(`/layout/listing/${marketplaceProductId}`);
  };

  const stripTags = (html) => html.replace(/<[^>]*>/g, "");
  const formatPrice = (price) => {
    if (!price) return "0";
    return price.toLocaleString();
  };

  return (
    <div className="bg-[#E7F2ED] md:mx-5 min-h-screen">
      <section className="h-full ">
        <section className="sticky grid md:h-[30%] top-8 z-[1] mt-4 md:py-5 py-4">
          <div className="bg-white pb-7">
            <div className="px-6 py-4">
              <div className="flex items-center gap-4 justify-between">
                <motion.h1
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
                  className="text-2xl font-bold text-green-700 mb-3"
                >
                  Product
                </motion.h1>
                <div className="flex justify-end mb-2 md:hidden">
                  <button
                    className="flex items-center gap-2 text-[#089451] font-semibold border border-[#089451] px-3 py-1 rounded hover:bg-[#089451] hover:text-white transition"
                    onClick={() => setShowActionsMobile(!showActionsMobile)}
                  >
                    <HiAdjustments />
                    {showActionsMobile ? "Hide Actions" : "Show Actions"}
                  </button>
                </div>
              </div>

              <section
                className={`transition-all duration-300 ${!showActionsMobile ? "block" : "hidden"
                  }`}
              >
                <div className="flex justify-between items-center px-1">
                  <motion.h1
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      ease: [0.6, -0.05, 0.01, 0.99],
                    }}
                    className="text-lg font-semibold text-black mb-2 md:block hidden"
                  >
                    Vendors
                  </motion.h1>
                  <motion.h1
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      ease: [0.6, -0.05, 0.01, 0.99],
                    }}
                    className="text-lg font-semibold text-black mb-2 md:block hidden md:me-3"
                  >
                    Custom Filters
                  </motion.h1>
                </div>
                <div className="flex flex-wrap lg:flex-nowrap items-stretch lg:items-center gap-4 w-full">
                  <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    <CustomDropdown
                      selected={selectProductPerPage}
                      onChange={handleProductPerPageChange}
                      open={open}
                      setOpen={setOpen}
                    />
                  </div>

                  <div className="flex w-full lg:flex-1 rounded-md border border-gray-300 bg-gray-100 overflow-hidden">
                    <input
                      className="flex-grow px-3 py-2 bg-transparent outline-none"
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
                    <button
                      type="submit"
                      className="bg-[#089451] text-white px-4"
                    >
                      <BsSearch />
                    </button>
                  </div>

                  <div className="flex items-center bg-gray-100 rounded-lg p-1 gap-2 px-2 w-full sm:w-auto justify-between sm:justify-start">
                    <div className="flex items-center bg-gray-100 rounded-lg p-1 gap-2 px-2 w-full sm:w-auto justify-between sm:justify-start">
                      <div className="flex items-center gap-1">
                        <p className="text-sm">List</p>
                        <Tooltip title="List View">
                          <button
                            className={`p-2 rounded ${viewMode === "list"
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
                            className={`p-2 rounded ${viewMode === "grid"
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
                </div>
                <div className="justify-center pt-5">
                  {error ? (
                    <div>{error}</div>
                  ) : (
                    userProduct.length > 0 && (
                      <CustomPagination
                        pageCount={Math.ceil(count / selectProductPerPage)}
                        onPageChange={(selectedPage) => setPage(selectedPage)}
                        currentPage={page}
                        itemsPerPage={selectProductPerPage}
                        totalItems={count}
                        handleNextPage={handleNextPage}
                        handlePreviousPage={handlePreviousPage}
                      />
                    )
                  )}
                </div>
              </section>
              
            </div>
          </div>
        </section>

        <div className="py-5">
          {isLoading ? (
            <>
              {viewMode === "list" &&
                Array.from({ length: 5 }).map((_, idx) => (
                  <CatalogueSkeleton key={idx} />
                ))}
              {viewMode === "grid" && <CatalogueGridSkeleton />}
            </>
          ) : (
            <>
              {userProduct.length > 0 ? (
                <>
                  {viewMode === "list" ? (
                    <div className="text-sm">
                      {userProduct.map((product, index) => (
                        <div
                          key={index}
                          onClick={() => handleListing(product)}
                          className="flex flex-col sm:flex-row cursor-pointer justify-between p-4 gap-4 items-start w-full bg-white rounded-lg relative mb-5 hover:shadow-lg"
                        >
                          <div className="flex gap-4">
                            <div className="min-w-[120px] max-w-[170px] h-[180px] flex items-center justify-center rounded overflow-hidden bg-white border border-gray-100 p-3">
                              <Image isZoomed src={product?.image} alt={product?.title} className="object-cover min-w-[140px] max-w-[140px] h-[180px] -z-1" />
                            </div>
                            <div className="flex flex-col justify-start gap-2 text-sm flex-1">
                              <p className="text-base font-semibold text-gray-900 line-clamp-2 space">
                                {product?.desc1 || product?.model || product?.title || product?.productName || ""}
                              </p>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-600 font-bold">
                                    SKU:
                                  </span>
                                  <span className="bg-gray-200 text-xs px-2 py-1 rounded md:ms-6">
                                    {product?.sku}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-semibold text-gray-600">
                                    UPC:
                                  </span>
                                  <span className="bg-green-100 text-xs px-2 py-1 rounded md:ms-6">
                                    {product?.upc || product?.upccode || product?.upc_code || 0}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-gray-600">
                                    Category:
                                  </span>
                                  <span className="bg-blue-100 text-xs px-2 py-1 rounded">
                                    {product?.type || product?.category_name || product?.category}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-gray-600">
                                    Brand:
                                  </span>
                                  <span className="bg-yellow-100 text-xs px-2 py-1 rounded md:ms-4">
                                    {product?.brand || product?.manufacturer || product?.brandName || product?.manufacturer_name}
                                  </span>
                                </div>
                                {product?.gender && (
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-gray-600">
                                      Gender:
                                    </span>
                                    <span className="bg-purple-100 text-xs px-2 py-1 rounded md:ms-3">
                                      {product?.gender}
                                    </span>
                                  </div>
                                )}
                              </div>
                              <p className="text-gray-500 text-sm line-clamp-2">
                                {stripTags(product.title || product.model || product.productName || product.desc1 || product.description || product.description1 || product.full_description || product.detailed_description)}
                              </p>
                            </div>
                          </div>

                          <div className="w-1/4 md:mt-10 md:ms-0 ms-40 p-3 text-center text-sm flex gap-5">
                            <div className="flex flex-col items-center gap-2">
                              <div className="flex items-center text-sm text-teal-600 font-medium mb-1 gap-1">
                                <p>
                                <IoIosCart size={16} />
                                </p>
                                <p>
                                Quantity
                                </p>
                              </div>
                              <div className="bg-[#005D6833] rounded-lg p-3 min-w-[60px] flex items-center justify-center">
                                <span className="text-xl font-bold text-gray-800">{(product?.inventory_on_hand || product?.quantity || product?.quantity_available_to_ship_combined || product?.minimumorderquantity || product?.quantityAvailable || item?.minimumorderquantity || 0)}</span>
                              </div>
                            </div>

                            <div className="flex flex-col items-center gap-2">
                              <div className="flex items-center text-sm text-teal-600 font-medium mb-1 gap-1">
                                <p>
                                <IoPricetag size={16} />
                                </p>
                                <p>
                                Price
                                </p>
                              </div>
                              <div className="bg-green-600 text-white rounded-lg px-4 py-3 min-w-[60px] flex items-center justify-center">
                                <span className="text-xl font-bold">${(product.price || product.dealer_price || product.total_product_cost || product.wholesalePriceUSD || product.price1 || product.wholesale || 0)}</span>
                              </div>
                            </div>
                          </div>
                          <div className="absolute right-4 top-2 text-[#089451] cursor-pointer text-xl hover:text-red-600">
                            <RiDeleteBin5Line onClick={(e) => { setSelectedItem(product); setShowModal(true); e.stopPropagation(); }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid gap-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                      {userProduct.map((item, i) => (
                        <div
                          onClick={() => handleListing(item)}
                          key={i}
                          className={`relative cursor-pointer rounded-xl mb-5 pb-3  ${activeProductId === item.id
                              ? "shadow-lg border-2 border-[#D9E8E1] bg-white"
                              : "bg-white shadow-sm"
                            }`}
                        >
                          <div className="flex justify-between items-center">
                            <div className="text-[#089451] text-xl hover:text-red-600">
                              <RiDeleteBin5Line onClick={(e) => { setSelectedItem(item); setShowModal(true); e.stopPropagation(); }}
                              />
                            </div>
                            <p className="bg-[#027840] text-sm shadow-4xl whitespace-nowrap w-[6rem] text-white rounded-tr-xl rounded-l-[10px] text-center py-2">
                              {item?.brand ||
                                item?.brandName ||
                                item?.manufacturer ||
                                item?.manufacturer_name}
                            </p>
                          </div>
                          <div className="flex justify-center items-center w-full mt-6 mb-4">
                            <div className="h-40 w-40 flex justify-center items-center border border-gray-200 rounded-md">
                              <Image
                                isZoomed
                                src={item?.image}
                                alt="Image description"
                                className="object-cover min-w-[140px] max-w-[140px] h-[140px] rounded-md -z-1"
                              />
                            </div>
                          </div>

                          <div className="text-center mb-4 px-2">
                            <h3 className="text-sm font-medium text-gray-900 leading-tight">
                              {item?.model ||
                                item?.productName ||
                                item?.title ||
                                item?.desc1
                                ? `${(
                                  item?.model ||
                                  item?.title ||
                                  item?.productName ||
                                  item?.desc1
                                ).toLowerCase()}`
                                : ""}
                            </h3>
                          </div>

                          <div className="w-full space-y-2 mb-4">
                            <div className="bg-[#BB823233] rounded px-3 py-1.5 text-xs break-words max-w-[200px] mx-auto text-center flex justify-center items-center">
                              <span className="text-gray-600">SKU: </span>
                              <span className="text-gray-800 font-medium">
                                <p>{item?.sku || item?.itemnumber || 0}</p>
                              </span>
                            </div>

                            <div className="bg-[#00000033] rounded px-3 py-1.5 text-xs break-words max-w-[200px] mx-auto text-center flex justify-center items-center">
                              <span className="text-gray-600">Brand: </span>
                              <span className="text-gray-800 font-medium">
                                {item?.brand ||
                                  item?.brandName ||
                                  item?.manufacturer ||
                                  item?.manufacturer_name ||
                                  "N/A"}
                              </span>
                            </div>
                          </div>
                          {/* <div className="w-full space-y-1 text-sm text-center">
                            <span className="text-gray-500 text-xs font-medium">
                              Price
                            </span>
                            <div>
                              <span className="text-[#027840] font-semibold">
                                {formatPrice(item?.price || item?.dealer_price ||
                                  item?.total_product_cost ||
                                  item?.wholesalePriceUSD ||
                                  item?.price1 || 0)} -{" "}
                                {formatPrice(item?.price || item?.dealer_price ||
                                  item?.total_product_cost ||
                                  item?.wholesalePriceUSD ||
                                  item?.price1 || 0)}
                              </span>
                            </div>
                          </div>
                          <div className="w-full space-y-1 text-sm text-center">
                            <span className="text-gray-500 text-xs font-medium">
                              Quantity
                            </span>
                            <div>
                              <span className="text-[#027840] font-semibold">
                                {item?.quantity ||
                                      item?.quantity_available_to_ship_combined ||
                                      item?.quantityAvailable ||
                                      item?.inventory_on_hand ||
                                      item?.available ||
                                      item?.minimumorderquantity ||
                                      0}
                              </span>
                            </div>
                          </div>
                          <div className="w-full space-y-1 text-sm text-center">
                            <span className="text-gray-500 text-xs font-medium">
                              UPC
                            </span>
                            <div>
                              <span className="text-[#027840] font-semibold">
                                {item?.upc ??
                                        item?.upccode ??
                                        item?.upc_code ??
                                        0}
                              </span>
                            </div>
                          </div> */}

                             <div className="w-full space-y-1 text-sm text-center">
                            <div className="flex flex-col items-center gap-2">
                              <div className="flex items-center text-sm text-teal-600 font-medium mb-1 gap-1">
                                <p>
                                <IoIosCart size={16} />
                                </p>
                                <p>
                                Quantity
                                </p>
                              </div>
                              <div className="bg-[#005D6833] rounded-lg p-3 min-w-[60px] flex items-center justify-center">
                                <span className="text-sm font-bold text-gray-800">{(item?.inventory_on_hand || item?.quantity || item?.quantity_available_to_ship_combined || item?.minimumorderquantity || item?.quantityAvailable || item?.minimumorderquantity || 0)}</span>
                              </div>
                            </div>

                            <div className="flex flex-col items-center gap-2">
                              <div className="flex items-center text-sm text-teal-600 font-medium mb-1 gap-1">
                                <p>
                                <IoPricetag size={16} />
                                </p>
                                <p>
                                Price
                                </p>
                              </div>
                              <div className="bg-green-600 text-white rounded-lg px-4 py-3 min-w-[60px] flex items-center justify-center">
                                <span className="text-sm font-bold">${(item.price || item.dealer_price || item.total_product_cost || item.wholesalePriceUSD || item.price1 || item.wholesale || 0)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <p className="text-black text-xl mt-48 text-center">
                  No products available.
                </p>
              )}
            </>
          )}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                <h2 className="text-lg font-semibold mb-4">
                  Are you sure you want to delete this product?
                </h2>
                <div className="flex justify-between">
                  <button
                    onClick={() => handleDelete(selectedItem)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Yes
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
          <div>
            {userProduct.length > 0 && (
              <div className="fixed bottom-0 left-0 right-0 shadow-lg py-2 flex justify-center items-center">
                <FixedCustomPagination
                  pageCount={Math.ceil(count / selectProductPerPage)}
                  onPageChange={(selectedPage) => setPage(selectedPage)}
                  currentPage={page}
                  itemsPerPage={selectProductPerPage}
                  totalItems={count}
                  handleNextPage={handleNextPage}
                  handlePreviousPage={handlePreviousPage}
                />
              </div>
            )}
          </div>
        </div>
      </section>
      <Toaster position="top-right" />
    </div>
  );
};

export default Product;
