import axios from "axios";
import React, { useCallback, useEffect, useState, useRef, useMemo } from "react";
import { Toaster, toast } from "sonner";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { Button, Popover } from "antd";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { ThreeDots } from "react-loader-spinner";
import { FaTrashAlt, FaTimes } from "react-icons/fa";
import AddVendorFile from "./AddVendorFile";
import { MdAccountBox } from "react-icons/md";
import { CgCalendarDates } from "react-icons/cg";
import { FaCartShopping } from "react-icons/fa6";
import { IoAdd } from "react-icons/io5";
import { LiaTimesSolid } from "react-icons/lia";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

const EditEnrollment = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [actionLoading, setActionLoading] = useState({});
  const [popoverStates, setPopoverStates] = useState({});
  const [expandedVendors, setExpandedVendors] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(() => 
    Number(localStorage.getItem("editVendorPerPage")) || 6
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState("custom");
  
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };
  const isMounted = useRef(true);

  const handleApiError = useCallback((error, defaultMessage) => {
    if (!error.response) {
      toast.error("Network error. Please check your connection.", { toastId: "network-error" });
      return;
    }
    
    const { status, data } = error.response;
    const message = data?.detail || defaultMessage;
    
    switch (status) {
      case 401:
        toast.error("Session expired. Please log in again.", { toastId: "unauthorized" });
        navigate("/login"); 
        break;
      case 403:
        toast.error("Unauthorized access", { toastId: "forbidden" });
        break;
      case 404:
        toast.error("Resource not found", { toastId: "not-found" });
        break;
      default:
        toast.error(message, { toastId: `error-${status}` });
    }
  }, [navigate]);

  useEffect(() => {
    isMounted.current = true;
    
    if (!token) {
      toast.error("Please log in to continue", { toastId: "no-token" });
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      setLoader(true);
      try {
        const response = await axios.get(
          "https://service.swiftsuite.app/api/v2/account-enrollments/",
          authHeader
        );
        console.log(response);        
        if (!isMounted.current) return;

        if (!Array.isArray(response.data) || response.data.length === 0) {
          toast.error("No enrollments found", { toastId: "no-enrollments" });
          setData([]);
          return;
        }

        const groupedData = Object.values(
          response.data.reduce((acc, item) => {
            const vendorId = item.vendor?.id;
            if (!vendorId) {
              console.warn("Skipping item with missing vendorId:", item);
              return acc;
            }
            acc[vendorId] = acc[vendorId] || { vendor: item.vendor, accounts: [] };
            acc[vendorId].accounts.push({
              id: item.id,
              name: item.name || "N/A",
              enrollments: item.enrollments || [],
            });
            return acc;
          }, {})
        );

        setData(groupedData);
      } catch (error) {
        if (!isMounted.current) return;
        handleApiError(error, "Failed to fetch enrollments");
      } finally {
        if (isMounted.current) {
          setLoader(false);
          setDataLoaded(true);
        }
      }
    };

    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, [token, navigate, handleApiError]);

  useEffect(() => {
    if (data.length > 0) {
      data.forEach((vendor, index) => {
        const hasEnrollments = vendor.accounts?.some(account => 
          account.enrollments && Array.isArray(account.enrollments) && account.enrollments.length > 0
        );
        console.log(`Vendor ${index} (${vendor.vendor?.name}): ${hasEnrollments ? 'HAS' : 'NO'} enrollments`);
      });
    }
  }, [data]);

  const formatDate = useCallback((isoDate) => {
    if (!isoDate || typeof isoDate !== "string") return "Invalid Date";
    try {
      return format(parseISO(isoDate), "dd/MM/yy");
    } catch (error) {
      console.error("Date parsing error:", error, "for date:", isoDate);
      return "Invalid Date";
    }
  }, []);

  const formatVendorName = useCallback((name) => {
    if (!name || typeof name !== "string") return name;
    const upperName = name.toUpperCase();
    if (upperName === "CWR" || upperName === "RSR" || upperName === "SSI") {
      return upperName;
    }
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }, []);

  const handleEdit = useCallback(async (enrollmentId) => {
    setActionLoading((prev) => ({ ...prev, [enrollmentId]: "editing" }));
    try {
      const { data } = await axios.get(
        `https://service.swiftsuite.app/api/v2/view-enrollment-with-identifier/${enrollmentId}/`,
        authHeader
      );

      if (!data) {
        throw new Error("No enrollment data found");
      }

      try {
        localStorage.setItem("matchedVendor", JSON.stringify(data));
        localStorage.setItem("vendor_id", data.enrollment?.vendor);
        navigate("/layout/editvendor");
      } catch (storageError) {
        console.error("Storage error:", storageError);
        toast.error("Error saving vendor data", { toastId: "storage-error" });
      }
    } catch (error) {
      handleApiError(error, "Failed to fetch enrollment details");
    } finally {
      setActionLoading((prev) => ({ ...prev, [enrollmentId]: undefined }));
    }
  }, [authHeader, handleApiError, navigate]);

  const handleDelete = useCallback(async (identifier) => {
    setActionLoading((prev) => ({ ...prev, [identifier]: "deleting" }));
    try {
      await axios.delete(
        `https://service.swiftsuite.app/api/v2/delete-enrollment/${identifier}/`,
        authHeader
      );
      
      toast.success("Enrollment deleted successfully", { toastId: "delete-success" });
      setData((prev) =>
        prev
          .map((vendor) => ({
            ...vendor,
            accounts: vendor.accounts
              .map((account) => ({
                ...account,
                enrollments: account.enrollments.filter((e) => e.identifier !== identifier),
              }))
              .filter((account) => account.enrollments.length > 0)
          }))
          .filter((vendor) => vendor.accounts.length > 0)
      );
    } catch (error) {
      handleApiError(error, "Failed to delete enrollment");
    } finally {
      setActionLoading((prev) => ({ ...prev, [identifier]: undefined }));
    }
  }, [authHeader, handleApiError]);

  const handleAccountDelete = useCallback(async (vendorId, accountId) => {
    setActionLoading((prev) => ({ ...prev, [`account-${accountId}`]: "deleting" }));
    try {
      await axios.delete(
        `https://service.swiftsuite.app/api/v2/vendor-account/${accountId}/`,
        authHeader
      );
      
      toast.success("Account deleted successfully", { toastId: "account-delete-success" });
      setData((prev) =>
        prev
          .map((vendor) =>
            vendor.vendor.id === vendorId
              ? { ...vendor, accounts: vendor.accounts.filter((account) => account.id !== accountId) }
              : vendor
          )
          .filter((vendor) => vendor.accounts.length > 0)
      );
    } catch (error) {
      handleApiError(error, "Failed to delete account");
    } finally {
      setActionLoading((prev) => ({ ...prev, [`account-${accountId}`]: undefined }));
    }
  }, [authHeader, handleApiError]);

  const togglePopover = useCallback((key) => {
    setPopoverStates((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const toggleVendor = useCallback((vendorId) => {
    setExpandedVendors((prev) => ({
      ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
      [vendorId]: !prev[vendorId],
    }));
  }, []);

  const deletePopoverContent = useCallback((deleteFunction, key, identifier) => (
    <div className="flex flex-col gap-2">
      <p>Are you sure you want to delete?</p>
      <div className="flex justify-between gap-2">
        <Button onClick={() => togglePopover(key)}>Cancel</Button>
        <Button
          danger
          onClick={() => {
            deleteFunction();
            togglePopover(key);
          }}
          disabled={actionLoading[identifier] === "deleting"}
        >
          {actionLoading[identifier] === "deleting" ? (
            <ThreeDots height="20" width="20" color="#ffffff" radius="4" ariaLabel="delete-loading" />
          ) : (
            "Delete"
          )}
        </Button>
      </div>
    </div>
  ), [actionLoading, togglePopover]);

  const handleSearchChange = useCallback((e) => {
    const sanitizedValue = e.target.value.replace(/[<>]/g, "");
    setSearchTerm(sanitizedValue);
    setCurrentPage(1);
  }, []);

  const handleEntriesChange = useCallback((e) => {
    const value = Number(e.target.value);
    setEntriesPerPage(value);
    localStorage.setItem("editVendorPerPage", value);
    setCurrentPage(1);
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => prev + 1);
  }, []);

  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  }, [currentPage]);

  const handleViewChange = useCallback((newView) => {
    setView(newView);
    setCurrentPage(1);
    setSearchTerm(""); // Reset search term when switching views
  }, []);

  // Filter data based on view and search term
  const filteredData = useMemo(() => {
    let filtered = data;

    // Apply search term filtering
    if (searchTerm) {
      filtered = filtered.filter((vendor) =>
        vendor?.vendor?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [data, searchTerm]);

  const indexOfLastVendor = currentPage * entriesPerPage;
  const indexOfFirstVendor = indexOfLastVendor - entriesPerPage;
  const currentVendors = filteredData.slice(indexOfFirstVendor, indexOfLastVendor);
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const renderPagination = () => {
    const maxButtons = 5;
    const halfButtons = Math.floor(maxButtons / 2);
    let startPage = Math.max(1, currentPage - halfButtons);
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage === totalPages) {
      startPage = Math.max(1, totalPages - maxButtons + 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex items-center gap-3">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "text-green-700"}`}
          aria-label="Go to previous page"
        >
          <GrPrevious className="mb-[1px]"/>
          <span>Previous</span>
        </button>

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 ${
              currentPage === page
                ? "border"
                : " text-black"
            }`}
            aria-label={`Go to page ${page}`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "text-green-700"}`}
          aria-label="Go to next page"
        >
          <span>Next</span>
          <GrNext className="mb-[1px]"/>
        </button>
      </div>
    );
  };

  return (
    <div className="bg-white p-5 md:mt-20 mt-16 h-screen">
      <div className="flex lg:flex-row md:flex-row flex-col justify-between mb-4 items-center">
        <div className="flex gap-2 mb-2 md:mb-0">
          <button
            className={view === "custom" ? "bg-[#027840] text-white px-2 py-1 rounded flex items-center gap-2" : "text-black px-2 rounded border flex items-center gap-2"}
            onClick={() => handleViewChange("custom")}
          >
            <span><FaCartShopping /></span>
            Custom Vendors
          </button>
          <button
            className={view === "all" ? "bg-[#BB8232] text-white px-2 py-1 rounded flex items-center gap-2" : "text-black px-2 rounded border flex items-center gap-2"}
            onClick={() => handleViewChange("all")}
          >
            <span><CiEdit /></span>
            Edit Vendors
          </button>
        </div>
        <div className="relative">
          <label htmlFor="search" className="mr-2">
            Search:
          </label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border px-2 py-1 text-black outline-none"
            placeholder="Search vendors"
            aria-label="Search vendors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              aria-label="Clear search"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      {loader ? (
        <div className="animate-pulse">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mt-3">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-[8px] p-7 flex flex-col"
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-36 bg-gray-200 rounded"></div>
                  <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
                </div>
                <div className="h-20"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="py-5 mb-10 bg-white">
          {view === "custom" && (
            <div className="space-y-4">
              <AddVendorFile vendorNames={filteredData.map(vendor => vendor.vendor.name)} searchTerm={searchTerm} />
            </div>
          )}

          {view === "all" && (
            <div className="space-y-4">
              {currentVendors.length > 0 ? (
                currentVendors.map((vendor) => {
                  const enrollmentDates = vendor.accounts
                    .flatMap((account) => account.enrollments.map((e) => e.created_at))
                    .filter((date) => date && typeof date === "string");
                  const earliestDate = enrollmentDates.length > 0 ? enrollmentDates.sort()[0] : null;
                  const formattedDate = earliestDate ? formatDate(earliestDate) : "N/A";

                  return (
                    <div key={vendor.vendor.id} className="w-full">
                      <button
                        onClick={() => toggleVendor(vendor.vendor.id)}
                        className="w-full  p-2 border border-gray-300 rounded-lg mb-2"
                        aria-label={`Toggle details for ${vendor.vendor.name}`}
                      >
                        <div className="w-full flex justify-between gap-0 items-center">
                          <div className="flex items-center w-1/4">
                            {vendor.vendor?.logo ? (
                              <div className="rounded-lg overflow-hidden w-[70px] h-8">
                                <img
                                  src={vendor.vendor.logo}
                                  alt={`${vendor.vendor.name} logo`}
                                  className="w-full h-full object-contain"
                                  onError={(e) => {
                                    e.target.src = "/fallback-logo.png";
                                  }}
                                />
                              </div>
                            ) : (
                              <div className="w-[100px] h-8 bg-gray-200 rounded-lg" />
                            )}
                            <span className="text-sm font-semibold ml-2 truncate">{formatVendorName(vendor.vendor.name)}</span>
                          </div>
                          <div className="flex justify-center w-1/4">
                            <div className="flex gap-1 bg-[#BB823233] py-1 px-2 rounded-[8px] text-[#005D6899]">
                              <span className="text-sm text-black">Enrolled on:</span>
                              <CgCalendarDates className="text-xl text-[#005D6899]" />
                              <span>{formattedDate}</span>
                            </div>
                          </div>
                          <div className="flex justify-center w-1/4">
                            <span className="text-sm bg-[#005D6833] py-1 px-2 rounded-[8px] font-semibold">
                              Accounts found: ({vendor.accounts.length})
                            </span>
                          </div>
                          <div className="flex justify-end w-1/4">
                            {expandedVendors[vendor.vendor.id] ? (
                              <LiaTimesSolid />
                            ) : (
                              <IoAdd className="text-[17px] font-bold" />
                            )}
                          </div>
                        </div>
                      </button>
                      {expandedVendors[vendor.vendor.id] && (
                        <div className="p-4">
                          <div className="rounded-xl">
                            {vendor.accounts.map((account) => (
                              <div key={account.id}>
                                <div className="flex items-center justify-between px-3 mb-5">
                                  <div>
                                    <div className="font-semibold">Account</div>
                                    <div className="flex items-center gap-2 bg-[#005D6833] p-1 rounded-[8px] font-semibold">
                                      <MdAccountBox className="text-xl" />
                                      {account.name || "N/A"}
                                    </div>
                                  </div>
                                  <div className="py-1 px-2 rounded-[10px] bg-[#BB823233] flex items-center gap-1 text-[#005D6899] mt-5">
                                    <span className="text-black font-semibold">Enrolled on:</span>
                                    <CgCalendarDates className="text-xl text-[#005D6899]" />
                                    <span>{account.enrollments[0] ? formatDate(account.enrollments[0].created_at) : "N/A"}</span>
                                  </div>
                                  <div className="w-[200px] text-center">
                                    <Popover
                                      content={deletePopoverContent(
                                        () => handleAccountDelete(vendor.vendor.id, account.id),
                                        `account-${account.id}`,
                                        `account-${account.id}`
                                      )}
                                      title="Confirm Delete Account"
                                      trigger="click"
                                      open={popoverStates[`account-${account.id}`]}
                                      onOpenChange={() => togglePopover(`account-${account.id}`)}
                                    >
                                      <button
                                        className="px-3 py-2 bg-[#A71A1D] text-sm text-white rounded-[8px] flex items-center gap-1 mx-auto mt-5"
                                        disabled={actionLoading[`account-${account.id}`] === "deleting"}
                                        aria-label={`Delete account ${account.name || "N/A"}`}
                                      >
                                        <FaTrashAlt className="mb-[1px]" />
                                        <span>Delete</span>
                                      </button>
                                    </Popover>
                                  </div>
                                </div>
                                <div className="flex flex-col border p-3 rounded-[24px] shadow">
                                  <div className="font-semibold">Identifiers</div>
                                  {account.enrollments.map((enrollment) => (
                                    <div
                                      key={enrollment.id}
                                      className="flex items-center justify-between py-2"
                                    >
                                      <span className="w-[200px] mx-5">
                                        {enrollment.identifier || "N/A"}
                                      </span>
                                      <span className="w-[200px] flex items-center gap-2 bg-[#BB823233] text-[#005D6899] p-1 px-2 rounded-[8px]">
                                        <span className="text-black font-semibold">Enrolled on:</span>
                                        <CgCalendarDates className="text-xl" />
                                        <span>{formatDate(enrollment.created_at)}</span>
                                      </span>
                                      <div className="w-[200px] flex justify-center space-x-2">
                                        <button
                                          onClick={() => handleEdit(enrollment.identifier)}
                                          className="px-2 py-2 text-sm rounded-[8px] bg-[#027840] w-[60px] text-white flex items-center gap-1"
                                          disabled={actionLoading[enrollment.identifier] === "editing"}
                                          aria-label={`Edit enrollment ${enrollment.identifier}`}
                                        >
                                          {actionLoading[enrollment.identifier] === "editing" ? (
                                            <ThreeDots
                                              height="12"
                                              width="20"
                                              color="#ffffff"
                                              radius="4"
                                              ariaLabel="edit-loading"
                                            />
                                          ) : (
                                            <>
                                              <CiEdit />
                                              <span>Edit</span>
                                            </>
                                          )}
                                        </button>
                                        <Popover
                                          content={deletePopoverContent(
                                            () => handleDelete(enrollment.identifier),
                                            `enrollment-${enrollment.id}`,
                                            enrollment.identifier
                                          )}
                                          title="Confirm Delete"
                                          trigger="click"
                                          open={popoverStates[`enrollment-${enrollment.id}`]}
                                          onOpenChange={() => togglePopover(`enrollment-${enrollment.id}`)}
                                        >
                                          <button
                                            className="px-2 py-2 bg-[#A71A1D] text-white text-sm rounded-[8px] flex items-center gap-1"
                                            disabled={actionLoading[enrollment.identifier] === "deleting"}
                                            aria-label={`Delete enrollment ${enrollment.identifier}`}
                                          >
                                            <FaTrashAlt />
                                            <span>Delete</span>
                                          </button>
                                        </Popover>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-gray-700 py-10">No vendors found.</p>
              )}
            </div>
          )}

          {view === "all" && currentVendors.length > 0 && (
            <div className="flex justify-between mt-4 items-center">
              <div className={`${currentPage === 1 ? "text-gray-400" : "text-green-700"}`}>
                Showing {currentPage} of {totalPages} Vendors
              </div>
              <div className="flex gap-3 items-center">
                {renderPagination()}
              </div>
            </div>
          )}
        </div>
      )}
      <Toaster position="top-right"/>
    </div>
  );
};

export default EditEnrollment;