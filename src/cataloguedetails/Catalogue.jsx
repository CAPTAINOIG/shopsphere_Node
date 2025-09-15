import React, { useEffect, useMemo, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import CustomPagination from "../cataloguedetails/CustomPagination";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import { FaThList } from "react-icons/fa";
import { RiLayoutGridFill } from "react-icons/ri";
import { Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setProduct, setProductId } from "../redux/vendor";
import Productmodal from "../cataloguedetails/Productmodal";
import Enrolmentmodal from "../cataloguedetails/Enrolmentmodal";
import Displaycatalogue from "./Displaycatalogue";
import AdvanceSearch from "./filterpage/AdvanceSearch";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FiShoppingBag } from "react-icons/fi";
import { MdOutlineCancel, MdOutlineDelete } from "react-icons/md";
import gif from "../Images/gif.gif";
import FixedCustomPagination from "./FixedCustomPagination";
import { useGetVendorProducts } from "./CatalogueFetch";
import { useFetchPageData } from "../hooks/useFetchPageData";
import { Switch } from "@nextui-org/react";
import { motion } from "framer-motion";
import { HiAdjustments } from "react-icons/hi";
import CustomDropdown from "./Dropdown/CustomDropdown";
import VendorDropdown from "./Dropdown/VendorDropdown";
import IdentifierDropdown from "./Dropdown/IdentifierDropdown";
import { addAllProducts, fetchVendorEnrolled, productClickRequest, productUpdateRequest } from "../api/authApi";
import axiosInstance from "../utils/axiosInstance";

const Catalogue = () => {
  const queryClient = useQueryClient();
  const store = useSelector((state) => state?.vendor?.productId);
  const storeProduct = useSelector(
    (state) => state?.vendor?.selectedProductName
  );
  const userId = localStorage.getItem("userId");
  const handleCatalogue = useSelector(
    (state) => state?.vendor?.catalogueVendor
  );
  const productsPerPage =
    Number(localStorage.getItem("selectedProductPerPage")) || 20;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dropdownRef = useRef(null);
  const advanceSearchButtonRef = useRef(null);

  const [productChange, setProductChange] = useState("all");
  const [endpoint, setEndpoint] = useState("");
  const [filter, setFilter] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [currentItems, setCurrentItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("list");
  const [editableValue, setEditableValue] = useState("");
  const [allIdentifiers, setAllIdentifiers] = useState([]);
  const [selectedProductCatalogue, setSelectedProductCatalogue] = useState(null);
  const [closeDetail, setCloseDetail] = useState(false);
  const [selectProductcontd, setSelectProductcontd] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [isProductSelected, setIsProductSelected] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [enrolledVendors, setEnrolledVendors] = useState([]);
  const [open, setOpen] = useState(false);
  const [openVendor, setOpenVendor] = useState(false);
  const [openIdentifier, setOpenIdentifier] = useState(false);
  const [paginationContext, setPaginationContext] = useState("vendor");
  const [selectedProductPerPage, setSelectedProductPerPage] = useState(productsPerPage);
  const [filterApplied, setFilterApplied] = useState(false);
  const [selectedVendorIdentifier, setSelectedVendorIdentifier] = useState(null);
  const [loader, setLoader] = useState(false);
  const [selectProduct, setSelectProduct] = useState({
    category: "",
    brand: "",
    price: "",
    model: "",
    title: "",
    quantity: "",
    mpn: "",
    msrp: "",
    user: "",
    sku: "",
    upc: "",
    detailed_description: "",
    shipping_width: "",
    shipping_height: "",
    shipping_weight: "",
  });
  const [editingUser, setEditingUser] = useState(null);
  const [currentModal, setCurrentModal] = useState(null);
  const [formFilters, setFormFilters] = useState({
    upc: "",
    msrp: "",
    minmsrp: "",
    maxmsrp: "",
    minquantity: "",
    maxquantity: "",
    minprice: "",
    maxprice: "",
    brandName: "",
    minsize: "",
    maxsize: "",
    sku: "",
    mapprice: "",
    manufacturer: "",
  });
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [toggling, setToggling] = useState(false);
  const [multiSelect, setMultiSelect] = useState(false);
  const [showActionsMobile, setShowActionsMobile] = useState(false);

  const baseURL = axiosInstance.defaults.baseURL;

  const catalogue = useMemo(
    () => [
      {
        id: 1,
        endpoint: `${baseURL}/api/v2/catalogue-all/${userId}/?page=${page}`,
        name: "all",
        endpointName: "All",
      },
      ...enrolledVendors.map((vendor, index) => {
        const isSpecialVendor = ["cwr", "rsr", "ssi"].includes(
          vendor.toLowerCase()
        );
        return {
          id: index + 2,
          endpoint: `${baseURL}/api/v2/catalogue-${vendor.toLowerCase()}/${userId}/?page=${page}`,
          name: vendor.toLowerCase(),
          endpointName: isSpecialVendor
            ? vendor.toUpperCase()
            : vendor.charAt(0).toUpperCase() + vendor.slice(1),
        };
      }),
    ],
    [enrolledVendors, userId, page]
  );

  useEffect(() => {
    if (selectedVendor) {
      setProductChange(selectedVendor.name);
    }
  }, [selectedVendor]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        advanceSearchButtonRef.current &&
        !advanceSearchButtonRef.current.contains(event.target)
      ) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setFilterOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    getVendorEnrolled();
  }, []);

  const getVendorEnrolled = async () => {
    try {
      const response = await fetchVendorEnrolled();
      setEnrolledVendors(response.vendors || []);
    } catch (err) {
      setError("Failed to fetch enrolled vendors");
    }
  };

  const { data, isLoading, isSuccess, isError } = useGetVendorProducts({
    userId,
    productChange,
    catalogue,
    page,
    token,
    selectedProductPerPage,
    paginationContext,
    formFilters: filterApplied ? formFilters : {},
    searchQuery: debouncedQuery,
    selectedIdentifier: selectedProductCatalogue,
    filter,
  });

  const catalogueProduct = data?.products || [];
  const catalogueIdentifiers = data?.identifiers || [];
  const count = data?.count || 0;
  const hasNextPage = page * selectedProductPerPage < count;
  const hasPreviousPage = page > 1;

  // const selectedIdentifier = useMemo(
  //   () => [...selectedVendorIdentifiersKey][0],
  //   [selectedVendorIdentifiersKey]
  // );
  // const selectedVendorIdentifier = useMemo(
  //   () =>
  //     catalogueIdentifiers.find(
  //       (v) => v.vendor_identifier === selectedIdentifier
  //     ),
  //   [catalogueIdentifiers, selectedIdentifier]
  // );

  //     useEffect(() => {
  //       if (isSuccess && catalogueIdentifiers.length > 0) {
  //         const firstId = catalogueIdentifiers[0].vendor_identifier;
  //         console.log(firstId);
  //     const identifierExists = catalogueIdentifiers.some(
  //       (id) => id.vendor_identifier === selectedProductCatalogue
  //     );

  //     if (!identifierExists && productChange !== "all") {
  //       setSelectedProductCatalogue(firstId);
  //       dispatch(setProduct(firstId));
  //       setSelectedVendorIdentifier(firstId);
  //       setPaginationContext("identifier");
  //       setPage(1);
  //     } else if (productChange !== "all") {
  //       setSelectedVendorIdentifier(new Set([selectedProductCatalogue]));
  //     }
  //   }
  // }, [
  //   isSuccess,
  //   catalogueIdentifiers,
  //   productChange,
  //   selectedProductCatalogue,
  //   dispatch,
  // ]);

  useEffect(() => {
    if (isSuccess && catalogueIdentifiers.length > 0) {
      const firstIdentifier = catalogueIdentifiers[0];
      const identifierExists = catalogueIdentifiers.some(
        (id) => id.vendor_identifier === selectedProductCatalogue
      );
      if (!identifierExists && productChange !== "all") {
        setSelectedProductCatalogue(firstIdentifier.vendor_identifier);
        dispatch(setProduct(firstIdentifier.vendor_identifier));
        setSelectedVendorIdentifier(firstIdentifier);
        setPaginationContext("identifier");
        setPage(1);
      } else if (productChange !== "all") {
        const matched = catalogueIdentifiers.find(
          (id) => id.vendor_identifier === selectedProductCatalogue
        );
        if (matched) {
          setSelectedVendorIdentifier(matched);
        }
      }
    }
  }, [
    isSuccess,
    catalogueIdentifiers,
    productChange,
    selectedProductCatalogue,
    dispatch,
  ]);

  useEffect(() => {
    if (isSuccess && data) {
      setFilter(true);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchQuery]);

  useFetchPageData({
    isSuccess,
    hasNextPage,
    userId,
    productChange,
    page,
    token,
    selectedProductPerPage,
    catalogue,
    formFilters,
    searchQuery: debouncedQuery,
    paginationContext,
  });

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setPaginationContext("search");
  };

  const handleProductPerPageChange = (value) => {
    const num = Number(value);
    setSelectedProductPerPage(num);
    localStorage.setItem("selectedProductPerPage", num);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPaginationContext("filter");
    setFilterLoading(true);
    try {
      if (Object.values(formFilters).every((value) => value === "")) {
        toast.error("Please enter a value for at least one filter");
        return;
      }
      const {
        minprice,
        maxprice,
        minquantity,
        maxquantity,
        minmsrp,
        maxmsrp,
        minsize,
        maxsize,
      } = formFilters;
      const toNum = (val) => Number(val) || 0;

      if (minprice && maxprice && toNum(minprice) > toNum(maxprice)) {
        toast.error("Minimum price cannot be greater than maximum price");
        return;
      }
      if (
        minquantity &&
        maxquantity &&
        toNum(minquantity) > toNum(maxquantity)
      ) {
        toast.error("Minimum quantity cannot be greater than maximum quantity");
        return;
      }
      if (minmsrp && maxmsrp && toNum(minmsrp) > toNum(maxmsrp)) {
        toast.error("Minimum MSRP cannot be greater than maximum MSRP");
        setFormFilters({});
        setActiveFilters([]);
        return;
      }
      if (minsize && maxsize && toNum(minsize) > toNum(maxsize)) {
        toast.error("Minimum size cannot be greater than maximum size");
        return;
      }
      setPage(1);
      setFilterApplied(true);
      setFilter(true);
      toast.success("Filters applied");
      setFilterOpen(false);
    } catch (error) {
      toast.error("Failed to apply filters");
    } finally {
      setFilterLoading(false);
    }
  };

  const removeFilter = (filterName) => {
    setActiveFilters(
      activeFilters.filter((filter) => filter.name !== filterName)
    );
    setFormFilters((prev) => {
      const updatedFilters = { ...prev, [filterName]: "" };
      return updatedFilters;
    });
  };

  const defaultFilters = {
    minprice: "",
    maxprice: "",
    minquantity: "",
    maxquantity: "",
    minmsrp: "",
    maxmsrp: "",
    minsize: "",
    maxsize: "",
    minweight: "",
    sku: "",
    upc: "",
    brandName: "",
    mapprice: "",
    manufacturer: "",
  };

  const clearFilters = () => {
    setFormFilters(defaultFilters);
    setActiveFilters([]);
    setFilterOpen(false);
    toast.success("Filters cleared");
    setPage(1);
    setFilterApplied(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleProductClick = async (product) => {
    if (!selectedProductCatalogue) {
      toast.error("Please select a product identifier");
      return;
    }
    const productId = product.id;
    dispatch(setProductId(productId));
    setSelectedProductId(productId);
    try {
      setLoader(true);
      const response = await productClickRequest(userId, productId, productChange, token);
      const jsonArray = response.features ? JSON.parse(response.features) : response;
      setSelectProduct(jsonArray);
      setSelectProductcontd(response);
      setEditingUser(response);
      setEditableValue(response.model);
      setCloseDetail(true);
      openModal("product");
    } catch (err) {
      if (!err.code && !err.response) {
        toast.error("Request failed, select identifier and try again");
      }
    } finally {
      setLoader(false);
    }
  };

  const handleUpdateProduct = async () => {
    const updatedProduct = selectProduct;
    if (updatedProduct) {
      try {
        const response = await productUpdateRequest(userId, store, handleCatalogue, selectedProductCatalogue, token)
        setSelectProduct(response);
        toast.success("Product edited successfully")
        localStorage.setItem("selectProduct", JSON.stringify(updatedProduct));
      } catch (error) {
        if (!error.code && !error.response) {
          toast.error("Request failed, try again");
        }
      }
    }
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormFilters((prev) => ({ ...prev, [name]: value }));
    setActiveFilters((prev) => {
      if (value) {
        const updatedFilters = prev.filter((filter) => filter.name !== name);
        return [...updatedFilters, { name, value }];
      } else {
        return prev.filter((filter) => filter.name !== name);
      }
    });
  };

  const openModal = (modalType) => {
    setCurrentModal(modalType);
  };

  const closePopup = () => {
    setCloseDetail((prev) => !prev);
  };

  const closeModal = () => {
    setCurrentModal(null);
  };

  const toggleFilter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (toggling || productChange === "all") return;
    setToggling(true);
    setFilterOpen((prev) => !prev);
    setTimeout(() => setToggling(false), 300);
  };

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "list" ? "grid" : "list"));
  };

  const productsToRender = useMemo(
    () => catalogueProduct.map((item) => item.product),
    [catalogueProduct]
  );

  const selectAllProducts = (products) => {
    const allIds = products.map((product) => product.id);
    const areAllSelected = allIds.every((id) => checkedItems.includes(id));
    setCheckedItems(areAllSelected ? [] : allIds);
  };

  const addAllToProduct = async () => {
    if (checkedItems.length === 0) {
      toast.error("Please select at least one product");
      return;
    }
    if (!selectedProductCatalogue) {
      toast.error("Please select a product identifier");
      return;
    }
    setLoading(true);
    try {
      const promises = checkedItems.map(async (productId) => {
        try {
          const productResponse = await addAllProducts(userId, productId, productChange);
          const productData = productResponse;
          const features = productData.features
            ? JSON.parse(productData.features)
            : [];
          const getFeatureValue = (name) => {
            const feature = features.find((item) => item.Name === name);
            return feature?.Value || "";
          };
          const updatedProduct = {
            user: parseInt(userId) || 0,
            Brand: productData?.brand || getFeatureValue("Manufacturer") || "",
            Category: productData?.category || getFeatureValue("Type") || "",
            Description: productData?.detailed_description || "",
            Model: productData?.model || getFeatureValue("Model") || "",
            MPN: getFeatureValue("MPN") || "",
            Price: parseFloat(productData?.price) || 0,
            Quantity: parseInt(productData?.quantity) || 0,
            Shipping_height:
              parseFloat(
                productData?.height || getFeatureValue("ItemHeight")
              ) || 0,
            Shipping_weight:
              parseFloat(
                productData?.weight || getFeatureValue("ItemWeight")
              ) || 0,
            Shipping_width:
              parseFloat(productData?.width || getFeatureValue("ItemWidth")) ||
              0,
            Sku: productData?.sku || "",
            Title: productData?.title || "",
            msrp: selectProductcontd?.msrp || 0,
            map: selectProductcontd?.map || 0,
            Upc: productData?.upc || "",
            total_product_cost: productData?.total_product_cost || 0,
          };

          const apiUrl = `${baseURL}/api/v2/add-to-product/${userId}/${productId}/${productChange}/${selectedProductCatalogue}/`;
          const response = await axios.put(apiUrl, updatedProduct, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          });
          return { productId, success: true, response };
        } catch (err) {
          return {
            productId,
            success: false,
            error: err.response?.data || err.message,
          };
        }
      });

      const results = await Promise.all(promises);
      const failedProducts = results.filter((result) => !result.success);

      if (failedProducts.length > 0) {
        toast.error(`Failed to add ${failedProducts.length} product(s).`);
      } else {
        toast.success("All selected products added successfully");
        setCheckedItems([]);
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleMultiSelectChange = (e) => {
    setMultiSelect(e.target.checked);
  };

  // Determine if Advance Search button should be disabled
  const isAdvanceSearchDisabled = isLoading || productChange === "all";

  return (
    <div className="h-screen lg:mx-5 min-h-screen">
      <Toaster position="top-right" />
      <div
        className={
          error || isLoading
            ? "bg-[#E7F2ED] mx-auto w-full max-w-full"
            : "bg-[#E7F2ED] mx-auto w-full max-w-full"
        }
      >
        <section className="sticky top-12 z-[1]">
          <div className="bg-white rounded-t-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4">
              <div className="flex items-center gap-4 justify-between">
                <motion.h1
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
                  className="text-2xl font-bold text-green-700 mb-3"
                >
                  Catalog
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
                    transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
                    className="text-lg font-semibold text-black mb-2 md:block hidden"
                  >
                    Vendors
                  </motion.h1>
                  <motion.h1
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
                    className="text-lg font-semibold text-black mb-2 md:block hidden md:me-3"
                  >
                    Custom Filters
                  </motion.h1>
                </div>
                <div className="flex flex-wrap lg:flex-nowrap items-stretch lg:items-center gap-4 w-full">
                  <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    {/* <Dropdown>
                    <DropdownTrigger>
                      <Button className="capitalize bg-white border-2 border-[#089451] text-[#089451] font-semibold hover:bg-[#089451] hover:text-white transition-colors duration-200 min-w-[120px]" variant="bordered">
                        {selectedVendor ? selectedVendor.endpointName : "Vendors"}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Vendor selection"
                      disallowEmptySelection
                      selectedKeys={selectedVendorKey}
                      selectionMode="single"
                      variant="flat"
                      onSelectionChange={setSelectedVendorKey}
                    >
                      {catalogue.map((vendor) => (
                        <DropdownItem key={vendor.name}>
                          {vendor.endpointName}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown> */}

                    <VendorDropdown
                      selected={selectedVendor?.endpointName || "Select Vendor"}
                      onChange={(vendor) => {
                        setSelectedVendor(vendor);
                      }}
                      open={openVendor}
                      setOpen={setOpenVendor}
                      catalogue={catalogue}
                    />

                    {productChange !== "all" && (
                      // <Dropdown>
                      //   <DropdownTrigger>
                      //     <Button
                      //       className="capitalize bg-white border-2 border-[#089451] text-[#089451] font-semibold hover:bg-[#089451] hover:text-white transition-colors duration-200 min-w-[120px]"
                      //       variant="bordered"
                      //     >
                      //       {selectedVendorIdentifier
                      //         ? selectedVendorIdentifier.vendor_identifier
                      //         : "Identifiers"}
                      //     </Button>
                      //   </DropdownTrigger>
                      //   <DropdownMenu
                      //     aria-label="Vendor Identifiers"
                      //     disallowEmptySelection
                      //     selectedKeys={selectedVendorIdentifiersKey}
                      //     selectionMode="single"
                      //     variant="flat"
                      //     onSelectionChange={setSelectedVendorIdentifiersKey}
                      //   >
                      //     {catalogueIdentifiers.map((identifier) => (
                      //       <DropdownItem key={identifier.vendor_identifier}>
                      //         {identifier.vendor_identifier}
                      //       </DropdownItem>
                      //     ))}
                      //   </DropdownMenu>
                      // </Dropdown>

                      <IdentifierDropdown
                        // setSelectedProductCatalogue={identifier?.vendor_identifier}
                        selected={
                          selectedVendorIdentifier?.vendor_identifier ||
                          "Select identifier"
                        }
                        onChange={(identifier) => {
                          setSelectedVendorIdentifier(identifier);
                          setSelectedProductCatalogue(identifier?.vendor_identifier);
                        }}
                        open={openIdentifier}
                        setOpen={setOpenIdentifier}
                        catalogueIdentifiers={catalogueIdentifiers}
                      />
                    )}
                  </div>
                  
                  <div className="flex w-full lg:flex-1 rounded-md border border-gray-300 bg-gray-100 overflow-hidden">
                    <input
                      className="flex-grow px-3 py-2 bg-transparent outline-none"
                      type="text"
                      disabled={productChange === "all"}
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

                    <div className="relative w-full sm:w-auto">
                      <button
                        ref={advanceSearchButtonRef}
                        className={`flex items-center gap-2 px-4 py-2 border rounded-lg font-medium w-full sm:w-auto ${isAdvanceSearchDisabled
                            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                            : "capitalize bg-white border-2 border-[#089451] text-[#089451] font-semibold hover:bg-[#089451] hover:text-white transition-colors duration-200 min-w-[120px]"
                          }`}
                        onClick={toggleFilter}
                        aria-expanded={filterOpen}
                        aria-controls="advance-search-dropdown"
                        disabled={isAdvanceSearchDisabled}
                      >
                        Adv Search
                        <IoIosArrowDown className={`transition-transform ${filterOpen ? "rotate-180" : ""}`} />
                      </button>

                      {filterOpen && productChange !== "all" && (
                        <div
                          ref={dropdownRef}
                          className="absolute top-full right-0 mt-2 z-[10000] bg-white border border-gray-200 rounded-lg shadow-lg p-6 min-w-[400px]"
                        >
                          <AdvanceSearch
                            clearFilters={clearFilters}
                            userId={userId}
                            endpoint={endpoint}
                            productChange={productChange}
                            token={token}
                            removeFilter={removeFilter}
                            page={page}
                            handleSubmit={handleSubmit}
                            formFilters={formFilters}
                            handleFormInputChange={handleFormInputChange}
                            filterLoading={filterLoading}
                            selectedProductPerPage={selectedProductPerPage}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {!isLoading && catalogueProduct.length !== 0 && (
            <div className="bg-gray-50 border-x border-gray-200 px-6 py-4">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div
                  className={`flex flex-wrap gap-2 max-w-full min-h-[2.5rem] transition-all duration-300 ${!showActionsMobile ? "block" : "hidden"
                    }`}
                >
                  {activeFilters?.length > 0 ? (
                    <>
                      {activeFilters.map((filter, index) => (
                        <div
                          key={index}
                          className="bg-green-100 text-green-800 border border-green-200 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                        >
                          <span className="font-medium">{filter.name}</span>
                          {[
                            "minprice",
                            "maxprice",
                            "minquantity",
                            "maxquantity",
                          ].includes(filter.name) && (
                              <span className="text-green-600">
                                {filter.name === "minprice" &&
                                  `≥ $${filter.value}`}
                                {filter.name === "maxprice" &&
                                  `≤ $${filter.value}`}
                                {filter.name === "minquantity" &&
                                  `≥ ${filter.value}`}
                                {filter.name === "maxquantity" &&
                                  `≤ ${filter.value}`}
                              </span>
                            )}
                          <button
                            className="text-green-600 hover:text-red-600 font-bold text-sm w-4 h-4 flex items-center justify-center"
                            onClick={() => removeFilter(filter.name)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <button
                        className="text-red-600 hover:text-red-700 font-medium text-sm px-2 py-1 rounded hover:bg-red-50"
                        onClick={clearFilters}
                      >
                        Clear All
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-500 text-sm mt-2">
                      No filters applied
                    </span>
                  )}
                </div>

                {!isLoading && productsToRender.length > 0 && (
                  <div className="flex justify-between items-center space-x-10">
                    <CustomPagination
                      pageCount={Math.ceil(count / selectedProductPerPage)}
                      onPageChange={(selectedPage) => setPage(selectedPage)}
                      currentPage={page}
                      itemsPerPage={selectedProductPerPage}
                      totalItems={count}
                      handleNextPage={handleNextPage}
                      handlePreviousPage={handlePreviousPage}
                    />
                    {!isLoading && (
                      <div className="flex items-center gap-2">
                        <CustomDropdown
                          selected={selectedProductPerPage}
                          onChange={handleProductPerPageChange}
                          open={open}
                          setOpen={setOpen}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {!isLoading && catalogueProduct.length !== 0 && (
                <div className="flex flex-wrap items-center justify-between mt-4 md:px-2 px-0 py-3 bg-[#E7F2ED] rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-sm text-gray-700 md:mb-0 mb-2">
                      <input
                        type="checkbox"
                        disabled={
                          !multiSelect ||
                          isLoading ||
                          catalogueProduct.length === 0
                        }
                        checked={
                          productsToRender.length > 0 &&
                          productsToRender.every((product) =>
                            checkedItems.includes(product.id)
                          )
                        }
                        onClick={() => selectAllProducts(productsToRender)}
                        className={`${!multiSelect ? "cursor-not-allowed disabled border border-gray-200" : "border border-green-700"
                          } w-4 h-4 appearance-none rounded checked:bg-green-700 focus:outline-none focus:ring-green-300`}
                      />
                      <label
                        htmlFor="selectAllCheckbox"
                        className={`text-sm ${!multiSelect ? "text-gray-400" : "text-gray-700"
                          }`}
                      >
                        Select all products on page
                      </label>
                    </div>
                  </div>
                  <Switch
                    className="md:mb-0 mb-2"
                    color="success"
                    size="sm"
                    onChange={handleMultiSelectChange}
                    checked={multiSelect}
                  >
                    MultiSelect
                  </Switch>
                  <div className="flex flex-wrap gap-2 items-center">
                    <div className="flex items-center gap-2 px-3 py-2 rounded bg-green-700 text-white font-medium md:min-w-[14rem] justify-center">
                      {loading ? (
                        <img src={gif} alt="Loading..." className="w-5 h-5" />
                      ) : (
                        <>
                          <FiShoppingBag />
                          <button onClick={addAllToProduct}>
                            Add Selected to Product
                          </button>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded bg-[#BB8232] text-white font-medium">
                      <MdOutlineDelete />
                      <button onClick={() => setCheckedItems([])}>
                        Deselect all
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        <Enrolmentmodal
          isOpen={currentModal === "vendor"}
          onOpen={() => openModal("vendor")}
          onOpenChange={(isOpen) =>
            isOpen ? openModal("vendor") : closeModal()
          }
          onClose={closeModal}
          setAllIdentifiers={setAllIdentifiers}
          allIdentifiers={allIdentifiers}
          token={token}
        />
        <Productmodal
          isOpen={currentModal === "product"}
          onClose={closeModal}
          selectedProduct={selectedProduct}
          selectProduct={selectProduct}
          selectProductcontd={selectProductcontd}
          handleChange={handleChange}
          handleUpdateProduct={handleUpdateProduct}
          handleProductClick={handleProductClick}
          closePopup={closePopup}
          closeDetail={closeDetail}
          selectedProductId={selectedProductId}
          userId={userId}
          productChange={productChange}
          handleCatalogue={handleCatalogue}
          selectedProductCatalogue={selectedProductCatalogue}
        />
        <Displaycatalogue
          isLoading={isLoading}
          error={error}
          multiSelect={multiSelect}
          token={token}
          productsToRender={productsToRender}
          currentItems={currentItems}
          handleProductClick={handleProductClick}
          viewMode={viewMode}
          filterOpen={filterOpen}
          toggleViewMode={toggleViewMode}
          store={store}
          userId={userId}
          loader={loader}
          handleCatalogue={handleCatalogue}
          productChange={productChange}
          selectedProductCatalogue={selectedProductCatalogue}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
        />
        <div className="h-[60px]"></div>
        <div>
          {!isLoading && productsToRender.length > 0 && (
            <div className="fixed bottom-0 left-0 right-0 shadow-lg py-2 flex justify-center items-center">
              <FixedCustomPagination
                pageCount={Math.ceil(count / selectedProductPerPage)}
                onPageChange={(selectedPage) => setPage(selectedPage)}
                currentPage={page}
                itemsPerPage={selectedProductPerPage}
                totalItems={count}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalogue;
