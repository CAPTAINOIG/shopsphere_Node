import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { Toaster, toast } from 'sonner';
import Faqs from './Faqs';

const PricingDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const plan = location.state?.plan;
  const token = localStorage.getItem('token');
  const [loadingTier, setLoadingTier] = useState(null);

  const card = [
    {
      heading: 'Advanced Analytics Dashboard',
      price: '$49/month',
      details: 'Detailed profit, sales, and supplier performance insights.',
      color: 'bg-[#027840]',
    },
    {
      heading: 'Multi-Store Management',
      price: '$99/month',
      details: 'Manage multiple stores under one dashboard.',
      color: 'bg-[#005D68]',
    },
    {
      heading: 'Priority Onboarding & Training',
      price: '$199 one-time',
      details: 'Hands-on setup and dedicated training sessions.',
      color: 'bg-[#000000CC]',
    },
    {
      heading: 'Custom Supplier Integration',
      price: 'Starting at $199',
      details: 'We’ll integrate any supplier not already in our system.',
      color: 'bg-[#BB823299]',
    },
    {
      heading: 'White-Label Branding',
      price: '$79/month',
      details: 'Remove Swift Suite branding and customize for your business (included in Premium & Enterprise).',
      color: 'bg-[#005D68]',
    },
  ];

  if (!plan) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] text-center">
        <p className="text-lg text-gray-600 mb-4">No plan details available.</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  const chooseMyPlan = async (tier) => {
    setLoadingTier(tier);
    try {
      console.log('Sending request with tier:', tier); // Debug tier
      console.log('Token:', token); // Debug token

      const endpoint = `https://service.swiftsuite.app/accounts/tier-subscription/`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ tier }),
      });

      // console.log('Response Status:', response.status); // Debug status
      // console.log('Response Headers:', response.headers.get('content-type')); // Debug content type

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error('Server returned non-JSON response');
      }

      if (response.status === 401 || response.status === 403) {
        toast.error('Redirecting to sign in...');
        localStorage.setItem('redirectAfterLogin', location.pathname);
        setTimeout(() => navigate('/signin'), 3000);
        return;
      }

      const result = await response.json();
      if (response.ok) {
        window.open(result.checkout_url);
        // toast.success('Plan selected!');
      } else {
        toast.error(result.detail || 'Failed to select plan.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Connection failed.');
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <div className="py-1 mx-auto bg-[#E7F2ED] rounded-lg">
      <div className="mt-2 py-5 bg-white">
        <h1 className="text-3xl text-center font-semibold">Pricing Plans</h1>
        <p className="text-center">
          Here, you have an elaborate view of the plans you want to go with <br />
          and the top features, broken down <br /> and explained
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="flex py-10 mt-3 justify-center items-center bg-white">
        {/* LEFT COLUMN */}
        <div className="grid grid-rows-2 h-full">
          {/* Top Left */}
          <div className="flex bg-[#F2F2F2] border font-semibold text-2xl p-8 me-2">
            <p>
              Choose your <br /> plan
            </p>
          </div>

          {/* Bottom Left */}
          <div className="flex flex-col">
            <p className="font-semibold h-[40px] flex items-center text-[17px]">Top Features</p>
          <ul className="flex-1 flex flex-col">
            {plan.include.map((item) => {
              let cleanedText = item.text
                .replace(/inventory sync/gi, '')
                .replace(/Orders \/ Month/gi, 'Orders')
                                .replace(/Vendors/gi, 'Vendor Integrations')
                .replace(/,/g, '')
                .replace(/\b(up|to)\b/gi, '')
                .replace(/[0-9]/g, '')
                .replace(/\bstore(s)?\b/gi, 'Marketplace Integrations')
                .replace(/\s+/g, ' ')
                .trim();

              return cleanedText ? (
                <li key={item.id} className="border-b flex items-center h-[60px] pl-2">
                  <span className="text-gray-700 mx-4">{cleanedText}</span>
                </li>
              ) : null;
            })}
          </ul>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="grid grid-rows-2 w-[16rem] shadow-[0_2px_30px_0_rgba(0,0,0,0.25)] h-full">
          {/* Top Right */}
          <div className="border flex flex-col items-center justify-center text-center py-5">
            <h2 className="text-2xl font-bold mb-4" style={{ color: plan.color }}>
              {plan.name}
            </h2>
            <div className="font-bold mb-2 text-[2.5rem]">
              ${parseInt(plan.price)}
              <span className="text-[1rem] text-gray-500">/month</span>
            </div>
            <p className="mb-4 font-semibold text-gray-500">
              billed <br /> monthly
            </p>
            <button
              onClick={() => chooseMyPlan(plan.id)}
              className="border w-[170px] h-[40px] px-8 rounded-[10px] text-white flex items-center justify-center gap-2"
              style={{ backgroundColor: plan.color }}
              disabled={loadingTier === plan.id} // Disable button during loading
            >
              {loadingTier === plan.id ? (
                <ThreeDots height="20" width="20" color="white" ariaLabel="loading" />
              ) : (
                'Choose Plan'
              )}
            </button>
          </div>

          {/* Bottom Right */}
          <div className="border">
            <p className="font-semibold border-b h-[40px] flex items-center text-[17px] bg-[#E7F2ED]"></p>
            <ul className="flex-1 flex flex-col">
              <li className="border-b flex flex-col items-center justify-center h-[60px]">
                <span className=" font-semibold">{plan.included_orders} Orders/month</span>
                <span className="text-gray-500 text-sm">
                  (extra order cost ${parseFloat(plan.extra_order_cost).toFixed(2)})
                </span>
              </li>
              <li className="border-b flex flex-col items-center justify-center h-[60px]">
                <span className=" font-semibold">{plan.included_stores} Marketplace Integrations</span>
                <span className="text-gray-500 text-sm">
                  (extra store cost: ${parseFloat(plan.extra_store_cost).toFixed(2)})
                </span>
              </li>
              <li className="border-b flex flex-col items-center justify-center h-[60px]">
                <span className=" font-semibold">{plan.included_vendors} Vendor Integrations</span>
                <span className="text-gray-500 text-sm">
                  (extra vendor cost: ${parseFloat(plan.extra_vendor_cost).toFixed(2)})
                </span>
              </li>
              <li className="border-b flex flex-col items-center justify-center h-[60px]">
                <span className=" font-semibold">{plan.max_subaccounts} Subaccounts</span>
                <span className="text-gray-500 text-sm">(Included in plan)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Optional Add-Ons */}
      <section className="py-10 bg-white mt-3">
        <h1 className="font-bold text-2xl text-center mb-5">Optional Add-Ons</h1>
        <div className="flex justify-center items-center">
          <div className="flex flex-wrap lg:max-w-5xl justify-center items-center gap-6">
            {card.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col justify-center items-center text-center ${item.color} text-white rounded-xl border p-6 w-[280px] h-[240px] shadow-[0_4px_20px_0_#00000005]`}
              >
                <h3 className="font-bold text-lg mb-2">{item.heading}</h3>
                <div>
                  <p className="text-sm font-semibold">{item.price}</p>
                  <p className="text-sm">{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-3 bg-white mx-auto">
        <Faqs />
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default PricingDetails;