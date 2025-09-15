// useFetchPageData.js
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

export const useFetchPageData = ({isSuccess, hasNextPage, userId, productChange, page, token, selectedProductPerPage, catalogue, formFilters = {}, searchQuery = "", paginationContext = "filter",
}) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isSuccess || !hasNextPage) return;
    const selectedProduct = catalogue.find((item) => item.name === productChange);
    if (!selectedProduct) return;

    const cleanFilters = Object.fromEntries(
      Object.entries(formFilters).filter(([_, v]) => v !== "")
    );
    const queryParams = new URLSearchParams({
      ...cleanFilters,
      ...(paginationContext === "search" && searchQuery
        ? { search: searchQuery }
        : {}),
    }).toString();

    const endpoint = selectedProduct.endpoint.replace("${userId}", userId).replace("${page}", page + 1) +`&limit=${selectedProductPerPage}` +(queryParams ? `&${queryParams}` : "");
    queryClient.prefetchQuery({
      queryKey: [
        "vendorProducts",
        userId,
        productChange,
        page + 1,
        selectedProductPerPage,
        paginationContext === "filter" ? formFilters : {},
        paginationContext === "search" ? searchQuery : "",
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
      staleTime: 10 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      keepPreviousData: true,
    });
  }, [
    isSuccess,
    hasNextPage,
    userId,
    productChange,
    page,
    token,
    selectedProductPerPage,
    catalogue,
    formFilters,
    searchQuery,
    paginationContext,
    queryClient,
  ]);
};

export const useFetchProductPageData = ({
  isSuccess,
  hasNextPage,
  userId,
  page,
  token,
  selectProductPerPage,
  searchQuery = "",
}) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isSuccess || !hasNextPage) return;
    const queryParams = new URLSearchParams({page: page + 1, limit: selectProductPerPage});

    if (searchQuery) {
      queryParams.set("search", searchQuery); 
    }
    const url = `/api/v2/view-all-products/?${queryParams.toString()}`;
    queryClient.prefetchQuery({
      queryKey: [
        "getVendorProducts",
        userId,
        page + 1,
        selectProductPerPage,
        // searchQuery,
      ],
      queryFn: async () => {
        const response = await axiosInstance.get(url);
        return response.data;
      },
      staleTime: 10 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    });
  }, [
    isSuccess,
    hasNextPage,
    userId,
    page,
    token,
    selectProductPerPage,
    searchQuery,
    queryClient,
  ]);
};

