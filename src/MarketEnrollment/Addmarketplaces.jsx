import React from 'react';
import { vendor } from './Data';
import { useNavigate } from 'react-router-dom';

const Addmarketplaces = () => {
  const navigate = useNavigate();

  const marketPlace = (e) => {
    console.log(e);
    localStorage.setItem('marketPlace', JSON.stringify(e)); // Fixed the syntax
    navigate('/layout/market'); // Routes correctly
  };

  return (
    <>
    <div className='my-5'>

      <h1 className="text-green-600 font-bold">Add Marketplace</h1>
      <div className="grid lg:grid-cols-3  md:grid-cols-2 grid-cols-1 mt-3 gap-4">
        {vendor.map((item, i) => (
          <div key={i} className="bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] rounded-[8px] py-10 text-center text-sm font-semibold">
            <div><img src={item.image} width={150} className="mx-auto" alt="" /></div>
            <div>{item.summaries}</div>
            <div>{item.price}</div>
            <button
              onClick={() => marketPlace(item.name)}
              className="bg-green-700 hover:bg-white border rounded hover:border-[#089451] hover:text-[#089451] text-white p-2 px-5 mt-5"
              >
              Add Marketplace
            </button>
          </div>
        ))}
      </div>
        </div>
    </>
  );
};

export default Addmarketplaces;
