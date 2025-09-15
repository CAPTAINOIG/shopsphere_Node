import React, { useEffect, useRef, useState } from "react";
import { Modal, ModalContent, ModalBody } from "@heroui/react";
import axios from 'axios';
import { toast, Toaster } from 'sonner';
import gif from "../Images/gif.gif";
import { productModal } from "../api/authApi";

const Productmodal = ({ isOpen, onClose, selectProduct, selectProductcontd, selectedProductId, userId, productChange, selectedProductCatalogue, closePopup }) => {

  const dropdownRef = useRef(null);

  const token = localStorage.getItem("token");
  const [myLoader, setMyLoader] = useState(false);

  useEffect(() => {
  }, [selectProduct, selectProductcontd]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getFeatureValue = (name) => {
    if (Array.isArray(selectProduct) && selectProduct.length > 0) {
      const feature = selectProduct.find((item) => item.Name === name);
      return feature?.Value || '';
    }
    return '';
  };

  const updatedProduct = {
    user: parseInt(userId) || 0, 
    Brand: selectProductcontd?.brand || getFeatureValue('Manufacturer') || '',
    Category: selectProductcontd?.category || getFeatureValue('Type') || '',
    Description: selectProductcontd?.detailed_description || '',
    Model: selectProductcontd?.model || getFeatureValue('Model') || '',
    MPN: getFeatureValue('MPN') || '',
    Price: parseFloat(selectProductcontd?.price) || 0,
    Quantity: parseInt(selectProductcontd?.quantity) || 0,
    shipping_height: parseFloat(selectProductcontd?.height || getFeatureValue('ItemHeight')) || 0,
    Shipping_weight: parseFloat(selectProductcontd?.weight || getFeatureValue('ItemWeight')) || 0,
    Shipping_width: parseFloat(selectProductcontd?.width || getFeatureValue('ItemWidth')) || 0,
    msrp: selectProductcontd?.msrp || 0,
    map: selectProductcontd?.map || 0,
    Sku: selectProductcontd?.sku || '',
    Title: selectProductcontd?.title || '',
    Upc: selectProductcontd?.upc || '',
    total_product_cost: selectProductcontd?.total_product_cost || 0,
  };

  const addDetails = async () => {
    setMyLoader(true);
    try {
      const response = await productModal(userId, selectedProductId, productChange, selectedProductCatalogue);
      setMyLoader(false);    
      toast.success('Product added successfully');
      localStorage.setItem('selectProduct', JSON.stringify(updatedProduct));
      closePopup();
      onClose();
    } catch (err) {
      setMyLoader(false);
      toast.error('Request failed, please try again');
    }
  };

  return (
    <Modal
    ref={dropdownRef}
      className="scrollbar-thin z-[10000] !font-mirza !rounded-none scrollbar-thumb-white scrollbar-track-white !p-0 mb-10 md:max-h-[90vh] max-h-[80vh] md:max-w-[50vw] max-w-[90vw]"
      style={{ overflowY: "auto" }}
      isOpen={isOpen}
      onClose={onClose}
      isDismissable={false}
      // showCloseButton={false}
    >
      <ModalContent className="!p-0 font-mirza">
        <ModalBody className="!p-0 font-mirza">
          <div>
            <section className="flex w-full shadow bg-white !p-0">
              <div className="bg-gray-200 flex flex-col gap-5 md:w-[30%] px-2 py-5">
                <div>
                  <h2 className="font-bold">Brand</h2>
                  <div>{selectProductcontd?.brand || getFeatureValue('Manufacturer') || 'N/A'}</div>
                </div>
                <div>
                  <h2 className="font-bold">Category</h2>
                  <div>{selectProductcontd?.category || getFeatureValue('Type') || 'N/A'}</div>
                </div>
                <div>
                  <h2 className="font-bold">Weight</h2>
                  <div>{selectProductcontd?.weight || getFeatureValue('ItemWeight') || 'N/A'}</div>
                </div>
                <div>
                  <div>
                    <p className="font-bold">Key Features:</p>
                  </div>
                  <div>
                    <div>
                      <p>Dimensions:</p>
                    </div>
                    <div className="flex gap-2">
                      <p>Height:</p>
                      <div>{selectProductcontd?.height || getFeatureValue('ItemHeight') || 'N/A'}</div>
                    </div>
                    <div className="flex gap-2">
                      <p>Width:</p>
                      <div>{selectProductcontd?.width || getFeatureValue('ItemWidth') || 'N/A'}</div>
                    </div>
                    <div className="flex gap-2">
                      <p>Depth:</p>
                      <div>{selectProductcontd?.depth || getFeatureValue('ItemLength') || 'N/A'}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <p className="font-bold">Specifications:</p>
                  </div>
                  <div>
                    <div>
                      <p>Variation:</p>
                      <p>{selectProductcontd?.variation || 'N/A'}</p>
                    </div>
                    <div>
                      <p>Parent SKU:</p>
                      <p>{selectProductcontd?.parent_sku || 'N/A'}</p>
                    </div>
                    <div>
                      <p>SKU:</p>
                      <p>{selectProductcontd?.sku || 'N/A'}</p>
                    </div>
                    <div>
                      <p>UPC:</p>
                      <p>{selectProductcontd?.upc || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Category:</p>
                      <p>{selectProductcontd?.category || getFeatureValue('Type') || 'N/A'}</p>
                    </div>
                    <div className="flex gap-1">
                      <p className="font-semibold">Brand:</p>
                      <p>{selectProductcontd?.brand || getFeatureValue('Manufacturer') || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-14 grid grid-cols-1 gap-10 px-5 md:w-[70%]">
                <div className="h-40 flex justify-center items-center w-full">
                  <img
                    className="shadow-sm p-2 w-60 h-40 flex justify-center items-center"
                    src={selectProductcontd?.image || 'https://via.placeholder.com/150'}
                    alt="Product image"
                  />
                </div>
                <div>
                  <div>
                    <p className="font-semibold">Product Name:</p>
                  </div>
                  <div>{selectProductcontd?.title || getFeatureValue('Model') || 'N/A'}</div>
                </div>
                <div>
                  <div>
                    <p className="font-semibold">Product Detail:</p>
                  </div>
                  <p>{selectProductcontd?.detailed_description || 'No description available'}</p>
                </div>
                <div>
                  <div>
                    <p className="font-semibold">Product Features:</p>
                  </div>
                  <div>
                    <ol className="grid grid-cols-1 gap-5">
                      <li className="w-[70%]">
                        <div>{getFeatureValue('AdditionalFeature1') || 'N/A'}</div>
                      </li>
                      <li className="w-[70%]">
                        <div>{getFeatureValue('AdditionalFeature2') || 'N/A'}</div>
                      </li>
                      <li className="w-[70%]">
                        <div>{getFeatureValue('AdditionalFeature3') || 'N/A'}</div>
                      </li>
                    </ol>
                  </div>
                  <div 
                    className="my-10 flex justify-center h-10 cursor-pointer items-center bg-[#098451] text-white md:mx-[120px] mx-5 border hover:bg-white hover:text-[#089451] hover:border-[#089451]"
                    onClick={addDetails}
                  >
                    {myLoader ? <img src={gif} alt="Loading" className="w-[25px]" /> : 'Add Product'}
                  </div>
                </div>
              </div>
              <Toaster position="top-right" />
            </section>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Productmodal;