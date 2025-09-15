import React, { useEffect, useState } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import axios from "axios";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";

const ListingPreferences = ({ productListing, setProductListing, enableCharity, setEnableCharity }) => {
  const token = localStorage.getItem("token");

  const userId = localStorage.getItem("userId");

  const [open, setOpen] = useState(false);
  const [listingPreferences, setListingPreferences] = useState('');
  const [shipPolicyToggle, setShipPolicyToggle] = useState(false);
  const [returnPolicyToggle, setReturnPolicyToggle] = useState(false);
  const [paymentPolicyToggle, setPaymentPolicyToggle] = useState(false);
  const [shipName, setShipName] = useState("");
  const [returnName, setReturnName] = useState("");
  const [paymentName, setPaymentName] = useState("");

  const handleToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (!userId) {
      console.error("User ID not found. Please check your session.");
      return;
    }
    const fetchPreferences = async () => {
      try {
        const res = await axios.get(
          `https://service.swiftsuite.app/marketplaceApp/refresh_connection/${userId}/Ebay/`
        );
        setListingPreferences(res.data);
      } catch (error) {
        if (error.response) {
          const { status } = error.response;
          if ([400, 402].includes(status)) {
            console.error("Failed to populate listing preferences");
          } else if (status === 500) {
            console.error("Internal server error. Please contact support.");
          } else {
            console.error(`Error ${status}: Something went wrong.`);
          }
        } else if (error.request) {
          console.error("Network error. Please check your internet connection.");
        } else {
          console.error("Unexpected error occurred.");
        }
      }
    };

    fetchPreferences();
  }, [userId]);

  // const handleFixed = (e) => {
  //   setFixed(e.target.checked);
  //   setAuction(!e.target.checked);
  // };
  // const handleAuction = (e) => {
  //   setAuction(e.target.checked);
  //   setFixed(!e.target.checked);
  // };

  const handleCharity = (e) => {
    setEnableCharity(e.target.checked);
  };

  const shipPolicyClick = () => {
    setShipPolicyToggle(!shipPolicyToggle);
  };
  const returnPolicyClick = () => {
    setReturnPolicyToggle(!returnPolicyToggle);
  };
  const paymentPolicyClick = () => {
    setPaymentPolicyToggle(!paymentPolicyToggle);
  };

  const handleSelect = (type, id, name) => {
    // setPolicy({ id: id, name });
    if (type === "shipping_policy") {
      setShipName(name);
      setShipPolicyToggle(false);
    } else if (type === "return_policy") {
      setReturnName(name);
      setReturnPolicyToggle(false);
    } else if (type === "payment_policy") {
      setPaymentName(name);
      setPaymentPolicyToggle(false);
    }
  };

  const handleCharityPercentage = (e) => {
    const { name, value } = e.target;
    setProductListing((prev) => ({ ...prev, [name]: value }));
  };

  const fulfillmentPolicies = listingPreferences.fulfillment_policies?.fulfillmentPolicies || [];
  const paymentPolicies = listingPreferences.payment_policies?.paymentPolicies || [];
  const returnPolicies = listingPreferences.return_policies?.returnPolicies || [];

  return (
    <div>
      <div
        onClick={handleToggle}
        className="flex justify-between cursor-pointer shadow bg-gray-200 mt-5 p-3 rounded-md"
      >
        <div className="font-bold">LISTING PREFERENCES</div>
        {!open ? (
          <Tooltip content="Add New Pricing">
            <Button onClick={handleToggle} color="success" size="10">
              <FaPlus
                size={15}
                className="text-white float-end hover:text-green-600 cursor-pointer"
              />
            </Button>
          </Tooltip>
        ) : (
          <Tooltip content="Close">
            <Button onClick={handleToggle} color="success" size="10">
              <FaMinus
                size={15}
                className="text-white float-end hover:text-green-600 cursor-pointer"
              />
            </Button>
          </Tooltip>
        )}
      </div>
      {open && productListing && (
        <div className="bg-white shadow mt-3 lg:p-20 md:p-20 p-10 rounded-lg">
          <div>
            <p className="font-bold my-3">ITEM LOCATION</p>
            <p className="my-3">COUNTRY</p>
            <div className="mt-2 relative h-[80px]">
              <input
                type="text"
                readOnly
                name="country"
                value={productListing?.country ?? ""}
                // value={productListing?.vendor_location[0]?.country ?? ""}
                className="focus:outline-[#089451] border-2 border-[#089451] mt-1 py-3 ps-4 w-full"
                placeholder="Texas"
              />
            </div>
          </div>

          <div className="mt-2 relative h-[80px]">
            <label htmlFor="" className="font-semibold">
              Zip code
            </label>
            <br />
            <input
              type="text"
              readOnly
              value={productListing?.zip_code || productListing?.postal_code || ""}
              // value={productListing?.vendor_location[0]?.zip_code || ""}
              className="focus:outline-[#089451] border-2 border-[#089451] mt-1 py-3 ps-4 w-full"
            />
          </div>

          <div className="mt-2 relative h-[80px]">
            <label htmlFor="" className="font-semibold">
              City/State
            </label>
            <br />
            <input
              type="text"
              name="city"
              readOnly
              value={productListing?.city || ""}
              // value={productListing?.vendor_location[0]?.city || ""}
              className="focus:outline-[#089451] border-2 border-[#089451] mt-1 py-3 ps-4 w-full"
              placeholder="Texas"
            />
          </div>
          {/* <div>
            <h1 className="font-bold mt-3">LISTING TYPE</h1>
            <div className="flex gap-2">
              <div>
                <label htmlFor="">Fixed</label>
                <input type="checkbox" onChange={handleFixed} checked={fixed} className="ml-2" />
              </div>
              <div>
                <label htmlFor="">Auction</label>
                <input type="checkbox" onChange={handleAuction} checked={auction} className="ml-2" />
              </div>
            </div>
          </div> */}
          <section>
            <h1 className="md:ms-5 font-bold text-xl my-4">Business Policy</h1>
            <div className="my-3 " onClick={shipPolicyClick}>
              <div className="flex lg:gap-20 md:gap-12 md:px-5">
                <h3 className="text-sm w-[55%] md:w-[52%] lg:w-[30%]">
                  Shipping Policy:
                </h3>
                <div className="md:w-[230px] w-[180px] relative">
                  <div className="flex focus:outline-[#089451] border-2 cursor-pointer border-[#089451] lg:w-[100%] md:w-[100%] w-[100%] justify-between py-1 px-3 rounded">
                    <span>{shipName || productListing?.shipping_policy?.name || productListing?.shipping_profileName || productListing?.shipping_profilename || "Select Policy"}</span>
                    <span className="mt-1 text-xl cursor-pointer">
                      <MdArrowDropDown />
                    </span>
                  </div>
                  <div id="folder"
                    className={
                      shipPolicyToggle ? "absolute w-full z-30 overflow-y-auto max-h-[30vh] bg-white shadow" : "hidden"
                    }
                  >
                    {fulfillmentPolicies.map((items, i) => (
                      <div key={i} className="hover:bg-green-50 m-2" onClick={() => handleSelect("shipping_policy", items?.fulfillmentPolicyId, items?.name)}>
                        {items.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="my-10" onClick={returnPolicyClick}>
              <div className="flex lg:gap-20 md:gap-12 md:px-5">
                <h3 className="mt-2 text-sm w-[55%] md:w-[52%] lg:w-[30%]">
                  Return Policy:
                </h3>
                <div className="md:w-[230px] w-[180px] relative">
                  <div className="flex focus:outline-[#089451] cursor-pointer border-2 border-[#089451] lg:w-[100%] md:w-[100%] w-[100%] justify-between py-1 px-3 rounded">
                    <span>{returnName || productListing?.return_policy?.name || productListing?.return_profileName || productListing?.return_profilename || "Select Policy"}</span>
                    <span className="mt-1 text-xl cursor-pointer">
                      <MdArrowDropDown />
                    </span>
                  </div>
                  <div id="folder"
                    className={
                      returnPolicyToggle ? "absolute w-full z-20 overflow-y-auto max-h-[30vh] bg-white shadow" : "hidden"
                    }
                  >
                    {returnPolicies.map((items, i) => (
                      <div key={i} className="hover:bg-green-50 m-2" onClick={() => handleSelect("return_policy", items?.returnPolicyId, items?.name)}>
                        {items.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="my-10" onClick={paymentPolicyClick}>
              <div className="flex lg:gap-20 md:gap-12 md:px-5">
                <h3 className="mt-2 text-sm w-[55%] md:w-[52%] lg:w-[30%]">
                  Payment Policy:
                </h3>
                <div className="md:w-[230px] w-[180px] relative">
                  <div className="flex focus:outline-[#089451] cursor-pointer border-2 border-[#089451] lg:w-[100%] md:w-[100%] w-[100%] justify-between py-1 px-3 rounded">
                    <span>{paymentName || productListing?.payment_policy?.name || productListing?.payment_profileName || productListing?.payment_profilename || "Select Policy"}</span>
                    <span className="mt-1 text-xl cursor-pointer">
                      <MdArrowDropDown />
                    </span>
                  </div>
                  <div id="folder"
                    className={
                      paymentPolicyToggle ? "absolute w-full z-10 bg-white shadow overflow-y-auto max-h-[30vh]" : "hidden"
                    }
                  >
                    {paymentPolicies.map((items, i) => (
                      <div key={i} className="hover:bg-green-50 m-2" onClick={() => handleSelect("payment_policy", items?.paymentPolicyId, items?.name)}>
                        {items?.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* {productListing?.enable_charity && ( */}
            <>
              <h1 className="my-3 font-bold">CHARITY DONATION</h1>
              <div className="flex items-center gap-2">
                <label htmlFor="" className="font-semibold">Enable Charity</label>
              <div>
                <input type="checkbox" onChange={handleCharity} checked={enableCharity} className="w-5 h-5 rounded-lg border border-gray-500 focus:outline-none appearance-none bg-white checked:bg-green-500 checked:border-green-500 relative checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:font-bold checked:after:absolute checked:after:top-0 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:leading-5 mt-2" />
              </div>
              </div>

              {enableCharity && (
                <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
                  <div>
                    <p className="my-3">Charity ID</p>
                    <input type="text" name="charity_id" value={productListing?.charity_id || ""} onChange={handleCharityPercentage} placeholder="Enter Charity ID..." className="flex flex-col items-center rounded focus:outline-[#089451] border-2 border-[#089451] py-2 ps-2" />
                  </div>
                  <div className="mt-5">
                    <p>Donation Percentage</p>
                    <input
                      type="number"
                      name="donation_percentage"
                      className="focus:outline-[#089451] border-2 border-[#089451] mt-1 py-2 ps-4 lg:w-[30%] md:w-[50%] w-[100%]"
                      placeholder="%"
                      value={productListing?.donation_percentage || ""}
                      onChange={handleCharityPercentage}
                    />
                  </div>
                </div>
             )}
            </>
          {/* )} */}
        </div>
      )}
    </div>
  );
};

export default ListingPreferences;
