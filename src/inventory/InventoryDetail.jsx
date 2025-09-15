import React, { useState } from 'react';
import { ArrowLeft, Edit3, Heart, Share2, Package, Truck, Shield, Star, MapPin, Calendar, Tag, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EditInventoryModal from './EditInventoryModal';
import { useDisclosure } from '@heroui/react';

const InventoryDetail = () => {
  const inventoryDetail = JSON.parse(localStorage.getItem('inventoryDetail'));
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('details');
  const [selectedImage, setSelectedImage] = useState(0);
  const [inventoryEdit, setInventoryEdit] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();


  if (!inventoryDetail) {
    navigate('/layout/inventory');
    return null;
  }

  const safeJSONParse = (value) => {
    try {
      if (typeof value !== 'string') return null;
      const lower = value.trim().toLowerCase();
      if (lower === 'null' || lower === 'undefined') return null;
      return JSON.parse(value);
    } catch {
      return null;
    }
  };

  const inventoryImages = Array.isArray(inventoryDetail.thumbnailImage) ? inventoryDetail.thumbnailImage : safeJSONParse(inventoryDetail.thumbnailImage) || [];

  const handleEditInventory = (item) => {
    navigate(`/layout/listing/${item.id}`, { state: { isFromUpdate: true } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate('/layout/inventory')} className="flex items-center space-x-2 mt-14 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back to Inventory</span>
              </button>
            </div>
          </div>
          <div className="text-2xl font-bold flex justify-center items-center">
            <h1>Product Details</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 mb-10">
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
            <div className="rounded-lg flex items-center justify-center overflow-hidden h-64 md:h-80 mb-3">
              {(selectedImage) ? (
                <img
                  src={selectedImage}
                  alt={inventoryDetail?.title}
                  className="object-contain w-full h-full"
                />
              ) : (
                <img
                  src={inventoryDetail.picture_detail}
                  alt={inventoryDetail.title}
                  className="object-contain w-full h-full"
                />
              )}
            </div>

            <div className="flex space-x-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pb-1">
              <img
                onClick={() => setSelectedImage(inventoryDetail?.picture_detail)}
                src={inventoryDetail?.picture_detail}
                alt={inventoryDetail?.title}
                className={`w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border transition-all duration-200 cursor-pointer ${selectedImage ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-200'
                  }`}
              />
              {inventoryImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border transition-all duration-200 ${selectedImage ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-200'
                    }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 md:p-6 flex flex-col justify-between">
            <div>
              {/* Status and Stock */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${inventoryDetail.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                    <span className={`w-2 h-2 rounded-full mr-2 ${inventoryDetail.active ? 'bg-green-700' : 'bg-red-500'
                      }`}></span>
                    {inventoryDetail.active ? 'Active' : 'Inactive'}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    <Package className="w-3 h-3 mr-1" />
                    In Stock: {inventoryDetail.quantity}
                  </span>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <Heart className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{inventoryDetail.title}</h1>
              <div className="flex items-center space-x-4 mb-5">
                <span className="text-2xl font-bold text-green-600">${inventoryDetail.price}</span>
                <span className="text-sm text-gray-500">Fixed Price</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase">SKU</span>
                  <p className="font-medium text-gray-900">{inventoryDetail.sku}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase">UPC</span>
                  <p className="font-medium text-gray-900">{inventoryDetail.upc}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase">Brand</span>
                  <p className="font-medium text-gray-900">{inventoryDetail.brand}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase">Location</span>
                  <p className="font-medium text-gray-900 flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {inventoryDetail.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <button onClick={() => handleEditInventory(inventoryDetail)} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center transition">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Product
              </button>
              {/* <button className="flex-1 border border-green-600 text-green-600 hover:bg-green-50 py-3 px-4 rounded-lg font-medium flex items-center justify-center transition">
                <Eye className="w-4 h-4 mr-2" />
                View on eBay
              </button> */}
            </div>

            {/* Footer Info */}
            <div className="border-t pt-4 text-sm text-gray-600">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Listed: {new Date(inventoryDetail.date_created).toLocaleDateString()}
                </span>
                <span className="flex items-center">
                  <Tag className="w-4 h-4 mr-1" />
                  ID: {inventoryDetail.ebay_item_id}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              {['details', 'specifications', 'shipping'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm capitalize transition-colors ${activeTab === tab
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'details' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Description</h3>
                <p className="text-gray-700 leading-relaxed mb-6">{inventoryDetail.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className='px-5'>
                    <h4 className="text-gray-900 mb-3 text-lg font-semibold">Business Details</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cost Price:</span>
                        <span className="font-medium">${inventoryDetail.cost}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Start Price:</span>
                        <span className="font-medium">${inventoryDetail.start_price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Best Offer:</span>
                        <span className={`font-medium ${inventoryDetail.bestOfferEnabled ? 'text-green-600' : 'text-gray-500'}`}>
                          {inventoryDetail.bestOfferEnabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category ID:</span>
                        <span className="font-medium">{inventoryDetail.category_id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Postal Code:</span>
                        <span className="font-medium">{inventoryDetail.postal_code}</span>
                      </div>
                    </div>
                  </div>

                  <div className='px-5'>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Marketplace & Profiles</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Listing Type:</span>
                        <span className="font-medium">{inventoryDetail.listingType}</span>
                      </div>
                      {/* <div className="flex justify-between">
                        <span className="text-gray-600">Market:</span>
                        <span className="font-medium">{inventoryDetail.market_logos}</span>
                      </div> */}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Profile:</span>
                        <span className="font-medium">{inventoryDetail.payment_profileName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Return Profile:</span>
                        <span className="font-medium">{inventoryDetail.return_profileName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping Profile:</span>
                        <span className="font-medium">{inventoryDetail.shipping_profileName}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {inventoryDetail?.parsedItemSpecific &&
                    Object.entries(inventoryDetail.parsedItemSpecific).map(([key, value], idx) => (
                      <div key={idx} className="flex justify-between items-center py-3 border-b border-gray-100 px-5">
                        <span className="text-gray-600 font-medium">{key}:</span>
                        <span className="text-gray-900">{value || <span className="text-gray-400">N/A</span>}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Truck className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">Free Standard Shipping</p>
                        <p className="text-sm text-gray-600">5-7 business days</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">Buyer Protection</p>
                        <p className="text-sm text-gray-600">Full refund if not received</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Shipping Details</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Ships from:</span>
                        <span>{inventoryDetail.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping Profile:</span>
                        <span>{inventoryDetail.shipping_profileName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Return Policy:</span>
                        <span>{inventoryDetail.return_profileName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payment Policy:</span>
                        <span>{inventoryDetail.payment_profileName}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <EditInventoryModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        useDisclosure={useDisclosure}
        onClose={onClose}
        inventoryEdit={inventoryEdit}
        setInventoryEdit={setInventoryEdit}
        token={token}
        userId={userId}
      />
    </div>
  );
};

export default InventoryDetail;