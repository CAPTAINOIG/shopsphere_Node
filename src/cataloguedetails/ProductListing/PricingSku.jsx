import { Button, Tooltip } from "@nextui-org/react";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";

const PricingSku = ({
  productListing,
  setHandleChange,
  handleChange,
}) => {
  const [open, setOpen] = useState(false);

  const handleSkuChange = (e) => {
    setHandleChange((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div onClick={handleToggle} className="flex justify-between cursor-pointer shadow bg-white p-3">
        <div className="font-bold">Pricing and SKU</div>
        {!open ? (
          <Tooltip content="Add New Pricing">
            <Button onClick={handleToggle} color="success">
              <FaPlus
                size={15}
                className="text-white float-end hover:text-green-600 cursor-pointer"
              />
            </Button>
          </Tooltip>
        ) : (
          <Tooltip content="close">
            <Button onClick={handleToggle} color="success">
              <FaMinus
                size={15}
                className="text-white float-end hover:text-green-600 cursor-pointer"
              />
            </Button>
          </Tooltip>
        )}
      </div>
      {open && (
        <div className="bg-white shadow mt-3 p-10 rounded-lg">
          <div className="flex justify-between"></div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            <div className="mt-5">
              <label htmlFor="" className="font-semibold">
                Price
              </label>
              <br />
              <div className="flex items-center border-2 border-[#089451]  w-[70%] mt-1 overflow-hidden">
                <span className="bg-gray-100 text-green-600 py-2 px-3 text-lg border-r-2 border-[#089451]">
                  $
                </span>
                <input
                  type="number"
                  // onChange={handleSkuChange}
                  name="price"
                  value={productListing?.selling_price || productListing?.start_price}
                  className="outline-none py-2 px-3 w-full"
                  placeholder="87565444"
                  disabled
                />
              </div>
            </div>

            <div className="mt-5 relative h-[80px]">
              <label htmlFor="" className="font-semibold">
                Quantity
              </label>
              <br />
              <input
                type="number"
                // onChange={handleSkuChange}
                name="quantity"
                value={productListing.quantity || "N/A"}
                className="focus:outline-[#089451] border-2 border-[#089451] mt-1 py-3 ps-4 w-[60%]"
                placeholder="3"
                disabled
              />
            </div>
            <div className="mt-5">
              <label htmlFor="" className="font-semibold">
                Cost
              </label>
              <br />
              <div className="flex items-center border-2 border-[#089451]  w-[70%] mt-1 overflow-hidden">
                <span className="bg-gray-100 text-green-600 py-2 px-3 text-lg border-r-2 border-[#089451]">
                  $
                </span>
                <input
                  type="number"
                  // onChange={handleSkuChange}
                  name="cost"
                  value={productListing.total_product_cost ? productListing.total_product_cost : "N/A"}
                  className="outline-none py-2 px-3 w-full"
                  disabled
                />
              </div>
            </div>

            <div className="mt-2 relative h-[80px]">
              <label htmlFor="" className="font-semibold">
                SKU
              </label>
              <br />
              <input
                type="text"
                // onChange={handleSkuChange}
                name="sku"
                value={productListing.sku ? productListing.sku : "N/A"}
                className="focus:outline-[#089451] border-2 border-[#089451] mt-1 py-3 ps-4 w-[60%]"
                placeholder="21233423"
                disabled
              />
            </div>
          </div>
        </div>
      )}
      <div className="shadow p-4 rounded-lg bg-white mt-5">
        <div className="flex items-center mb-2">
          <span className="text-green-600 text-xl mr-2">🛒</span>
          <span className="text-green-600 font-semibold">
            XL Orange Fendi Travel Case
          </span>
        </div>

        <div className="flex justify-between text-sm mb-4">
          <span>
            <strong>SKU:</strong>{" "}
            {productListing.sku ? productListing.sku : "N/A"}
          </span>
          <span>
            <strong>Stock Quantity : </strong>  
            {productListing.quantity ? productListing.quantity : "N/A"}
          </span>
        </div>

        <hr className="border-t border-gray-300 mb-4" />

        <div className="grid grid-cols-5 gap-4 text-sm">
          <div className="flex flex-col items-start">
            <span>
              <strong>MSRP:</strong>
            </span>
            <span>{productListing.msrp ? `$${productListing.msrp}` : "N/A"}</span>
          </div>
          <div className="flex flex-col items-start">
            <span>
              <strong>MAP:</strong>
            </span>
            <span>{productListing.map ? `$${productListing.map}` : "N/A"}</span>
          </div>
          <div className="flex flex-col items-start">
            <span>
              <strong>Shipping Cost:</strong>
            </span>
            <span>{productListing.shipping_cost ? `$${productListing.shipping_cost}` : "N/A"}</span>
          </div>
          <div className="flex flex-col items-start">
            <span>
              <strong>Unit Cost:</strong>
            </span>
            <span>{productListing.price ? `$${productListing.price}` : "N/A"}</span>
          </div>
          <div className="flex flex-col items-start">
            <span>
              <strong>Total Cost:</strong>
            </span>
            <span>{productListing.total_product_cost ? `$${productListing.total_product_cost}` : "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSku;









