import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import gif from "../../Images/gif.gif";
import GetCategory from "./GetCategory";
import ItemSpecificFields from "./ItemSpecificFields";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ProductImageUpload from "./ProductImageUpload";
import PricingSku from "./PricingSku";
import { FaExclamation } from "react-icons/fa6";
import { Tooltip, Image, user } from "@heroui/react";
import { Checkbox } from "@nextui-org/react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import ListingPreferences from "./ListingPreferences";
import { FaRegSave } from "react-icons/fa";
import { BiCategoryAlt, BiListUl } from "react-icons/bi";
import { Toaster, toast } from "sonner";
import DynamicProductInputs from "./DynamicProductsInput";
import { fetchItemLeafCategory, fetchProductListing, fetchProductUpdate, fetchUserCategoryId, marketplaceProductListing, marketplaceProductSaving, marketPlaceProductUpdate, userCategoriesId } from "../../api/authApi";
import { handleApiError } from "../../utils/handleError";

const Listing = () => {
  const { productId } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [productListing, setProductListing] = useState("");
  const [isMappingChecked, setIsMappingChecked] = useState(false);
  const [isGiftChecked, setIsGiftChecked] = useState(productListing?.isGift ? true : false);
  const [bestOfferEnabled, setBestOfferEnabled] = useState(false);
  const [enableCharity, setEnableCharity] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subcategories, setSubcategories] = useState([]) || [];
  const [middleCategories, setMiddleCategories] = useState([]) || [];
  const [lastCategories, setLastCategories] = useState([]) || [];
  const [searchQuery, setSearchQuery] = useState("");
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [itemSpecificFields, setItemSpecificFields] = useState({});
  const [selectedValues, setSelectedValues] = useState({});
  const [isLoadingCategory, setIsLoadingCategory] = useState(false);
  const [firstCategory, setFirstCategory] = useState([]) || [];
  const [filterValues, setFilterValues] = useState({});
  const [description, setDescription] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [shippingCost, setShippingCost] = useState("");
  const [isEbay, setIsEbay] = useState(false);
  const [isShopify, setIsShopify] = useState(false);
  const [isWoocommerce, setIsWoocommerce] = useState(false);
  const [isWalmart, setIsWalmart] = useState(false);
  const [isAmazon, setIsAmazon] = useState(false);
  const [isEbayOpen, setIsEbayOpen] = useState(false);
  const [handleSubmitLoader, setHandleSubmitLoader] = useState(false);
  const [handleSaveListingLoader, setHandleSaveListingLoader] = useState(false);
  const [handleUpdateLoader, setHandleUpdateLoader] = useState(false);
  const [useSavedItem, setUseSavedItem] = useState(false);
  const [thumbnailImage, setThumbnailImage] = useState('');
  const [customInputValues, setCustomInputValues] = useState({});
  const [newItemSpecific, setNewItemSpecific] = useState(false);
  const maxLength = 80;
  const [title, setTitle] = useState(productListing?.title || "");
  const [remaining, setRemaining] = useState(maxLength - (productListing?.title?.length || 0))
  const [handleChange, setHandleChange] = useState("");

  const dropdownRef = useRef(null);

  useEffect(() => {
    if (productListing?.enable_best_offer || productListing?.bestOfferEnabled || productListing?.bestofferenabled) {
      setBestOfferEnabled(true);
    }
  }, [productListing]);

  useEffect(() => {
    if (productListing?.enable_charity) {
      setEnableCharity(true);
    }
  }, [productListing]);

  useEffect(() => {
    let newTitle = productListing?.title || "";
    let sanitizedTitle = newTitle.replace(/&/g, "and");
    setTitle(sanitizedTitle);
    setRemaining(maxLength - sanitizedTitle.length);
  }, [productListing]);

  const handleTitleChange = (e) => {
    let newValue = e.target.value.replace(/&/g, "and");
    setTitle(newValue);
    setRemaining(maxLength - newValue.length);
  };

  const getCharColor = (length, maxLength) => {
    if (length > maxLength) return "text-red-500";
    if (length >= 70) return "text-gray-500";
    return "text-green-600";
  };

  useEffect(() => {
    function handleClickOutside(event) {
      // Check if click is outside both dropdown and its trigger button
      const isDropdownButton = event.target.closest('.dropdown-trigger');
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !isDropdownButton) {
        setIsDropdownOpen(null);
        setFilterValues("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const handleDescriptionChange = (value) => {
    setDescription(value);
    setProductListing((prev) => ({ ...prev, detailed_description: value }));
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const isFromEdit = location.state?.isFromEdit || false;
      const isFromUpdate = location.state?.isFromUpdate || false;
      try {
        if (isFromUpdate) {
          await fetchProductForUpdate(productId);
        }
        else if (isFromEdit) {
          await fetchSavedProducts(productId);
        }
        else {
          await fetchProductDetails();
        }
      } catch (error) {
        toast.error("Error fetching product listing details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId, location.state]);

  // to convert to uppercase
  const normalizeKeys = (obj) => {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key.toLowerCase(), value])
    );
  };

  const fetchProductForUpdate = async (productId) => {
    try {
      const response = await fetchProductUpdate(productId);
      console.log(response);
      const savedItem = response?.saved_items?.[0];
      if (!savedItem) {
        toast.error("No saved product found.");
        return;
      }
      let item_specific = {};
      if (savedItem.item_specific_fields) {
        try {
          const cleanedString = savedItem.item_specific_fields.replace(/'/g, '"').replace(/\\/g, '\\\\');
          const parsed = JSON.parse(cleanedString);
          setUseSavedItem(parsed)
          item_specific = normalizeKeys(parsed);
          setNewItemSpecific(item_specific);
        } catch (parseError) {
        }
      }
      const { item_specific_fields, ...rest } = savedItem;
      const mergedProduct = { ...normalizeKeys(rest), ...item_specific };
      setProductListing(mergedProduct);
    } catch (error) {
      toast.error("Failed to load saved products.");
    }
  };

  const fetchSavedProducts = async (productId) => {
    try {
      const response = await fetchProductUpdate(productId);
      const savedItem = response?.saved_items?.[0];
      if (!savedItem) {
        toast.error("No saved product found.");
        return;
      }
      let item_specific = {};
      if (savedItem.item_specific_fields) {
        try {
          const cleanedString = savedItem.item_specific_fields.replace(/'/g, '"').replace(/\\/g, '\\\\');
          const parsed = JSON.parse(cleanedString);
          setUseSavedItem(parsed)
          item_specific = normalizeKeys(parsed);
          setNewItemSpecific(item_specific);
        } catch (parseError) {
        }
      }
      const { item_specific_fields, ...rest } = savedItem;
      const mergedProduct = { ...normalizeKeys(rest), ...item_specific };
      setProductListing(mergedProduct);
    } catch (error) {
      toast.error("Failed to load saved products.");
    }
  };

  // Fetch from the second API
  const fetchProductDetails = async () => {
    if (!token) {
      navigate("/signin");
      return;
    }
    if (!userId || !productId) {
      toast.error("Invalid userId or productId");
      return;
    }
    try {
      const response = await fetchProductListing(userId, productId);
        const productInfo = response?.product_info[0];
        const vendorDetails = response.vendor_details[0];
        const ebayInfo = response?.ebay_info[0];
        const paymentPolicy = ebayInfo?.payment_policy ? JSON.parse(ebayInfo.payment_policy) : null;
        const returnPolicy = ebayInfo?.return_policy ? JSON.parse(ebayInfo.return_policy) : null;
        const shippingPolicy = ebayInfo?.shipping_policy ? JSON.parse(ebayInfo.shipping_policy) : null;
        const policyInfo = ebayInfo?.policies_info ? JSON.parse(ebayInfo.policies_info) : null;
        const vendor_location = response.vendor_details[0].vendor_location[0];
        setProductListing({
          ...ebayInfo,
          ...vendorDetails,
          ...vendor_location,
          payment_policy: paymentPolicy,
          return_policy: returnPolicy,
          shipping_policy: shippingPolicy,
          policyInfo,
          ...productInfo,
        });
    } catch (error) {
      toast.error("Error fetching product listing details");
      if (error.response) {
        toast.error(`${error.response.data.detail}` || `${error.response.data.message}`)
      } else if (error.request) {
        toast.error(`${error.request}`)
      } else {
        toast.error(`${error.message}`)
      }
      if (error?.response?.data?.detail) {
        toast.error(`${error?.response?.data?.detail}`);
      }
    }
  };

  const toggleDropdown = (fieldName, e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDropdownOpen(prev => prev === fieldName ? null : fieldName);
  };

  const handleSelectChange = (fieldName, label) => {
    setSelectedValues((prev) => ({ ...prev, [fieldName]: label }));
    setCustomInputValues(prev => ({ ...prev, [fieldName]: "" }));
    setFilterValues((prev) => ({ ...prev, [fieldName]: "" }));
    setIsDropdownOpen(false);
  };

  const filteredOptions = (fieldName, options) => {
    const filterValue = filterValues[fieldName]?.toLowerCase() || "";
    return Object.entries(options).filter(([key, label]) =>
      label.toLowerCase().includes(filterValue)
    );
  };

  const handleListingChange = (e) => {
    const { name, value } = e.target;
    setProductListing((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleOpenModal = async () => {
    const userCategoryId = productListing.category_id;
    setIsLoadingCategory(true);
    try {
      if (userCategoryId) {
        const response = await userCategoriesId(userId, userCategoryId);
        const itemSpecificArray = response?.item_specifics || [];
        const validChoices = response?.valid_choices || {};
        const formattedFields = {};
        // Set each field with empty string as default value
        itemSpecificArray.forEach((field) => {
          formattedFields[field] = "";
        });
        // Override fields that have valid choices (dropdowns)
        Object.entries(validChoices).forEach(([key, options]) => {
          formattedFields[key] = Array.isArray(options) ? options : "";
        });
        setItemSpecificFields(formattedFields);
        toast.success("Fetched successfully");
        setIsModalOpen(false);
      } else {
        setLoader(true);
        setIsModalOpen(true);
        const response = await fetchUserCategoryId(userId, productId);
        const isValidCategory = response?.category_info?.offset === 0 || response?.category_info?.total === 0 || response?.category_info?.errors;
        if (isValidCategory) {
          // toast.error("Invalid access token or UPC missing");
          toast.error(`${response?.category_info?.errors[0].longMessage || "No categories found"}`);
          setIsModalOpen(false);
          return;
        }
        setFirstCategory(response.category_info);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "An error occurred");
    } finally {
      setIsLoadingCategory(false);
      setLoader(false);
    }
  };

  const handleFirstCategoryClick = async (categoryId) => {
    setLoader(true);
    try {
      const response = await fetchItemLeafCategory(userId, categoryId);
      const fetchedSubcategories = response?.More_subcategory || [];
      if (fetchedSubcategories.length > 0) {
        setSubcategories(fetchedSubcategories);
        setLoader(false);
        return;
      }
      const specificFieldsResponse = await userCategoriesId(userId, categoryId);
      handleListingChange({ target: { name: "category_id", value: categoryId } });
      const itemSpecificArray = specificFieldsResponse?.item_specifics || [];
      const validChoices = specificFieldsResponse?.valid_choices || {};

      let formattedFields = {};
      // Convert item_specifics (Array) to input fields
      itemSpecificArray.forEach((field) => {
        formattedFields[field] = "";
      });
      Object.entries(validChoices).forEach(([key, options]) => {
        formattedFields[key] = Array.isArray(options) ? options : "";
      });
      setItemSpecificFields(formattedFields);
      toast.success("Fetched successfully");
      setLoader(false);
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Error fetching item specific fields");
      setLoader(false);
    }
  };

  const handleCategoryClick = async (categoryId) => {
    setLoader(true);
    try {
      const response = await fetchItemLeafCategory(userId, categoryId);
      const fetchedMiddleCategories = response?.More_subcategory || [];
      if (fetchedMiddleCategories.length > 0) {
        setMiddleCategories(fetchedMiddleCategories);
        setLoader(false);
        return;
      }
      const specificFieldsResponse = await userCategoriesId(userId, categoryId);
      handleListingChange({ target: { name: "category_id", value: categoryId } });
      const itemSpecificArray = specificFieldsResponse?.data?.item_specifics || [];
      const validChoices = specificFieldsResponse?.data?.valid_choices || {};

      let formattedFields = {};

      itemSpecificArray.forEach((field) => {
        formattedFields[field] = "";
      });

      Object.entries(validChoices).forEach(([key, options]) => {
        formattedFields[key] = Array.isArray(options) ? options : "";
      });
      setItemSpecificFields(formattedFields);
      toast.success("Fetched successfully");
      setLoader(false);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error fetching category data:", error);
      setLoader(false);
    }
  };

  const handleMiddleCategoryClick = async (categoryId) => {
    setLoader(true);
    try {
      const response = await fetchItemLeafCategory(userId, categoryId);
      const fetchedLastCategories = response?.Last_subcategory || [];
      if (fetchedLastCategories.length > 0) {
        setLastCategories(fetchedLastCategories);
        setLoader(false);
        return;
      }
      const specificFieldsResponse = await userCategoriesId(userId, categoryId);
      handleListingChange({
        target: { name: "category_id", value: categoryId },
      });
      const itemSpecificArray = specificFieldsResponse?.data?.item_specifics || [];
      const validChoices = specificFieldsResponse?.data?.valid_choices || {};

      let formattedFields = {};

      itemSpecificArray.forEach((field) => {
        formattedFields[field] = "";
      });
      Object.entries(validChoices).forEach(([key, options]) => {
        formattedFields[key] = Array.isArray(options) ? options : "";
      });
      setItemSpecificFields(formattedFields);
      toast.success("Fetched successfully");
      setLoader(false);
      setIsModalOpen(false);
    } catch (error) {
      setLoader(false);
    }
  };

  const handleLastCategoryClick = async (categoryId) => {
    setLoader(true);
    try {
      const specificFieldsResponse = await userCategoriesId(userId, categoryId);
      handleListingChange({ target: { name: "category_id", value: categoryId } });
      const itemSpecificFields = specificFieldsResponse?.data?.item_specific_fields || [];
      const validChoices = specificFieldsResponse?.data?.valid_choices || {};
      let formattedFields = {};
      itemSpecificFields.forEach((field) => {
        formattedFields[field] = "";
      });
      Object.entries(validChoices).forEach(([key, options]) => {
        formattedFields[key] = Array.isArray(options) ? options : "";
      });
      setItemSpecificFields(formattedFields);
      toast.success("Fetched successfully");
      setIsModalOpen(false);
      setLoader(false);
    } catch (error) {
      toast.error("An error occurred while fetching specific fields.");
    } finally {
      setLoader(false);
    }
  };

  const handleInputChange = (fieldName, value) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFirstCategory([]);
    setSubcategories([]);
    setMiddleCategories([]);
    setLastCategories([]);
  };

  const market_logos = {
    ebay_logo: isEbay ? "https://i.postimg.cc/3xZSgy9Z/ebay.png" : false,
    shopify_logo: isShopify ? "https://i.postimg.cc/ZqRGnFZN/shopify.png" : false,
    woocommerce_logo: isWoocommerce ? "https://i.postimg.cc/Wbfbs7QB/woocommerce.png" : false,
    walmart_logo: isWalmart ? "https://i.postimg.cc/vZpK8RPJ/walmart.png" : false,
    amazon_logo: isAmazon ? "https://i.postimg.cc/JzYvBDpB/amazon.png" : false,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submittingProduct = location.state?.isFromEdit ? useSavedItem : selectedValues;
    const category_id = productListing?.category_id;
    const id = location.state?.isFromEdit ? productListing?.product_id : productId
    if (!category_id) {
      toast.error("Please enter a category id");
      return;
    };
    setHandleSubmitLoader(true);
    const listingData = {
      title: title || null,
      description: productListing?.detailed_description || productListing?.description,
      start_price: productListing?.selling_price || productListing?.start_price || null,
      category: productListing?.category || null,
      postal_code: productListing?.zip_code || productListing?.postal_code || null,
      location: productListing?.region || productListing?.location || null,
      sku: productListing?.sku || null,
      quantity: productListing?.quantity || null,
      picture_detail: productListing?.image || productListing?.picture_detail || null,
      country: productListing?.country || null,
      city: productListing?.city || null,
      bestOfferEnabled: bestOfferEnabled || null,
      enable_charity: enableCharity || null,
      charity_id: enableCharity ? productListing?.charity_id : null,
      donation_percentage: enableCharity ? productListing?.donation_percentage : null,
      market_logos: JSON.stringify(market_logos) || "Null",
      listingType: productListing?.listingType || "FixedPriceItem",
      MPN: productListing?.mpn || "",
      upc: productListing?.upc || "",
      minimum_quantity: productListing?.minimum_quantity || null,
      maximum_quantity: productListing?.maximum_quantity || null,
      fixed_percentage_markup: productListing?.fixed_percentage_markup || null,
      percentage_markup: productListing?.percentage_markup || "Null",
      us_size: productListing?.us_size || null,
      Brand: productListing?.brand || productListing.manufacturer || "",
      cost: productListing?.cost || productListing?.total_product_cost || null,
      Volume: productListing?.volume ? productListing?.volume : "Fixeditem",
      Formulation: null,
      Personalization: null,
      fixed_markup: productListing?.fixed_markup || null,
      shipping_width: productListing?.shipping_width || null,
      shipping_height: productListing?.shipping_height || null,
      shipping_weight: productListing?.shipping_weight || null,
      shipping_length: productListing?.shipping_length || null,
      type: productListing?.type || "Default Type",
      "Character Family": productListing?.CharacterFamily || null,
      "Age Level": productListing?.AgeLevel || null,
      "Recommended Age Range": productListing?.RecommendedAgeRange || null,
      "Year": productListing?.Year || null,
      mode: productListing?.mode || "Null",
      min_profit_mergin: productListing?.min_profit_mergin || null,
      profit_margin: productListing?.profit_margin || null,
      send_min_price: productListing?.send_min_price || null,
      map: productListing?.map || null,
      msrp: productListing?.msrp || null,
      model: productListing?.model || null,
      shipping_cost: productListing?.shipping_cost || null,
      price: productListing?.price || "Null",
      total_product_cost: productListing?.total_product_cost || null,
      payment_profileName: productListing?.payment_policy?.name || productListing?.payment_profileName || productListing?.payment_profilename || null,
      payment_profileID: productListing?.payment_policy?.id || productListing?.payment_profileID || productListing?.payment_profileid || null,
      shipping_profileName: productListing?.shipping_policy?.name || productListing?.shipping_profileName || productListing?.shipping_profilename || null,
      shipping_profileID: productListing?.shipping_policy?.id || productListing?.shipping_profileID || productListing?.shipping_profileid || null,
      return_profileName: productListing?.return_policy?.name || productListing?.return_profileName || productListing?.return_profilename || null,
      return_profileID: productListing?.return_policy?.id || productListing?.return_profileID || productListing?.return_profileid || null,
      vendor_name: productListing?.name | productListing.vendor_name || null,
    };
    const mergedData = {
      ...itemCategory,
      ...handleChange,
      userId,
      product: id,
      ...itemSpecificFields,
      ...listingData,
      ...submittingProduct,
      // ...selectedValues,
      category_id,
      gift: isGiftChecked,
      categoryMappingAllowed: isMappingChecked,
      thumbnailImage: Array.isArray(thumbnailImage) && thumbnailImage.length > 0 ? JSON.stringify(thumbnailImage) : "Null"
    };
    try {
      const response = await marketplaceProductListing(userId, category_id, mergedData);
      setHandleSubmitLoader(false);
      toast.success("Product listed successfully!");
    } catch (error) {
      setHandleSubmitLoader(false);
      handleApiError(error);
    }
  };

  const handleSaveListing = async (e) => {
    e.preventDefault();
    const category_id = productListing?.category_id || "";
    if (!category_id) {
      toast.error("Please enter a category");
      return;
    };
    setHandleSaveListingLoader(true);
    const savingListingData = {
      title: title || null,
      description: productListing?.detailed_description || productListing?.description,
      category: productListing?.category || null,
      start_price: productListing?.selling_price || productListing?.start_price || null,
      postal_code: productListing?.zip_code || productListing?.postal_code || null,
      location: productListing?.region || productListing?.location || null,
      sku: productListing?.sku || null,
      quantity: productListing?.quantity || null,
      picture_detail: productListing?.image || productListing?.picture_detail || null,
      country: productListing?.country || null,
      city: productListing?.city || null,
      bestOfferEnabled: bestOfferEnabled || null,
      enable_charity: enableCharity || null,
      charity_id: enableCharity ? productListing?.charity_id : null,
      donation_percentage: enableCharity ? productListing?.donation_percentage : null,
      market_logos: JSON.stringify(market_logos) || "Null",
      listingType: productListing?.listingType || "FixedPriceItem",
      MPN: productListing?.mpn || "",
      upc: productListing?.upc || "",
      minimum_quantity: productListing?.minimum_quantity || null,
      maximum_quantity: productListing?.maximum_quantity || null,
      fixed_percentage_markup: productListing?.fixed_percentage_markup || null,
      percentage_markup: productListing?.percentage_markup || "Null",
      us_size: productListing?.us_size || null,
      Brand: productListing?.brand || productListing.manufacturer || "",
      cost: productListing?.cost || productListing?.total_product_cost || null,
      Volume: productListing?.volume ? productListing?.volume : "Fixeditem",
      Formulation: null,
      Personalization: null,
      fixed_markup: productListing?.fixed_markup || null,
      shipping_width: productListing?.shipping_width || null,
      shipping_height: productListing?.shipping_height || null,
      shipping_weight: productListing?.shipping_weight || null,
      shipping_length: productListing?.shipping_length || null,
      type: productListing?.type || "",
      "Character Family": productListing?.CharacterFamily || null,
      "Age Level": productListing?.AgeLevel || null,
      "Recommended Age Range": productListing?.RecommendedAgeRange || null,
      "Year": productListing?.Year || null,
      mode: productListing?.mode || "Null",
      min_profit_mergin: productListing?.min_profit_mergin || null,
      send_min_price: productListing?.send_min_price || null,
      profit_margin: productListing?.profit_margin || null,
      map: productListing?.map || null,
      msrp: productListing?.msrp || null,
      model: productListing?.model || null,
      shipping_cost: productListing?.shipping_cost || null,
      price: productListing?.price || "Null",
      total_product_cost: productListing?.total_product_cost || null,
      payment_profileName: productListing?.payment_policy?.name || productListing?.payment_profileName || null,
      payment_profileID: productListing?.payment_policy?.id || productListing?.payment_profileID || null,
      shipping_profileName: productListing?.shipping_policy?.name || productListing?.shipping_profileName || null,
      shipping_profileID: productListing?.shipping_policy?.id || productListing?.shipping_profileID || null,
      return_profileName: productListing?.return_policy?.name || productListing?.return_profileName || null,
      return_profileID: productListing?.return_policy?.id || productListing?.return_profileID || null,
      vendor_name: productListing?.name || productListing.vendor_name || null,
    };
    const mergedSavingData = {
      ...itemCategory,
      ...handleChange,
      userId,
      product: productId,
      ...itemSpecificFields,
      ...savingListingData,
      ...selectedValues,
      category_id,
      gift: isGiftChecked,
      categoryMappingAllowed: isMappingChecked,
      thumbnailImage: Array.isArray(thumbnailImage) && thumbnailImage.length > 0 ? JSON.stringify(thumbnailImage) : "Null"
    };

    try {
      const response = await marketplaceProductSaving(userId, category_id, mergedSavingData);
      setHandleSaveListingLoader(false);
      toast.success("product saved successfully");
    } catch (error) {
      setHandleSaveListingLoader(false);
      handleApiError(error);
    }
  };

  const handleUpdateListing = async (e) => {
    e.preventDefault();
    const submittingProduct = location.state?.isFromUpdate ? useSavedItem : selectedValues;
    const inventory_id = productListing?.id;
    const id = location.state?.isFromUpdate ? productListing?.product_id : productId
    if (!inventory_id) {
      toast.error("Please enter a category id");
      return;
    };
    setHandleUpdateLoader(true);

  const updateData = {
  title: title || productListing?.title || null,
  description: productListing?.detailed_description || productListing?.description || "Null",
  userId: productListing?.user_id || "Null",
  // product: "301",
  product:  productListing?.product_id || "Null",
  Brand: productListing?.Brand || productListing?.brand || productListing?.manufacturer || "Null",
  "Fragrance Name": productListing?.["Fragrance Name"] || "Null",
  Type: productListing?.Type || productListing?.type || "Default Type",
  "California Prop 65 Warning": productListing?.["California Prop 65 Warning"] || "Null",
  "Country/Region of Manufacture": productListing?.["Country/Region of Manufacture"] || "Null",
  Features: productListing?.Features || "Null",
  Formulation: productListing?.Formulation || null,
  MPN: productListing?.MPN || productListing?.mpn || "Null",
  "Unit Quantity": productListing?.["Unit Quantity"] || "Null",
  "Unit Type": productListing?.["Unit Type"] || "Null",
  Volume: productListing?.Volume || productListing?.volume || "Fixeditem",
  bestOfferEnabled: productListing?.bestOfferEnabled || bestOfferEnabled || null,
  category: productListing?.category || "Null",
  categoryMappingAllowed: productListing?.categoryMappingAllowed ? "true" : "false",
  category_id: productListing?.category_id || null,
  charity_id: productListing?.charity_id || (enableCharity ? productListing?.charity_id : null),
  city: productListing?.city || "Null",
  cost: productListing?.cost || productListing?.total_product_cost || "Null",
  country: productListing?.country || "Null",
  donation_percentage: enableCharity ? productListing?.donation_percentage : productListing?.donation_percentage || "Null",
  enable_charity: enableCharity || productListing?.enable_charity ? "true" : "false",
  ebay_item_id: productListing?.ebay_item_id || "Null",
  fixed_markup: productListing?.fixed_markup || "Null",
  fixed_percentage_markup: productListing?.fixed_percentage_markup || null,
  gift: productListing?.gift ? "true" : "false",
  inventory_id: productListing?.id || "Null",
  listingType: productListing?.listingType || "FixedPriceItem",
  location: productListing?.region || productListing?.location || "Null",
  postal_code: productListing?.zip_code || productListing?.postal_code || "Null",
  map: productListing?.map || null,
  minimum_quantity: productListing?.minimum_quantity || "Null",
  maximum_quantity: productListing?.maximum_quantity || "Null",
  min_profit_mergin: productListing?.min_profit_mergin || null,
  profit_margin: productListing?.profit_margin || null,
  send_min_price: productListing?.send_min_price || null,
  mode: productListing?.mode || "Null",
  msrp: productListing?.msrp || null,
  payment_profileID: productListing?.payment_policy?.id || productListing?.payment_profileID || productListing?.payment_profileid || "Null",
  payment_profileName: productListing?.payment_policy?.name || productListing?.payment_profileName || productListing?.payment_profilename || "Null",
  shipping_profileID: productListing?.shipping_policy?.id || productListing?.shipping_profileID || productListing?.shipping_profileid || "Null",
  shipping_profileName: productListing?.shipping_policy?.name || productListing?.shipping_profileName || productListing?.shipping_profilename || "Null",
  return_profileID: productListing?.return_policy?.id || productListing?.return_profileID || productListing?.return_profileid || "Null",
  return_profileName: productListing?.return_policy?.name || productListing?.return_profileName || productListing?.return_profilename || "Null",
  model: productListing?.model || "Null",
  price: productListing?.price || "Null",
  percentage_markup: productListing?.percentage_markup || "Null",
  start_price: productListing?.selling_price || productListing?.start_price || null,
  picture_detail: productListing?.image || productListing?.picture_detail || "Null",
  quantity: productListing?.quantity || "Null",
  shipping_cost: productListing?.shipping_cost || "Null",
  shipping_height: productListing?.shipping_height || "Null",
  shipping_length: productListing?.shipping_length || "Null",
  shipping_weight: productListing?.shipping_weight || "Null",
  shipping_width: productListing?.shipping_width || "Null",
  sku: productListing?.sku || "Null",
  thumbnailImage: productListing?.thumbnailImage || "Null",
  total_product_cost: productListing?.total_product_cost || null,
  upc: productListing?.upc || "",
  us_size: productListing?.us_size || null,
  "Character Family": productListing?.CharacterFamily || null,
  "Age Level": productListing?.AgeLevel || null,
  "Recommended Age Range": productListing?.RecommendedAgeRange || null,
  "Year": productListing?.Year || null,
  vendor_name: productListing?.name || productListing?.vendor_name || null,
  market_logos: JSON.stringify(market_logos) || "Null",
};

    const mergedData = {
      ...itemCategory,
      ...handleChange,
      userId,
      product: id,
      ...itemSpecificFields,
      ...updateData,
      ...submittingProduct,
      // ...selectedValues,
      inventory_id,
      gift: isGiftChecked,
      categoryMappingAllowed: isMappingChecked,
      thumbnailImage: Array.isArray(thumbnailImage) && thumbnailImage.length > 0 ? JSON.stringify(thumbnailImage) : "Null"
      // ...newItemSpecific,
    };
    console.log("Merged Data:", mergedData);
    try {
      const response = await marketPlaceProductUpdate(userId, inventory_id, mergedData);
      console.log(res)
      setHandleUpdateLoader(false);
      toast.success("Product updated successfully");
    } catch (error) {
      console.log(error)
      setHandleUpdateLoader(false);
      handleApiError(error);
    }
  };

  const filteredFirstCategories = firstCategory?.filter((item) =>
    item?.categoryName && item?.categoryName?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const filteredSubcategories = subcategories?.filter((subcategory) => subcategory?.categoryName && subcategory?.categoryName?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const filteredMiddleCategories = middleCategories?.filter((middleCategory) =>
    middleCategory?.categoryName && middleCategory?.categoryName?.toLowerCase()?.includes(searchQuery?.toLocaleLowerCase())
  );

  const filteredLastCategories = lastCategories?.filter((lastCategory) => lastCategory?.categoryName?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex bg-green-50 h-screen justify-center items-center">
        <img
          src={gif}
          alt="Loading..."
          className="lg:ms-[-100px] border p-3 shadow-xl rounded-xl w-[50px] mt-10"
        />
      </div>
    );
  }

  return (
    <section className="lg:px-20 md:px-10 px-2 h-100% pb-20">
      <Toaster position="top-right" />
      <div className="bg-white rounded-lg p-5 shadow-md mt-20">
        <div className="lg:flex lg:space-x-5">
          <div className="lg:w-1/4 flex flex-col space-y-5 border-r border-gray-300 pr-4 text-sm">
            <div className="bg-gray-100 p-4 my-5 rounded-lg space-y-4">
              <div>
                <h4 className="font-bold">Brand</h4>
                <p>{productListing?.brand || productListing.manufacturer ? productListing?.brand || productListing.manufacturer : productListing?.Brand ? productListing?.Brand : "N/A"}</p>
              </div>
              <div>
                <h4 className="font-bold">Category</h4>
                <p>
                  {productListing?.category ? productListing?.category : "N/A"}
                </p>
              </div>
              <div>
                <h4 className="font-bold">Key Features:</h4>
                <h4 className="mb-2">Dimensions:</h4>
                <div>
                  <p>
                    Height: [
                    {productListing?.shipping_length
                      ? productListing?.shipping_length
                      : "N/A"}
                    ] inches
                  </p>
                  <p>
                    Width: [
                    {productListing?.shipping_width
                      ? productListing?.shipping_width
                      : "N/A"}
                    ] inches
                  </p>
                  <p>
                    Depth: [
                    {productListing?.shipping_height
                      ? productListing?.shipping_height
                      : "N/A"}
                    ] inches
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-2">Specifications</h4>
                <p>Variation: Color: Nude</p>
                <p>Parent SKU:</p>
                <p>SKU: {productListing?.sku ? productListing?.sku : "N/A"}</p>
                <p>UPC: {productListing?.upc ? productListing?.upc : "N/A"}</p>
                <p>
                  Category:{" "}
                  {productListing?.category ? productListing?.category : "N/A"}
                </p>
                <p>
                  Brand: {productListing?.brand || productListing.manufacturer ? productListing?.brand || productListing.manufacturer : productListing?.Brand ? productListing?.Brand : "N/A"}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2 p-2 my-3">
                Select Your Marketplace
              </h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 border border-gray-300 p-2 rounded">
                  <Checkbox
                    isSelected={isEbay}
                    onValueChange={setIsEbay}
                    color="success"
                  >
                    <Image isZoomed src="https://i.postimg.cc/3xZSgy9Z/ebay.png" alt="" className="w-20 h-8" />
                  </Checkbox>
                </div>
                <div className="flex items-center space-x-2 border border-gray-300 p-2 rounded">
                  <Checkbox
                    isSelected={isShopify}
                    onValueChange={setIsShopify}
                    color="success"
                  >
                    <Image isZoomed
                      src="https://i.postimg.cc/ZqRGnFZN/shopify.png"
                      alt="shopify"
                      className="w-20 h-8"
                    />
                  </Checkbox>
                </div>
                <div className="flex items-center space-x-2 border border-gray-300 p-2 rounded">
                  <Checkbox
                    isSelected={isWoocommerce}
                    onValueChange={setIsWoocommerce}
                    color="success"
                  >
                    <Image isZoomed
                      src="https://i.postimg.cc/Wbfbs7QB/woocommerce.png"
                      alt="woocommerce"
                      className="w-20 h-8"
                    />
                  </Checkbox>
                </div>
                <div className="flex items-center space-x-2 border border-gray-300 p-2 rounded">
                  <Checkbox
                    isSelected={isWalmart}
                    onValueChange={setIsWalmart}
                    color="success"
                  >
                    <Image isZoomed
                      src="https://i.postimg.cc/vZpK8RPJ/walmart.png"
                      alt="walmart"
                      className="w-20 h-8"
                    />
                  </Checkbox>
                </div>
                <div className="flex items-center space-x-2 border border-gray-300 p-2 rounded">
                  <Checkbox
                    isSelected={isAmazon}
                    onValueChange={setIsAmazon}
                    color="success"
                  >
                    <Image isZoomed
                      src="https://i.postimg.cc/JzYvBDpB/amazon.png"
                      alt="amazon"
                      className="w-20 h-8"
                    />
                  </Checkbox>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-3/4 flex flex-col space-y-5">
            <div>
              <div className="flex items-center text-sm">
                <h3 className="text-lg font-semibold">Product Images</h3>
                <Tooltip content="Add Image">
                  <span>
                    <FaExclamation className="w-5 h-5 cursor-pointer" />
                  </span>
                </Tooltip>
              </div>
              <ProductImageUpload productListing={productListing} thumbnailImage={thumbnailImage} setThumbnailImage={setThumbnailImage} productId={productId} userId={userId} token={token} />
            </div>
            <div>
              <label htmlFor="title" className="font-semibold block">
                Title
              </label>
              <textarea
                name="title" id="title" value={title} onChange={handleTitleChange} placeholder="Enter your title..." className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500" ></textarea>
              <div className={`text-sm mt-1 ${getCharColor(title.length, maxLength)}`}>
                {title.length} of {maxLength} characters
                {title.length > maxLength && ` (Exceeded by ${title.length - maxLength})`}
              </div>
            </div>

            <div>
              <label htmlFor="description" className="font-semibold block">
                Description
              </label>
              <div className="border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                <ReactQuill
                  value={productListing?.detailed_description || productListing?.description || ""}
                  onChange={handleDescriptionChange}
                  theme="snow"
                  placeholder="Enter detailed description..."
                  modules={modules}
                  className="h-[200px] overflow-y-auto"
                  id="folder"
                />
              </div>
            </div>

            <div className="flex justify-between flex-col">
              <div>
                <label>Price</label>
                <input type="text" name="start_price" value={productListing?.start_price || productListing?.price || ""} onChange={handleListingChange} placeholder="Enter price..." className="border border-gray-300 flex flex-col items-center rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>

              <div className="mt-3">
                <label>Brand</label>
                <input type="text" name="brand" value={productListing?.brand || productListing.manufacturer ? productListing?.brand || productListing.manufacturer : productListing?.Brand ? productListing?.Brand : "N/A"} onChange={handleListingChange} placeholder="Enter Brand..." className="border border-gray-300 flex flex-col items-center rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
            </div>

            <DynamicProductInputs
              handleListingChange={handleListingChange}
              productListing={productListing}
            />
            <div className="flex justify-between">
              <div className="flex items-center space-x-2">
                <div>
                  <label className="mb-1 font-semibold">Category Mapping</label>
                </div>
                <div>
                  <input
                    className="w-5 h-5 rounded-lg border border-gray-500 focus:outline-none appearance-none bg-white checked:bg-green-500 checked:border-green-500 relative checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:font-bold checked:after:absolute checked:after:top-0 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:leading-5"
                    type="checkbox"
                    onChange={(e) => setIsMappingChecked(e.target.checked)}
                    checked={isMappingChecked}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div>
                  <label className="mb-1 font-semibold">Gift</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    className="w-5 h-5 rounded-lg border border-gray-500 focus:outline-none appearance-none bg-white checked:bg-green-500 checked:border-green-500 relative checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:font-bold checked:after:absolute checked:after:top-0 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:leading-5"
                    type="checkbox"
                    onChange={(e) => setIsGiftChecked(e.target.checked)}
                    checked={isGiftChecked}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div>
                  <label className="mb-1 font-semibold">Best Offer Enabled</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    className="w-5 h-5 rounded-lg border border-gray-500 focus:outline-none appearance-none bg-white checked:bg-green-500 checked:border-green-500 relative checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:font-bold checked:after:absolute checked:after:top-0 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:leading-5"
                    type="checkbox"
                    onChange={(e) => setBestOfferEnabled(e.target.checked)}
                    checked={bestOfferEnabled}
                  />
                </div>
              </div>
            </div>
            <section>
              {isEbay && (
                <div onClick={() => setIsEbayOpen(!isEbayOpen)} className="bg-gray-50 cursor-pointer p-4 rounded border border-gray-300 my-2">
                  <div className="flex items-center justify-between">
                    <p>
                      <img src="https://i.postimg.cc/3xZSgy9Z/ebay.png" alt="eBay" className="w-20 h-10" />
                    </p>
                    <p>
                      {isEbayOpen ? (
                        <div onClick={() => setIsEbayOpen(!isEbayOpen)}>
                          <MdOutlineKeyboardArrowUp
                            size={30}
                            className="cursor-pointer"
                          />
                        </div>
                      ) : (
                        <div onClick={() => setIsEbayOpen(!isEbayOpen)}>
                          <MdOutlineKeyboardArrowDown
                            size={30}
                            className="cursor-pointer"
                          />
                        </div>
                      )}
                    </p>
                  </div>
                </div>
              )}
              <div>
                {isEbayOpen && isEbay && (
                  <div className="bg-gray-100 p-4 rounded shadow">
                    <div>
                      <label className="my-3 font-bold">Category</label>
                      <div className="flex items-center space-x-2 my-3">
                        <input type="text" value={productListing?.category_id || ""} onChange={handleListingChange} name="category_id" placeholder="Enter category ID"
                          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <Tooltip content="get category">
                          <button type="button" onClick={handleOpenModal} className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-500">
                            {isLoadingCategory ? (
                              <img src={gif} alt="Loading..." className="w-[25px] mx-auto" />
                            ) : (
                              <BiCategoryAlt className="w-5 h-5" />
                            )}
                          </button>
                        </Tooltip>
                      </div>
                      <GetCategory isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} loader={loader} searchQuery={searchQuery} handleSearchChange={handleSearchChange}
                        filteredFirstCategories={filteredFirstCategories} filteredSubcategories={filteredSubcategories} filteredMiddleCategories={filteredMiddleCategories}
                        filteredLastCategories={filteredLastCategories} handleFirstCategoryClick={handleFirstCategoryClick} handleCategoryClick={handleCategoryClick} handleMiddleCategoryClick={handleMiddleCategoryClick} handleLastCategoryClick={handleLastCategoryClick} setIsModalOpen={setIsModalOpen}
                      />
                    </div>
                    {/* <div>
                      <ItemCategory itemCategory={itemCategory} setItemCategory={setItemCategory} />
                    </div> */}

                    <div>
                      <ItemSpecificFields
                        itemSpecificFields={itemSpecificFields}
                        setItemSpecificFields={setItemSpecificFields}
                        // setNewItemSpecific={setNewItemSpecific}
                        // newItemSpecific={newItemSpecific}
                        selectedValues={selectedValues}
                        setSelectedValues={setSelectedValues}
                        handleSelectChange={handleSelectChange}
                        customInputValues={customInputValues}
                        setCustomInputValues={setCustomInputValues}
                        handleInputChange={handleInputChange}
                        filteredOptions={filteredOptions}
                        filterValues={filterValues}
                        setFilterValues={setFilterValues}
                        isDropdownOpen={isDropdownOpen}
                        setIsDropdownOpen={setIsDropdownOpen}
                        toggleDropdown={toggleDropdown}
                        productListing={productListing}
                        handleListingChange={handleListingChange}
                        dropdownRef={dropdownRef}
                      />
                    </div>

                    <div>
                      <ListingPreferences productListing={productListing} setProductListing={setProductListing} enableCharity={enableCharity} setEnableCharity={setEnableCharity} />
                    </div>
                  </div>
                )}
              </div>
              {isShopify && (
                <div className="bg-gray-50 p-4 rounded border border-gray-300">
                  <p>
                    <img
                      src="https://i.postimg.cc/ZqRGnFZN/shopify.png"
                      alt="shopify"
                      className="w-20 h-10"
                    />
                  </p>
                </div>
              )}
              {isWoocommerce && (
                <div className="bg-gray-50 p-4 rounded border border-gray-300">
                  <p>
                    <img
                      src="https://i.postimg.cc/Wbfbs7QB/woocommerce.png"
                      alt="woocommerce"
                      className="w-20 h-10"
                    />
                  </p>
                </div>
              )}
              {isWalmart && (
                <div className="bg-gray-50 p-4 rounded border border-gray-300">
                  <p>
                    <img
                      src="https://i.postimg.cc/vZpK8RPJ/walmart.png"
                      alt="walmart"
                      className="w-20 h-10"
                    />
                  </p>
                </div>
              )}
              {isAmazon && (
                <div className="bg-gray-50 p-4 rounded border border-gray-300">
                  <p>
                    <img
                      src="https://i.postimg.cc/JzYvBDpB/amazon.png"
                      alt="amazon"
                      className="w-20 h-10"
                    />
                  </p>
                </div>
              )}
            </section>

            <div className="bg-gray-50 p-4 rounded shadow">
              <PricingSku
                productListing={productListing}
                handleChange={handleChange}
                setHandleChange={setHandleChange}
                setShippingCost={setShippingCost}
                shippingCost={shippingCost}
              />
            </div>
            {location.state?.isFromUpdate ? (
              <div className="gap-4 mt-5">
                {/* Update Listing Button */}
                <div className="text-center">
                  <button
                    onClick={handleUpdateListing}
                    className="w-full bg-[#089451] text-white rounded h-10 font-bold hover:bg-green-400"
                  >
                    {handleUpdateLoader ? (
                      <img src={gif} alt="Loading..." className="w-[25px] mx-auto" />
                    ) : (
                      <Tooltip content="Update Listing">
                        <div className="flex items-center justify-center gap-2">
                          <span>Update Listing</span>
                          <FaRegSave size={15} className="text-white hover:text-green-600 cursor-pointer" />
                        </div>
                      </Tooltip>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 mt-5">
                {/* Save Listing Button */}
                <div className="text-center">
                  <button
                    onClick={handleSaveListing}
                    className="w-full bg-[#089451] text-white rounded h-10 font-bold hover:bg-green-400"
                  >
                    {handleSaveListingLoader ? (
                      <img src={gif} alt="Loading..." className="w-[25px] mx-auto" />
                    ) : (
                      <Tooltip content="Save Listing">
                        <div className="flex items-center justify-center gap-2">
                          <span>Save Listing</span>
                          <FaRegSave size={15} className="text-white hover:text-green-600 cursor-pointer" />
                        </div>
                      </Tooltip>
                    )}
                  </button>
                </div>

                {/* List Button */}
                <div className="text-center">
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-[#089451] text-white rounded h-10 font-bold hover:bg-green-400"
                  >
                    {handleSubmitLoader ? (
                      <img src={gif} alt="Loading..." className="w-[25px] mx-auto" />
                    ) : (
                      <Tooltip content="List">
                        <div className="flex items-center justify-center gap-2">
                          <span>List</span>
                          <BiListUl size={15} className="text-white hover:text-green-600 cursor-pointer" />
                        </div>
                      </Tooltip>
                    )}
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section >
  );
};

export default Listing;
