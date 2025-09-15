import React, { useEffect, useState } from "react";
import { Image } from "@heroui/react";
import {
  ArrowLeft,
  CheckCircle,
  Mail,
  Package,
  Phone,
  Truck,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getOrderDetails } from "../api/authApi";

const OrderDetails = () => {
  const orderId = JSON.parse(localStorage.getItem("orderId"));
  const userId = localStorage.getItem("userId");

  const [orderItem, setOrderItem] = useState([]);
  const [loader, setLoader] = useState(false);
  const [trackingSent, setTrackingSent] = useState(false);
  const [shipping, setShipping] = useState(true);
  const [orderNotes, setOrderNotes] = useState("");
  const [itemFields, setItemFields] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoader(true);
    try {
      const response = await getOrderDetails(userId, orderId);
      const ordered_details = response.ordered_details;
      const product_data = response.product_data || [];
      setOrderItem({ ...ordered_details, ...(product_data[0] || {}) });
      if (product_data.length > 0 && product_data[0].item_specific_fields) {
        let item_specific_fields = product_data[0].item_specific_fields;
        if (typeof item_specific_fields === "string") {
          item_specific_fields = item_specific_fields.replace(/'/g, '"');
        }
        try {
          const parsedFields = JSON.parse(item_specific_fields);
          const brand = parsedFields.find((f) => f.name === "Brand")?.value || "Unknown";
          const color = parsedFields.find((f) => f.name === "Color")?.value || "N/A";
          const upc = parsedFields.find((f) => f.name === "UPC")?.value || "N/A";
          setItemFields({ brand, color, upc });
        }
        catch (error) {
        }
      } else {
      }
    } catch (err) {
    } finally {
      setLoader(false);
    }
  };


  const handleTrackingSentChange = (e) => {
    setTrackingSent(e.target.checked);
  };
  const handleShipping = (e) => {
    setShipping(e.target.checked);
  };

  const handleSaveNotes = (e) => {
    setOrderNotes(e.target.value);
  };

  return (
    <div>
      {loader ? (
        <div className="px-10 mt-20">
          <div className="w-full bg-[#E7F2ED] pb-20 px-10 animate-pulse">
            <div className="flex border-b p-6 rounded bg-white mb-4">
              <div className="w-[100px] h-[100px] bg-gray-300 rounded"></div>
              <div className="ml-5 flex-1 space-y-3">
                <div className="w-3/4 h-5 bg-gray-300 rounded"></div>
                <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                <div className="w-1/3 h-4 bg-gray-300 rounded"></div>
                <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
                <div className="w-2/3 h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="text-right space-y-3">
                <div className="w-24 h-4 bg-gray-300 rounded"></div>
                <div className="w-32 h-4 bg-gray-300 rounded"></div>
                <div className="w-28 h-4 bg-gray-300 rounded"></div>
                <div className="w-20 h-4 bg-gray-300 rounded"></div>
                <div className="w-36 h-5 bg-gray-400 rounded"></div>
              </div>
            </div>

            <div className="flex justify-between space-x-4">
              <div className="w-1/4 h-24 bg-white rounded p-5 space-y-2">
                <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="w-1/4 h-24 bg-white rounded p-5 space-y-2">
                <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="w-1/4 h-24 bg-white rounded p-5 space-y-2">
                <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>

            <div className="mt-5">
              <div className="w-1/4 h-4 bg-gray-300 rounded mb-2"></div>
              <div className="w-full h-20 bg-gray-300 rounded mb-2"></div>
              <div className="w-32 h-10 bg-gray-400 rounded"></div>
            </div>
          </div>

          <div className="p-4 bg-white h-[80%] mb-10 w-full animate-pulse mt-5 space-y-3">
            <div className="w-1/2 h-5 bg-gray-300 rounded"></div>
            <div className="w-2/3 h-4 bg-gray-300 rounded"></div>
            <div className="w-1/3 h-4 bg-gray-300 rounded"></div>
            <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
            <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
            <div className="w-1/3 h-4 bg-gray-300 rounded"></div>
            <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50 p-4">
          <div className="flex items-center gap-4 mb-3">
            <Link to="/layout/order" className="flex items-center gap-2 hover:text-white mt-12 bg-orange-500 rounded-lg text-white p-2">
              <ArrowLeft size={20} />
              Return
            </Link>
          </div>
          <div>
            <div className="flex items-center justify-between rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-green-800">
                  Order #{orderItem.orderId}
                </h1>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                  Shipped
                </span>
                <span className="text-green-700 text-sm font-semibold">
                  {new Date(orderItem?.creationDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex gap-4">
                      <div className="w-40 h-40 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          isZoomed
                          src={orderItem?.picture_detail}
                          alt="Product"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-lg font-semibold text-green-700 mb-2">
                          {orderItem?.title}
                        </h2>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-green-700 font-semibold">Order ID:</span>
                            <span className="ml-2 font-medium">
                              {orderItem.orderId}
                            </span>
                          </div>
                          <div>
                            <span className="text-green-700 font-semibold">Unit:</span>
                            <span className="ml-2 font-medium">{orderItem.lineItems?.[0]?.quantity}</span>
                          </div>
                          <div>
                            <span className="text-green-700 font-semibold">SKU:</span>
                            <span className="ml-2 font-medium">{orderItem.lineItems?.[0]?.sku}</span>
                          </div>
                          <div>
                            <span className="text-green-700 font-semibold">Price:</span>
                            <span className="ml-2 font-medium">${orderItem.lineItems?.[0]?.lineItemCost.value}</span>
                          </div>
                          <div>
                            <span className="text-green-700 font-semibold">Color:</span>
                            <span className="ml-2 font-medium">
                              {itemFields?.color}
                            </span>
                          </div>
                          <div>
                            <span className="text-green-700 font-semibold">Total:</span>
                            <span className="ml-2 font-medium text-green-600">
                              ${orderItem?.totalFeeBasisAmount?.value}
                            </span>
                          </div>
                          <div>
                            <span className="text-green-700 font-semibold">UPC:</span>
                            <span className="ml-2 font-medium text-green-600">
                              {itemFields?.upc}
                            </span>
                          </div>
                          <div>
                            <span className="text-green-700 font-semibold">Brand:</span>
                            <span className="ml-2 font-medium">
                              {itemFields?.brand}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Delivery Status */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Package className="text-blue-500" size={24} />
                      <h3 className="font-semibold text-gray-800">Delivery</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="text-sm text-gray-600">
                        Shipped via USPS
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-green-600 text-sm">
                          Tracking complete
                        </span>
                        <input
                          type="checkbox"
                          checked={trackingSent}
                          onChange={handleTrackingSentChange}
                          className="w-5 h-5 rounded-lg border border-gray-500 focus:outline-none appearance-none bg-white checked:bg-green-500 checked:border-green-500 relative checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:font-bold checked:after:absolute checked:after:top-0 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:leading-5"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Supplier */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Truck className="text-purple-500" size={24} />
                      <h3 className="font-semibold text-gray-800">Supplier</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="text-sm text-gray-600">Zenders</div>
                      <div className="text-sm text-gray-500">
                        ShippingMethodExpress
                      </div>
                    </div>
                  </div>

                  {/* Tracking */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle className="text-green-500" size={24} />
                      <h3 className="font-semibold text-gray-800">Tracking</h3>
                    </div>
                    <div className="space-y-3">
                      <span className="text-green-600 text-sm">Completed</span>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          Fulfillment Status
                        </div>
                        <input
                          type="checkbox"
                          checked={shipping}
                          onChange={handleShipping}
                          className="w-5 h-5 rounded-lg border border-gray-500 focus:outline-none appearance-none bg-white checked:bg-green-500 checked:border-green-500 relative checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:font-bold checked:after:absolute checked:after:top-0 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:leading-5"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">
                      Shipping Method
                    </h3>
                    <div className="text-sm text-gray-600">2000kg</div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">
                      Cart Status
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Pending</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">
                      Shipping Weight
                    </h3>
                    <div className="text-sm text-gray-600">2000kg</div>
                  </div>
                </div>

                {/* Payment Summary */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">
                    Payment Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal (1 item):</span>
                      {/* <span className="font-medium">${orderItem.lineItems[0]?.lineItemCost?.value}</span> */}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery (Shipping):</span>
                      {/* <span className="font-medium">${orderItem?.lineItems[0]?.deliveryCost?.shippingCost.value}</span> */}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax:</span>
                      {/* <span className="font-medium">${orderItem.lineItems[0]?.ebayCollectAndRemitTaxes[0]?.amount?.value}</span> */}
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total paid by customer</span>
                        {/* <span className="text-green-600">${orderItem.totalFeeBasisAmount.value}</span> */}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Notes */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">
                    Order Notes
                  </h3>
                  <textarea
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="Add notes to this order"
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSaveNotes}
                    className="mt-3 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Save notes
                  </button>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6 -mt-10">
                {/* Customer Info */}
                <div className="">
                  <div className="">
                    <h3 className="font-semibold text-green-700 text-center mt-5">
                      Customer
                    </h3>
                  </div>
                  <div className="p-6 py-9 bg-white">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <User size={20} className="text-gray-600" />
                      </div>
                      <div>
                        {/* <div className="font-medium text-gray-800">{orderItem.buyer.buyerRegistrationAddress.fullName}</div> */}
                        <div className="text-sm text-gray-500">
                          Recent Orders(3)
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-gray-500 block">Order #234657</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Order #234657</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Order #234657</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="font-semibold text-green-700 mb-4 mt-2">
                    Contact Info
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone size={16} className="text-gray-400" />
                      <span className="text-sm">{orderItem?.buyer?.buyerRegistrationAddress?.primaryPhone?.phoneNumber}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail size={16} className="text-gray-400" />
                      {/* <span className="text-sm">{orderItem.buyer.buyerRegistrationAddress.email}</span> */}
                    </div>
                    <p>{orderItem?.buyer?.buyerRegistrationAddress?.contactAddress?.addressLine1}</p>
                    <p>{orderItem?.buyer?.buyerRegistrationAddress?.contactAddress?.city}</p>
                    <p>{orderItem?.buyer?.buyerRegistrationAddress?.contactAddress?.countryCode}</p>
                    <p>{orderItem?.buyer?.buyerRegistrationAddress?.contactAddress?.postalCode}</p>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white rounded-lg shadow-sm p-6 mt-1">
                  <h3 className="font-semibold text-green-700 mb-4">
                    Shipping Address
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-1">
                      <Phone size={16} className="text-gray-400" />
                      <div className="text-sm">{orderItem?.fulfillmentStartInstructions?.[0]?.shippingStep?.shipTo?.primaryPhone?.phoneNumber}</div>
                    </div>
                    <p className="text-sm">{orderItem?.fulfillmentStartInstructions?.[0]?.shippingStep?.shipTo?.contactAddress?.addressLine1}</p>
                    <p className="text-sm">{orderItem?.fulfillmentStartInstructions?.[0]?.shippingStep?.shipTo?.contactAddress?.city}</p>
                    <p className="font-medium">{orderItem?.fulfillmentStartInstructions?.[0]?.shippingStep?.shipTo?.contactAddress?.countryCode}</p>
                    <p className="text-sm">{orderItem?.fulfillmentStartInstructions?.[0]?.shippingStep?.shipTo?.contactAddress?.postalCode}</p>
                  </div>
                </div>

                {/* Billing Address */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="font-semibold text-green-700 mb-4">
                    Billing Address
                  </h3>
                  <div className="flex items-start gap-3">
                    <div className="text-sm space-y-3">
                      <div className="text-sm">{orderItem?.fulfillmentStartInstructions?.[0]?.shippingStep?.shipTo?.primaryPhone?.phoneNumber}</div>
                      <div className="text-sm">{orderItem?.fulfillmentStartInstructions?.[0]?.shippingStep?.shipTo?.contactAddress?.addressLine1}</div>
                      <div className="text-sm">{orderItem?.fulfillmentStartInstructions?.[0]?.shippingStep?.shipTo?.contactAddress?.city}</div>
                      <div className="font-medium">{orderItem?.fulfillmentStartInstructions?.[0]?.shippingStep?.shipTo?.contactAddress?.countryCode}</div>
                      <p className="text-sm">{orderItem?.fulfillmentStartInstructions?.[0]?.shippingStep?.shipTo?.contactAddress?.postalCode}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
