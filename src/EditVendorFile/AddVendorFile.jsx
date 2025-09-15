import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { ThreeDots } from 'react-loader-spinner';
import { fetchAllVendors, vendorSelection } from '../api/authApi';

const AddVendorFile = ({ vendorNames = [], searchTerm = '' }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [allVendors, setAllVendors] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loadingVendorId, setLoadingVendorId] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Debounce function to prevent multiple rapid clicks
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const handleVendorSelection = useCallback(async (vendorId, vendorName) => {
    setLoadingVendorId(vendorId);
    try {
      const response = await vendorSelection(vendorId);
      const vendorsToUpperCase = ['rsr', 'cwr', 'ssi'];
      const formattedVendorName = vendorsToUpperCase.includes(vendorName.toLowerCase())
        ? vendorName.toUpperCase()
        : vendorName.charAt(0).toUpperCase() + vendorName.slice(1).toLowerCase();

      localStorage.setItem('newAccount', response.length === 0 ? 'true' : 'false');
      localStorage.setItem('vendor_id', vendorId);
      localStorage.setItem('vendor_name', formattedVendorName);
      localStorage.setItem('fromVendor', 'true');

      navigate(`/layout/enrolment?vendor=${formattedVendorName}`);
    } catch (error) {
      toast.error('Vendor is unavailable. Please try again.', { toastId: 'vendor-unavailable' });
    } finally {
      setLoadingVendorId(null);
    }
  }, [navigate]);

  const debouncedVendorSelection = debounce(handleVendorSelection, 300);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetchAllVendors();
        const vendors = response;
        setAllVendors(vendors);
        setFilteredItems(vendors); 
        setDataLoaded(true);
        console.log(response);      
      } catch (error) {
        setAllVendors([]);
        setFilteredItems([]);
        setDataLoaded(true);
        toast.error('Failed to load vendors. Please try again.', { toastId: 'load-vendors-error' });
      }
    };

    fetchVendors();
  }, []);

  // Apply search filter only when searchTerm is non-empty
  useEffect(() => {
    if (searchTerm) {
      setFilteredItems(
        allVendors.filter(vendor =>
          vendor.name?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredItems(allVendors); // Show all vendors when no search term
    }
  }, [searchTerm, allVendors]);

  const VendorCard = ({ item, loadingVendorId, onSelect }) => {
    const isEnrolled = vendorNames.some(
      (name) => name.toLowerCase() === item.name?.toLowerCase()
    );

    return (
      <div className="bg-white shadow border text-sm rounded-[16px] p-[20px]">
        <div className="my-2 h-[40px] flex items-center justify-between gap-3 font-semibold">
          <div className="flex items-center gap-3">
            <img
              src={item?.logo}
              width={50}
              className="object-contain h-full"
              alt={item?.name || 'Vendor logo'}
              onError={(e) => {
                e.target.src = '/fallback-logo.png';
              }}
            />
            <p>
              {item?.name
                ? ['cwr', 'rsr', 'ssi'].includes(item.name.toLowerCase())
                  ? item.name.toUpperCase()
                  : item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()
                : 'Vendor logo'}
            </p>
          </div>
          <span className={`text-white text-xs px-2 py-1 rounded-[8px] ${
            isEnrolled ? 'bg-[#005D68]' : 'bg-[#BB8232]'
          }`}>
            {isEnrolled ? 'Enroled' : 'New'}
          </span>
        </div>
        <div className="px-1 text-[13px] my-4 h-10">
          Send orders and receive tracking with {item?.name}
        </div>
        <button
          onClick={() => onSelect(item?.id, item?.name)}
          className="py-2 w-[150px] rounded-[8px] mx-auto disabled:opacity-50 font-semibold h-[40px] border border-[rgba(2,120,64,0.4)]"
          disabled={loadingVendorId === item?.id}
        >
          {loadingVendorId === item?.id ? (
            <ThreeDots
              height="20"
              width="20"
              color="#027840"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{ display: 'inline-block', marginLeft: '8px' }}
            />
          ) : (
            <span>Add Vendor</span>
          )}
        </button>
      </div>
    );
  };

  return (
    <div className="mb-5 mx-auto">
      <Toaster richColors position="top-right" />
      {!dataLoaded ? (
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded mb-4 mx-auto"></div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-7 flex flex-col items-center"
              >
                <div className="h-24 w-36 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded mb-4"></div>
                <div className="h-10 w-36 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <VendorCard
                key={item.id}
                item={item}
                loadingVendorId={loadingVendorId}
                onSelect={debouncedVendorSelection}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No vendors found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddVendorFile;