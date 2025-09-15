import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { format } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { setOrderId } from "../redux/vendor";
import { toast, Toaster } from "sonner";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { IoCopyOutline } from "react-icons/io5";
import FixedCustomPagination from "../cataloguedetails/FixedCustomPagination";
import axiosInstance from "../utils/axiosInstance";
import { orderProduct } from "../api/authApi";

const Order = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const ordersPerPage = Number(localStorage.getItem("orderPerPage")) || 20;

  const store = useSelector((state) => state.vendor.order);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selectedOrderPerPage, setSelectedOrderPerPage] = useState(ordersPerPage) || 20;
  const [totalItems, setTotalItems] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [page, selectedOrderPerPage]);

  const handleOrderPerPageChange = async (e) => {
    const value = Number(e.target.value);
    setSelectedOrderPerPage(value);
    localStorage.setItem("orderPerPage", value);
    setPage(1);
  };

  const handleRefresh = () => {
    fetchOrders();
  }

  const fetchOrders = async () => {
    setLoader(true);
    try {
      const res = await orderProduct(userId, page, selectedOrderPerPage);
      const rawOrders = res.order_items || [];
      function fixJSON(str) {
        if (!str || typeof str !== "string") return null;
        try {
          const fixed = str
            .replace(/'/g, '"')
            .replace(/None/g, "null")
            .replace(/\bFalse\b/g, "false")
            .replace(/\bTrue\b/g, "true");
          return JSON.parse(fixed);
        } catch (e) {
          return null;
        }
      }
      const orders = rawOrders.map((order) => {
        return {
          ...order,
          image: fixJSON(order.image),
          paymentSummary: fixJSON(order.paymentSummary),
          pricingSummary: fixJSON(order.pricingSummary),
          cancelStatus: fixJSON(order.cancelStatus),
          fulfillmentStartInstructions: fixJSON(
            order.fulfillmentStartInstructions
          ),
          itemLocation: fixJSON(order.itemLocation),
          additionalImages: fixJSON(order.additionalImages),
          buyer: fixJSON(order.buyer),
        };
      });
      setOrders(orders);
      setTotalItems(res.Total_count || 0);
      setTotalPages(Math.ceil(res.Total_count / selectedOrderPerPage));
      setHasNextPage(page * selectedOrderPerPage < (res.Total_count || 0));
      setHasPreviousPage(page > 1);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      setError("Something went wrong, please try again later");
    }
  };

  const SORT_OPTIONS = [
    { key: "quantity", label: "Quantity" },
    { key: "buyer.buyerRegistrationAddress.fullName", label: "Customer" },
    { key: "creationDate", label: "Date" },
    { key: "pricingSummary.priceSubtotal.value", label: "Total" },
    {
      key: "fulfillmentStartInstructions[0].shippingStep.shippingServiceCode",
      label: "Delivery",
    },
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  const sortedUsers = [...orders].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = getNestedValue(a, sortConfig.key) || 0;
      const bValue = getNestedValue(b, sortConfig.key) || 0;

      if (aValue < bValue) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
    }
    return 0;
  });

  const filteredUsers = sortedUsers.filter(
    (user) =>
      user?.buyer?.buyerRegistrationAddress?.fullName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user?.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.pricingSummary?.priceSubtotal?.value
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user?.listingMarketplaceId
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user?.fulfillmentStartInstructions[0]?.shippingStep?.shippingServiceCode
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const handleNextPage = () => {
    if (page < totalItems) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleRowClick = (orderId) => {
    dispatch(setOrderId(orderId));
    navigate(`/layout/orderdetails/${orderId}`);
  };

  return (
    <div className="bg-[#E7F2ED] p-5 md:mt-20 mt-10">
      <Toaster position="top-right" />
      {loader ? (
        <div className="bg-[#E7F2ED] p-5">
          <div className="overflow-x-auto p-5 rounded-lg shadow-lg mb-10 bg-white mx-5">
            <div className="flex justify-between mb-4">
              <div className="flex gap-3">
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
                <div className="h-8 w-40 bg-gray-200 rounded"></div>
              </div>
              <div className="h-8 w-32 bg-gray-200 rounded"></div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border-collapse">
                <thead>
                  <tr>
                    {Array.from({ length: 7 }).map((_, index) => (
                      <th
                        key={index}
                        className="border-b border-gray-200 px-6 py-3 text-left bg-gray-50"
                      >
                        <div className="h-4 w-20 bg-gray-200 rounded"></div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 10 }).map((_, rowIndex) => (
                    <tr key={rowIndex}>
                      {Array.from({ length: 7 }).map((_, colIndex) => (
                        <td
                          key={colIndex}
                          className="border-b border-gray-200 px-6 py-4 text-left"
                        >
                          <div className="h-4 w-full bg-gray-200 rounded"></div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex lg:flex-row md:flex-col flex-col justify-between mt-4 items-center">
              <div className="h-4 w-40 bg-gray-200 rounded"></div>
              <div className="flex gap-3 items-center">
                <div className="h-8 w-24 bg-gray-200 rounded"></div>
                <div className="h-8 w-24 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto p-4 md:p-5 rounded-lg shadow-lg mb-10 bg-white mx-2 md:mx-5">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
              <h2 className="text-2xl font-semibold text-gray-800 whitespace-nowrap">
                Order History
              </h2>
              <input
                type="text"
                placeholder="Search for Orders (ID, Name)"
                value={searchTerm}
                onChange={handleSearchChange}
                className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-full sm:w-[250px]"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {/* Sort Dropdown */}
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    className="capitalize text-black font-semibold"
                    variant="bordered"
                  >
                    {sortConfig.key
                      ? SORT_OPTIONS.find((opt) => opt.key === sortConfig.key)
                        ?.label || "Sort By"
                      : "Sort By"}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Sort selection"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={new Set([sortConfig.key])}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0];
                    handleSort(selectedKey);
                  }}
                >
                  {SORT_OPTIONS.map((option) => (
                    <DropdownItem key={option.key}>{option.label}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>

              {/* Per Page Dropdown */}
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    className="capitalize text-black font-semibold"
                    variant="bordered"
                  >
                    {selectedOrderPerPage} per page
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Per page selection"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={new Set([String(selectedOrderPerPage)])}
                  onSelectionChange={(keys) => {
                    const selectedValue = Array.from(keys)[0];
                    handleOrderPerPageChange({
                      target: { value: selectedValue },
                    });
                  }}
                >
                  {[10, 20, 40, 60, 80, 100].map((num) => (
                    <DropdownItem
                      key={String(num)}
                      textValue={`${num} items per page`}
                    >
                      {num} per page
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>

          {/* Table Container */}
          <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-[800px] w-full table-auto bg-white divide-y divide-gray-200">
              <thead className="bg-gray-50 whitespace-nowrap">
                <tr>
                  {[
                    "Order ID",
                    "Customer",
                    "Time Stamp",
                    "Status",
                    "Vendor",
                    "Unit",
                    "Total",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100 whitespace-nowrap">
                {filteredUsers.map((order) => (
                  <tr
                    key={order.orderId}
                    className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                  >
                    <td
                      className="px-6 py-4 font-medium text-green-600 relative group max-w-[150px] truncate"
                      onClick={() => handleRowClick(order.legacyOrderId)}
                    >
                      #{order.orderId}
                      <IoCopyOutline
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-green-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(order.orderId);
                          toast.success("Order ID copied!");
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 text-gray-800 font-medium relative group max-w-[180px] truncate">
                      {order?.buyer?.buyerRegistrationAddress?.fullName ||
                        "N/A"}
                      <IoCopyOutline
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-green-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(
                            order?.buyer?.buyerRegistrationAddress?.fullName
                          );
                          toast.success("Customer name copied!");
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {format(new Date(order?.creationDate), "dd.MM.yy")}{" "}
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs ml-2">
                        {format(
                          new Date(order?.creationDate),
                          "h:mm a"
                        ).toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${order.orderFulfillmentStatus?.toLowerCase() ===
                          "delivered" ||
                          order.orderFulfillmentStatus === "FULFILLED"
                          ? "bg-green-100 text-green-800"
                          : order.orderFulfillmentStatus === "Shipped"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.orderFulfillmentStatus === "Canceled"
                              ? "bg-red-100 text-red-800"
                              : order.orderFulfillmentStatus === "Completed"
                                ? "bg-teal-100 text-teal-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                      >
                        {order.orderFulfillmentStatus || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 relative group max-w-[160px] truncate">
                      {order.vendor_name || "N/A"}
                      <IoCopyOutline
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-green-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(order.vendor_name);
                          toast.success("Vendor name copied!");
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {order.quantity || "N/A"}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-800 relative group">
                      ${order?.pricingSummary?.priceSubtotal?.value || "N/A"}
                      <IoCopyOutline
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-green-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(
                            order.pricingSummary?.priceSubtotal?.value
                          );
                          toast.success("Total copied!");
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Section */}


          {!error && !loader && totalItems !== 0 && (
            <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4 w-full overflow-x-auto">
              <div className="text-sm text-gray-600">
                Showing {(page - 1) * selectedOrderPerPage + 1} to{" "}
                {Math.min(page * selectedOrderPerPage, totalItems)} of{" "}
                {totalItems}
              </div>
              <div className="flex items-center gap-x-2 flex-wrap">
                <Button
                  disabled={page === 1}
                  onClick={() => setPage(1)}
                  color="success"
                  className="text-white"
                >
                  First
                </Button>
                <FixedCustomPagination
                  pageCount={Math.ceil(totalItems / selectedOrderPerPage)}
                  onPageChange={(selectedPage) => setPage(selectedPage)}
                  currentPage={page}
                  itemsPerPage={selectedOrderPerPage}
                  totalItems={totalItems}
                  handleNextPage={handleNextPage}
                  handlePreviousPage={handlePreviousPage}
                />
                <Button
                  disabled={page === totalPages}
                  onClick={() => setPage(totalPages)}
                  color="warning"
                  className="text-white"
                >
                  Last
                </Button>
              </div>
            </div>
          )}
          {totalItems === 0 && error && (
            <div className="flex items-center justify-center w-full h-full my-3">
              <div className="bg-[#E7F2ED] p-5 rounded-lg">
                <div className="text-center">
                  <p className="text-red-600 text-lg font-semibold">Error</p>
                  <p className="text-gray-600 text-sm">
                    {error}
                  </p>
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleRefresh}>
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Order;
