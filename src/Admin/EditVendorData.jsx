import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import { ThreeDots } from 'react-loader-spinner';

const EditVendorData = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [allVendors, setAllVendors] = useState([]);
  const [loadingVendorId, setLoadingVendorId] = useState(null); // Track loading vendor
  const [dataLoaded, setDataLoaded] = useState(false); // Track data loading

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  // Debounce function to prevent multiple rapid clicks
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const handleVendorSelection = async (vendorId, vendorName) => {
    setLoadingVendorId(vendorId); // Show loader for this vendor
    try {
      const response = await axios.get(
        `https://service.swiftsuite.app/api/v2/vendor-account/?vendor_id=${vendorId}`,
        { headers }
      );
  
      // Determine how to format vendorName for localStorage
      const vendorsToUpperCase = ['rsr', 'cwr', 'ssi'];
      const formattedVendorName = vendorsToUpperCase.includes(vendorName.toLowerCase())
        ? vendorName.toUpperCase()
        : vendorName.charAt(0).toUpperCase() + vendorName.slice(1).toLowerCase();
  
      localStorage.setItem('newAccount', response.data.length === 0 ? 'true' : 'false');
      localStorage.setItem('vendor_id', vendorId);
      localStorage.setItem('vendor_name', formattedVendorName);
      localStorage.setItem('fromVendor', 'true');
  
      navigate(`/layout/enrolment?vendor=${formattedVendorName}`);
    } catch (error) {
      console.error(error);
      toast.error('Vendor is unavailable. Please try again.');
    } finally {
      setLoadingVendorId(null); // Hide loader
    }
  };

  // Debounced vendor selection
  const debouncedVendorSelection = debounce(handleVendorSelection, 300);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get('https://service.swiftsuite.app/api/v2/vendor/', { headers });
        setAllVendors(response.data);
        setDataLoaded(true); // Mark data as loaded
      } catch (err) {
        console.error(err);
        setDataLoaded(true); // Mark data as loaded even on error
      }
    };

    fetchVendors();
  }, []);

  return (
    <div className="mb-10  bg-white">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 my-2 grid-cols-1 mt-3 gap-4">
        {allVendors.map((item, i) => (
          <div
            key={i}
            className=" shadow-[0_4px_25px_0px_rgba(0,0,0,0.05)] py-7 text-center text-sm font-semibold rounded-[8px]"
          >
            <div className="my-2">
              <img src={item?.logo} width={150} height={100} className="mx-auto" alt="" />
            </div>
            <button
              onClick={() => debouncedVendorSelection(item?.id, item?.name)}
              className="bg-[#027840] text-white py-2 w-[150px] rounded border hover:bg-white hover:text-[#089451] hover:border-[#089451] flex items-center justify-center mx-auto"
              disabled={loadingVendorId === item?.id}
            >
              <span>Edit Vendor</span>
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
      <Toaster position="top-right" />
    </div>
  );
};

export default EditVendorData;