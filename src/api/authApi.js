import axiosInstance from "../utils/axiosInstance";

// Account Tier
export const accountTier = async () => {
  const response = await axiosInstance.get("/accounts/account-tier/")
  return response.data;
}
// Signup
export const signup = async (userData) => {
  const response = await axiosInstance.post("/accounts/register/", userData);
  return response.data;
};

// Signin
export const signin = async (credentials) => {
  const response = await axiosInstance.post("/accounts/login/", credentials);
  return response.data;
};

// Forgot Password
export const forgotPassword = async (email) => {
  const response = await axiosInstance.post("/accounts/password_reset/", { email });
  return response.data;
};

// Reset Password
export const resetPassword = async (uidb64, token, password, confirm_password) => {
  const response = await axiosInstance.patch(`/accounts/set_new_password/`, { uidb64, token, password, confirm_password });
  return response.data;
};

// Send OTP
export const sendotp = async (email) => {
  const response = await axiosInstance.post("/accounts/send-otp/", { email });
  return response.data; 
};

// Verify Email
export const verifyEmail = async (otp) => {
  const response = await axiosInstance.post(`/accounts/verify_email/`, { otp });
  return response.data;
};

// Dashboard
export const dashboard = async () => {
  const response = await axiosInstance.get("/user/dashboard/");
  return response.data;
};

// ✅ Fetch All Vendor Enrolled
export const fetchVendorEnrolled = async () => {
  const response = await axiosInstance.get("/api/v2/all-enrolled-vendors/");
  return response.data;
};

// Vendor Enrolment
export const fetchAllVendors = async () => {
  const response = await axiosInstance.get("/api/v2/vendor/");
  return response.data;
};

// Upload Image
export const uploadImage = async (formData) => {
  const response = await axiosInstance.put(`/accounts/user-profile/`, formData);
  return response.data;
};

// Get Image
export const getImage = async (payload) => {
  const response = await axiosInstance.get(`/accounts/user-profile/`);
  return response.data;
};

export const vendorSelection = async (vendorId) => {
  const response = await axiosInstance.get("/api/v2/vendor-account/", { params: { vendor_id: vendorId } });
  return response.data;
}

// Fpi Credential
export const fpiCredential = async (payload) => {
  const response = await axiosInstance.post(`/api/v2/vendor-test/`, payload );
  return response;
};

// Enrolment
export const enrolment = async (formData) => {
  const response = await axiosInstance.post('/api/v2/enrollment/', formData);
  return response;
};

// Product Modal
export const productModal = async (userId, selectedProductId, productChange, selectedProductCatalogue) => {
  const response = await axiosInstance.get(`/api/v2/add-to-product/${userId}/${selectedProductId}/${productChange}/${selectedProductCatalogue}/`);
  return response.data;
};

// Product Click Request
export const productClickRequest = async (userId, productId, productChange) => {
  const response = await axiosInstance.get(`/api/v2/add-to-product/${userId}/${productId}/${productChange}/`);
  return response.data;
};

// Product Details
export const productDetails = async (userId, selectedProductId, handleCatalogue, selectedProductCatalogue) => {
  const response = await axiosInstance.put(`/vendor/add-to-product/${userId}/${selectedProductId}/${handleCatalogue}/${selectedProductCatalogue}/`);
  return response.data;
};

// Add Single Product
export const addSingleProduct = async (userId, productId, productChange, selectedProductCatalogue) => {
  const response = await axiosInstance.put(`/api/v2/add-to-product/${userId}/${productId}/${productChange}/${selectedProductCatalogue}/`);
  return response.data;
}

// Add All Products
export const addAllProducts = async (userId, productId, productChange) => {
  const response = await axiosInstance.get(`/api/v2/add-to-product/${userId}/${productId}/${productChange}/`);
  return response.data;
}

// Product Update Request
export const productUpdateRequest = async (userId, store, handleCatalogue, selectedProductCatalogue) => {
  const response = await axiosInstance.put(
    `/vendor/add-to-product/${userId}/${store}/${handleCatalogue}/${selectedProductCatalogue}/`
  );
  return response.data;
};

// Listing image
export const uploadListingImage = async (userId, productId, formData) => {
  const response = await axiosInstance.post(`/marketplaceApp/upload_product_image/${productId}/frangranxrollup/${userId}/`, formData);
  return response.data;
};

// Get Listing image
export const getListingImage = async (userId, productId) => {
  const response = await axiosInstance.get(`/marketplaceApp/get_uploaded_images/${productId}/frangranxrollup/${userId}/`);
  return response.data;
};

// Delte Listing image
export const deleteListingImage = async (imageName, imageId) => {
  const response = await axiosInstance.get(`/marketplaceApp/delete_uploaded_images/${imageName}/${imageId}/`);
  return response.data;
}
// Order
export const orderProduct = async (userId, page, selectedOrderPerPage) => {
  // axiosInstance.get(`/orderApp/get_ebay_orders/$
  const response = await axiosInstance.get(`/orderApp/get_ebay_orders/${userId}/${page}/${selectedOrderPerPage}/`);
  return response.data;
};

// Get Order Details
export const getOrderDetails = async (userId, orderId) => {
  const response = await axiosInstance.get(`/orderApp/get_ordered_item_details/${userId}/Ebay/${orderId}/`);
  return response.data;
};

// Listing
// Fetch Product Listing
export const fetchProductListing = async (userId, productId) => {
  const response = await axiosInstance.get(`/marketplaceApp/get_product_to_list_details/${userId}/Ebay/${productId}/`);
  return response.data;
};

// Fetch Product Saving
export const fetchProductSaving = async (userId, productId) => {
  const response = await axiosInstance.get(`/marketplaceApp/get_product_to_list_details/${userId}/Ebay/${productId}/`);
  return response.data;
};

// Fetch Product Update
export const fetchProductUpdate = async (productId) => {
  const response = await axiosInstance.get(`/inventoryApp/get_saved_product_for_listing/${productId}/`);
  return response.data;
}

// Item Specific Category
export const userCategoriesId = async (userId, userCategoryId) => {
  const response = await axiosInstance.get(`/marketplaceApp/get_item_specific_fields/${userId}/Ebay/${userCategoryId}/`);
  return response.data;
}

// Fetch User Category Id
export const fetchUserCategoryId = async (userId, productId) => {
  const response = await axiosInstance.get(`/marketplaceApp/get_product_to_list_details/${userId}/Ebay/${productId}/`);
  return response.data;
}

// Get Item Leaf Category
export const fetchItemLeafCategory = async (userId, categoryId) => {
  const response = await axiosInstance.get(`/marketplaceApp/get_item_leaf_category/${userId}/Ebay/${categoryId}/`);
  return response.data;
}

// Product Listing 
export const marketplaceProductListing = async (userId, category_id, listingData) => {
  const response = await axiosInstance.post(`/marketplaceApp/marketplace_product_listing/${userId}/Ebay/${category_id}/`, listingData);
  return response.data;
}

// Product Saving
export const marketplaceProductSaving = async (userId, category_id, savingData) => {
  const response = await axiosInstance.post(`/marketplaceApp/save_product_before_listing/${userId}/${category_id}/`, savingData);
  return response.data;
}

// marketPlace Product Update
export const marketPlaceProductUpdate = async (inventory_id, userId, updateData) => {
  const response = await axiosInstance.put(`/inventoryApp/update_ebay_item_details/${inventory_id}/${userId}/`, updateData);
  return response.data;
};

// Delete product (local inventory or eBay)
export const deleteProduct = async (userId, id, endOnEbay = false) => {
  const endpoint = endOnEbay ? `/inventoryApp/end_and_delete_product_from_ebay/${userId}/${id}/`: `/inventoryApp/delete_product_from_inventory/${id}/`;
  return axiosInstance.get(endpoint);
};

// Delete product from Inventory
export const deleteProductFromInventory = async (id) => {
  const response = await axiosInstance.get(`/inventoryApp/delete_product_from_inventory/${id}/`);
  return response.data;
};