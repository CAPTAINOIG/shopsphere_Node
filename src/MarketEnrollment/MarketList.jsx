import React from 'react';
import { useNavigate } from 'react-router-dom';
import { vendor } from '../Marketplaces/Data';

const MarketList = () => {
  const navigate = useNavigate();

  const handleMarketplaceClick = (marketplaceName) => {
    localStorage.setItem('MarketList', 'true');
    navigate('/layout/market', {
      state: { marketPlace: marketplaceName },
    });
  };

  return (
    <div className="mb-5 mx-auto">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {vendor.length > 0 ? (
          vendor.map((item) => (
            <div
              key={item.id || item.name}
              className="bg-white shadow border text-sm rounded-[16px] p-[20px]"
            >
              <div className="my-2 h-[40px] flex items-center gap-2">
                <img
                  src={item?.image || 'path/to/fallback-image.png'}
                  width={50}
                  height={80}
                  className="object-contain h-full"
                  alt={item?.name || 'Marketplace logo'}
                />
                <div className="font-semibold">{item?.name}</div>
              </div>
              <div className="px-1 text-[13px] my-4 h-10">
                {item?.summaries || `Sell products on ${item?.name}`}
              </div>
              <button
                onClick={() => handleMarketplaceClick(item.name)}
                className="py-2 w-[150px] rounded-[8px] mx-auto font-semibold h-[40px] border border-[rgba(2,120,64,0.4)] hover:bg-green-700 hover:text-white"
                aria-label={`Add ${item?.name}`}
              >
                <span>Add Marketplace</span>
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No marketplaces found.
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketList;
