import React, { useEffect, useState } from 'react';
import img1 from '../Images/VendorFirstPage.png';
import { handleNextStep, setVendorAccount } from '../redux/vendor';
import { useDispatch } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';
import { Toaster, toast } from 'sonner';
import { CgProfile } from 'react-icons/cg';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';
import { MdOutlineArrowBackIos } from "react-icons/md";



const VendorPage = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const [vendorAccounts, setVendorAccounts] = useState([]);
  const [showAccountSelection, setShowAccountSelection] = useState(false);
  const [loadingAccountId, setLoadingAccountId] = useState(null);
  

  useEffect(() => {
    const vendorId = localStorage.getItem('vendor_id');
    const fetchAccounts = async () => {
      try {
        const response = await fetch('https://service.swiftsuite.app/api/v2/vendor-account/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });

        if (!response.ok) throw new Error(`Failed to fetch vendor accounts: ${response.status}`);

        const data = await response.json();
        const filtered = data.filter(account => String(account.vendor) === String(vendorId));
        setVendorAccounts(filtered);
      } catch (err) {
        console.error('Error fetching vendor accounts:', err);
        toast.error('Failed to load vendor accounts. Please try again.');
        setVendorAccounts([]);
      }
    };

    if (token) {
      fetchAccounts();
    } else {
      toast.error('Authentication token missing. Please log in again.');
    }
  }, [token]);

  const handleExistingAccount = () => {
  localStorage.setItem("newAccount", "false");
  localStorage.setItem("handleFtpPrevious", "false")
  setShowAccountSelection(true);
};

const handleNewAccount = () => {
  localStorage.setItem("newAccount", "true");
  localStorage.setItem("handleFtpPrevious", "true")
  dispatch(handleNextStep({}));
};

  const testConnectEndpoint = 'https://service.swiftsuite.app/api/v2/vendor-test/';

  const handleAccountSelect = async (
    accountId,
    vendorId,
    ftp_username,
    ftp_password,
    host,
    apiAccessId,
    apiAccessKey,
    Username,
    Password,
    POS
  ) => {
    setLoadingAccountId(accountId);
    localStorage.setItem('account_id', accountId);
    localStorage.setItem('vendor_id', vendorId);

    const data = {
      ...(vendorId && { vendor: vendorId }),
      ...(ftp_username && { ftp_username }),
      ...(ftp_password && { ftp_password }),
      ...(host && { host }),
      ...(apiAccessId && { apiAccessId }),
      ...(apiAccessKey && { apiAccessKey }),
      ...(Username && { Username }),
      ...(Password && { Password }),
      ...(POS && { POS }),
    };

    try {
      const response = await fetch(testConnectEndpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error(`Failed to post vendor data: ${response.status}`);

      const responseData = await response.json();
      localStorage.setItem('connection', JSON.stringify(responseData));
      dispatch(setVendorAccount({ accountId, vendorId }));
      dispatch(handleNextStep({ account: accountId, vendor: vendorId }));
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoadingAccountId(null);
    }
  };

  return (
    <section className="p-8 max-w-4xl mx-auto  bg-white font-mirza">
      <Link className='border py-2 px-3 rounded-[8px] bg-[#BB8232] text-white flex w-[5rem] justify-center items-center gap-1' to='/layout/editenrollment'><MdOutlineArrowBackIos />
 Back</Link>
      <Toaster position="top-right" />
      <AnimatePresence mode="wait">
  <div className="w-full" style={{ minHeight: "500px" }}>
    {!showAccountSelection ? (
      <div
        key="initial-view"
        className="flex flex-col justify-center items-center gap-8 h-full"
      >
        <div className="w-full lg:w-1/2">
          <img src={img1} alt="Vendor Modal" className="w-full rounded" />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-4">
          <button
            onClick={handleExistingAccount}
            className="bg-[#027840] text-white py-2 rounded-lg"
          >
            Select an account
          </button>
          <button
            onClick={handleNewAccount}
            className="border border-[#089451] py-2 rounded-lg text-[#089451]"
          >
            Register a new account
          </button>
        </div>
      </div>
    ) : (
      <motion.div
        key="account-selection-view"
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '-100%', opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-4 h-full"
      >
        <p className="text-[#027840] font-medium text-xl">
          Select from the list of registered accounts
        </p>
        <div className="w-full flex justify-center items-center">
          {vendorAccounts.length > 0 ? (
            vendorAccounts.map((item, i) => (
              <div
                key={item.id || i}
                className="w-full max-w-md py-3 px-4 rounded border border-[#E7F2ED] text-[#027840] shadow-md my-4 cursor-pointer flex justify-between items-center"
                onClick={() =>
                  handleAccountSelect(
                    item.id,
                    item.vendor,
                    item.ftp_username,
                    item.ftp_password,
                    item.host,
                    item.apiAccessId,
                    item.apiAccessKey,
                    item.Username,
                    item.Password,
                    item.POS
                  )
                }
              >
                <div className="flex gap-2 justify-center items-center">
                  <CgProfile className="text-2xl" />
                  <span className="font-medium">
                    {item.name || `Account ${i + 1}`}
                  </span>
                </div>
                {loadingAccountId === item.id && (
                  <ThreeDots height="20" width="20" color="#4fa94d" />
                )}
              </div>
            ))
          ) : (
            <p className="text-red-600">No accounts found.</p>
          )}
        </div>
      </motion.div>
    )}
  </div>
</AnimatePresence>
 </section>
  );
};

export default VendorPage;
