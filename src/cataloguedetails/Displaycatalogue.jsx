import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast, Toaster } from "sonner";
import {
  Button,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import CatalogueSkeleton from "./CatalogueSkeleton";
import CatalogueGridSkeleton from "./CatalogueGridSkeleton";
import { IoIosCart } from "react-icons/io";
import { IoPricetag } from "react-icons/io5";
import { addSingleProduct } from "../api/authApi";

const Displaycatalogue = ({
  selectedProductCatalogue,
  isLoading,
  productsToRender,
  error,
  currentItems,
  handleProductClick,
  productChange,
  viewMode,
  token,
  store,
  userId,
  handleCatalogue,
  checkedItems,
  setCheckedItems,
  loader,
  multiSelect,
}) => {
  
  const [loading, setLoading] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [imageErrors, setImageErrors] = useState({}); 

  const handleCheckbox = (product) => {
    if (checkedItems.includes(product.id)) {
      setCheckedItems(checkedItems.filter((item) => item !== product.id));
    } else {
      setCheckedItems([...checkedItems, product.id]);
    }
  };

  const addSingleToProduct = async (productId) => {
    setLoading(true);
    try {
      const response = await addSingleProduct(userId, productId, productChange, selectedProductCatalogue);
      toast.success(`Product added successfully`);
      setLoading(false);
    } catch (err) {
      toast.error('Failed to add product. Please select identifier and try again!');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // Function to strip HTML tags
  const stripTags = (html) => html.replace(/<[^>]*>/g, "");

  // Function to get the appropriate image
  const getProductImage = (product) => {
    let images = [];
    try {
      const parsedImages =
        typeof product?.images === "string"
          ? JSON.parse(product?.images)
          : product?.images;
      if (Array.isArray(parsedImages) && parsedImages.length > 0) {
        images = parsedImages;
      }
    } catch (error) {
    }
    [
      "largeImageUrl",
      "imagename",
      "image_300x300_url",
      "imageurl",
      "imagelink",
    ].forEach((key) => {
      if (product?.[key]) images.push(product[key]);
    });
    const uniqueImages = [...new Set(images)];
    // Return single image if only one exists, otherwise return second image if available
    return uniqueImages.length === 1
      ? uniqueImages[0]
      : uniqueImages[1] || uniqueImages[0] || null;
  };

  // Generate descriptive alt text
  const getProductAltText = (product, hasError) => {
    if (hasError) return "Image not available";
    const productName =
      product?.desc1 ||
      product?.model ||
      product?.title ||
      product?.productName ||
      "Product";
    return `Image of ${productName}`;
  };

  // Handle image loading error
  const handleImageError = (productId) => {
    setImageErrors((prev) => ({ ...prev, [productId]: true }));
  };

  return (
    <div className="bg-[#E7F2ED] mt-20 w-full min-w-full">
      <Toaster position="top-right" />
      {isLoading &&
        viewMode === "list" &&
        Array.from({ length: 5 }).map((_, idx) => (
          <CatalogueSkeleton key={idx} />
        ))}
      {isLoading && viewMode === "grid" && <CatalogueGridSkeleton />}

      {error ? (
        <div className="text-red-500 text-xl mb-4 text-center w-full">
          {error}
        </div>
      ) : (
        // List view
        <div className="flex gap-6 mb-34 w-full min-w-full">
          <div className="rounded-lg overflow-hidden w-full min-w-full">
            {!isLoading &&
              (productsToRender?.length === 0 && currentItems?.length === 0 ? (
                <div className="text-red-500 bg-[#E7F2ED] h-screen text-xl text-center mt-20 w-full">
                  Sorry, we couldn't find any results
                </div>
              ) : (
                <>
                  {viewMode === "list" ? (
                    <div className="list-view-container w-full min-w-full">
                      {productsToRender.map((product, index) => (
                        <div
                          key={index}
                          className={`${checkedItems.includes(product?.id) ? "border border-[#089451]" : "border border-gray-200"} group flex flex-col sm:flex-row justify-between p-4 gap-4 items-start w-full bg-white rounded-lg ps-7 relative mb-5 hover:shadow-lg`}
                        >
                          {!!multiSelect && (
                            <div className="absolute top-28 left-2 -z-1">
                              <input
                                type="checkbox"
                                className={`w-4 h-4 appearance-none border-1 border-[#089451] rounded ${checkedItems.includes(product?.id)
                                    ? "bg-[#089451] border-[#089451]"
                                    : ""
                                  }`}
                                checked={checkedItems.includes(product?.id)}
                                onChange={() => handleCheckbox(product)}
                              />
                            </div>
                          )}

                          <div className="flex gap-4 w-full sm:w-2/3">
                            <div className={`${productChange === "fragrancex" ? "object-cover min-w-[120px] max-w-[150px] h-[200px] -z-1 border border-gray-200 rounded p-2" : "min-w-[120px] max-w-[170px] h-[200px] flex items-center justify-center rounded overflow-hidden bg-white border border-gray-100 p-2"}`}>
                              {imageErrors[product?.id] ||
                                !getProductImage(product) ? (
                                <span className="text-gray-500 text-xs text-center px-2">
                                  Image not available
                                </span>
                              ) : (
                                <Image
                                  isZoomed
                                  src={getProductImage(product)}
                                  alt={getProductAltText(
                                    product,
                                    imageErrors[product?.id]
                                  )}
                                  className="object-cover min-w-[140px] max-w-[140px] h-[180px] -z-1"
                                  onError={() => handleImageError(product?.id)}
                                />
                              )}
                            </div>

                            <div className="flex flex-col justify-start gap-2 text-sm flex-1">
                              <p className="text-base font-semibold text-gray-900 line-clamp-2 space">
                                {product?.desc1 ||
                                  product?.model ||
                                  product?.title ||
                                  product?.productName ||
                                  ""}
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
                                    {product?.upc ||
                                      product?.upccode ||
                                      product?.upc_code ||
                                      "N/A"}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-gray-600">
                                    Category:
                                  </span>
                                  <span className="bg-blue-100 text-xs px-2 py-1 rounded">
                                    {product?.type ||
                                      product?.category_name ||
                                      product?.category}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-gray-600">
                                    Brand:
                                  </span>
                                  <span className="bg-yellow-100 text-xs px-2 py-1 rounded md:ms-4">
                                    {product?.brand ||
                                      product?.manufacturer ||
                                      product?.brandName ||
                                      product?.manufacturer_name}
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
                              <p className="text-xs text-gray-600 mt-1 line-clamp-3">
                                {stripTags
                                  ? stripTags(
                                    product?.description ||
                                    product?.description1 ||
                                    product?.full_description
                                  ) || "No description available"
                                  : product?.description ||
                                  product?.description1 ||
                                  product?.full_description ||
                                  "No description available"}
                              </p>
                            </div>
                          </div>

                          <div className="w-1/4 md:mt-14 md:ms-0 ms-40 p-3 text-center text-sm flex gap-5">
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
                                <span className="text-xl font-bold text-gray-800">{product.quantity || 0}</span>
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
                                <span className="text-xl font-bold">${(product.price || 0)}</span>
                              </div>
                            </div>
                          </div>

                          <Popover placement="bottom" showArrow={true}>
                            <PopoverTrigger className="absolute top-10 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 right-6 bg-green-50 rounded-[100%] -z-1 cursor-pointer text-[#089451]">
                              <button>
                                <BsThreeDotsVertical size={20} />
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="px-1 py-2 me-10 -ms-10">
                              <div className="px-1 py-2">
                                <div>
                                  <div
                                    className="hover:bg-gray-900 cursor-pointer bg-[#089451] text-center rounded px-2 p-1 text-white"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleProductClick(product);
                                    }}
                                  >
                                    View product details
                                  </div>
                                  <div
                                    className="hover:bg-orange-700 cursor-pointer bg-[#BB8232] text-white my-2 text-center rounded"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      addSingleToProduct(product?.id);
                                    }}
                                  >
                                    Add to product
                                  </div>
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid gap-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                      {productsToRender.map((product, index) => (
                        <div
                          className="grid grid-cols-10 items-center"
                          key={index}
                        >
                          <div
                            onClick={() => handleProductClick(product)}
                            className="flex flex-col col-span-11 items-center shadow-md cursor-pointer relative group rounded-lg bg-white w-full p-4 overflow-hidden border border-gray-200"
                          >
                            <div className="absolute top-0 left-0 bg-[#027840] text-white text-xs px-3 py-1 rounded-tl-lg rounded-br-lg font-medium">
                              <p>
                                {product?.brand ||
                                  product?.brandName ||
                                  product?.manufacturer ||
                                  product?.manufacturer_name}
                              </p>
                            </div>

                            <div className="flex justify-center items-center w-full mt-6 mb-4">
                              {!!multiSelect && (
                                <div className="lg:-ms-10 md:ms-0 -ms-12">
                                  <input
                                    type="checkbox"
                                    className={`lg:mr-5 ms:mr-5 md:mr-3 w-4 h-4 col-span-1 appearance-none border-1 border-[#089451] rounded ${checkedItems.includes(product?.id)
                                        ? "bg-[#089451] border-[#089451]"
                                        : ""
                                      }`}
                                    checked={checkedItems.includes(product?.id)}
                                    onChange={() => handleCheckbox(product)}
                                  />
                                </div>
                              )}
                              <div className="h-40 w-40 flex justify-center items-center border border-gray-200 rounded-md">
                                {imageErrors[product?.id] ||
                                  !getProductImage(product) ? (
                                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs bg-[#f5f5f5] rounded-md">
                                    <svg
                                      width="32"
                                      height="24"
                                      viewBox="0 0 32 24"
                                      fill="none"
                                      className="text-gray-400"
                                    >
                                      <path
                                        d="M8 6h16v14H8V6z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        fill="none"
                                      />
                                      <path
                                        d="M12 6V4a2 2 0 014 0v2"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        fill="none"
                                      />
                                      <path
                                        d="M14 10h4"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                      />
                                    </svg>
                                  </div>
                                ) : (
                                  <Image
                                    isZoomed
                                    src={getProductImage(product)}
                                    alt={getProductAltText(
                                      product,
                                      imageErrors[product?.id]
                                    )}
                                    className="object-cover min-w-[140px] max-w-[140px] h-[140px] rounded-md -z-1"
                                    onError={() =>
                                      handleImageError(product?.id)
                                    }
                                  />
                                )}
                              </div>
                            </div>

                            <div className="text-center mb-4 px-2">
                              <h3 className="text-sm font-medium text-gray-900 leading-tight">
                                {product?.model ||
                                  product?.productName ||
                                  product?.title ||
                                  product?.desc1 ||
                                  "N/A"}
                              </h3>
                            </div>

                            <div className="w-full space-y-2 mb-4">
                              <div className="bg-[#BB823233] rounded px-3 py-1.5 text-xs break-words max-w-[200px] mx-auto text-center">
                                <span className="text-gray-600">SKU: </span>
                                <span className="text-gray-800 font-medium">
                                  {product?.sku || product?.itemnumber || "N/A"}
                                </span>
                              </div>

                              <div className="bg-[#00000033] rounded px-3 py-1.5 mx-auto text-xs text-center break-words max-w-[200px]">
                                <span className="text-gray-600">Brand: </span>
                                <span className="text-gray-800 font-medium">
                                  {product?.brand ||
                                    product?.brandName ||
                                    product?.manufacturer ||
                                    product?.manufacturer_name ||
                                    "N/A"}
                                </span>
                              </div>
                            </div>

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
                                <span className="text-sm font-bold text-gray-800">{product.quantity || 0}</span>
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
                                <span className="text-sm font-bold">${(product.price || 0)}</span>
                              </div>
                            </div>
                          </div>

                            <Popover placement="bottom" showArrow={true}>
                              <PopoverTrigger className="absolute top-8 right-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 bg-green-50 rounded-full cursor-pointer text-[#089451] p-1 -z-1">
                                <button>
                                  <BsThreeDotsVertical size={16} />
                                </button>
                              </PopoverTrigger>
                              <PopoverContent className="z-50 bg-white shadow-md rounded p-2 me-10 -ms-10">
                                <div className="px-1 py-2">
                                  <div>
                                    <div
                                      className="hover:bg-gray-900 cursor-pointer bg-[#089451] text-center rounded px-2 py-1 text-white text-sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleProductClick(product);
                                      }}
                                    >
                                      View product details
                                    </div>
                                    <div
                                      className="hover:bg-orange-700 cursor-pointer bg-[#BB8232] text-white my-2 text-center rounded px-2 py-1 text-sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        addSingleToProduct(product?.id);
                                      }}
                                    >
                                      Add to product
                                    </div>
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Displaycatalogue;
