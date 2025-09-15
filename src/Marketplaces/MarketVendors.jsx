import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import { ThreeDots } from 'react-loader-spinner';
import { Button, Image } from '@heroui/react';

const MarketVendors = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [allVendors, setAllVendors] = useState([]);
  const [loadingVendorId, setLoadingVendorId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const handleVendorSelection = async (vendorId, vendorName) => {
    setLoadingVendorId(vendorId);
    try {
      const response = await axios.get(
        `https://service.swiftsuite.app/api/v2/vendor-account/?vendor_id=${vendorId}`,
        { headers }
      );

      const vendorsToUpperCase = ['rsr', 'cwr', 'ssi'];
      const formattedVendorName = vendorsToUpperCase.includes(vendorName.toLowerCase())
        ? vendorName.toUpperCase()
        : vendorName.charAt(0).toUpperCase() + vendorName.slice(1).toLowerCase();

      localStorage.setItem('newAccount', response.data.length === 0 ? 'true' : 'false');
      localStorage.setItem('vendor_id', vendorId);
      localStorage.setItem('vendor_name', formattedVendorName);
      localStorage.setItem('fromVendor', 'false');

      navigate(`/layout/enrolment?vendor=${formattedVendorName}`);
    } catch (error) {
      toast.error('Vendor is unavailable. Please try again.');
    } finally {
      setLoadingVendorId(null);
    }
  };

  const skeletonArray = Array.from({ length: 6 });

  const debouncedVendorSelection = debounce(handleVendorSelection, 300);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await axios.get('https://service.swiftsuite.app/api/v2/vendor/', { headers });
      setAllVendors(response.data);
    } catch (err) {
      setError('Failed to load vendors. Please check your internet connection or try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-5">
      <h1 className="text-green-600 font-bold">Add Vendor</h1>
      {error && (
        <div className="text-center my-6">
          <p className="text-red-600 font-semibold mb-3">{error}</p>
          <Button onPress={fetchVendors} color="success" className="text-white">Retry</Button>
        </div>
      )}

      {!error && (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 my-2 grid-cols-1 mt-3 gap-4">
          {loading
            ? skeletonArray.map((_, i) => (
              <div
                key={i}
                className="bg-white shadow py-7 text-center text-sm font-semibold rounded-[8px] animate-pulse"
              >
                <div className="my-2 flex items-center justify-center">
                  <div className="w-24 h-24 bg-gray-300 rounded-full" />
                </div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto my-3" />
                <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto my-2" />
                <div className="h-10 bg-gray-300 rounded w-[150px] mx-auto mt-4" />
              </div>
            ))
            : allVendors.map((item, i) => (
              <div
                key={i}
                className="bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] py-7 text-center text-sm font-semibold rounded-[8px]"
              >
                <div className="my-2 flex text-center items-center justify-center">
                  <Image
                    isZoomed
                    src={item?.logo}
                    alt=""
                    className="w-24 h-24 object-contain"
                  />
                </div>
                <div className="text-center px-1 text-[15px] my-2 h-10">
                  Send orders and receive tracking with {item?.name}
                </div>
                <div className="my-2">$50.00/month</div>
                <button
                  onClick={() => debouncedVendorSelection(item?.id, item?.name)}
                  className="bg-[#027840] text-white py-2 w-[150px] rounded border hover:bg-white hover:text-[#089451]  hover:border-[#089451] flex items-center justify-center mx-auto"
                  disabled={loadingVendorId === item?.id}
                >
                  <span>Add Vendor</span>
                  {loadingVendorId === item?.id && (
                    <ThreeDots
                      height="20"
                      width="20"
                      color="green"
                      radius="9"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{ display: 'inline-block', marginLeft: '8px' }}
                    />
                  )}
                </button>
              </div>
            ))}
        </div>
      )}


      <Toaster position="top-right" />
    </div>
  );

};

export default MarketVendors;