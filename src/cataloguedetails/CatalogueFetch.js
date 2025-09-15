// hooks/useVendorProducts.js
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

export const useGetVendorProducts = ({
  userId,
  productChange,
  page,
  selectedProductPerPage,
  token,
  catalogue,
  formFilters = {},
  paginationContext,
  searchQuery = "",
  filterApplied,
  // selectedIdentifier,
}) => {
  const isFiltering = paginationContext === "filter";
  const isSearching = paginationContext === "search";

  const selectedProduct = catalogue.find((item) => item.name === productChange);
  if (!selectedProduct) throw new Error("Product not found");

  const cleanFilters = Object.fromEntries(
    Object.entries(formFilters).filter(([_, v]) => v !== "")
  );

  const queryParams = new URLSearchParams({
    // ...(selectedIdentifier && { identifier: selectedIdentifier }),
    ...cleanFilters,
    ...(isSearching && searchQuery ? { search: searchQuery } : {}),
  }).toString();

  const endpoint =
    selectedProduct.endpoint
      .replace("${userId}", userId)
      .replace("${page}", page) +
    `&limit=${selectedProductPerPage}` +
    (queryParams ? `&${queryParams}` : "");
  return useQuery({
    queryKey: [
      "vendorProducts",
      userId,
      productChange,
      page,
      selectedProductPerPage,
      isFiltering ? cleanFilters : {},
      //  isFiltering ? JSON.stringify(cleanFilters) : "",
      isSearching ? searchQuery : "",
      // selectedIdentifier,
    ],
    queryFn: async () => {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const rawResults = response.data.results || [];
      const transformed = rawResults.map((item) => ({
        ...item,
        product: {
          ...item.product,
          price: item.price,
          quantity: item.quantity,
        },
      }));

      return {
        products: transformed,
        identifiers: response.data.all_identifiers || [],
        count: response.data.count || 0,
      };
    },
    enabled: (!!userId && !!productChange && !!paginationContext) || filterApplied,
     staleTime: 10 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    keepPreviousData: true,
    
    onError: (error) => {
     toast.error(error.response?.data?.message || "Failed to fetch products");
   },
  });
};

export const useGetProducts = ({
  userId,
  page,
  selectProductPerPage,
  token,
  searchQuery = "",
}) => {
  const queryParams = new URLSearchParams();
  queryParams.set("page", page);
  queryParams.set("limit", selectProductPerPage);

  if (searchQuery) {
    queryParams.set("search", searchQuery); 
  }
  const url = `/api/v2/view-all-products/?${queryParams.toString()}`;
  return useQuery({
    queryKey: ["getVendorProducts", userId, page, selectProductPerPage, searchQuery],
    queryFn: async () => {
      const response = await axiosInstance.get(url);
      return response.data;
    },
    staleTime: 10 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    keepPreviousData: true,
  });
};

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: async ({userId, token, productId }) => {
      return await axiosInstance.delete(`/api/v2/delete-product/${productId}/`,
      );  
  }
});
}