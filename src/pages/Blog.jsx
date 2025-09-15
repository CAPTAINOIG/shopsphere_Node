import React from 'react'
import { CgNotes } from "react-icons/cg";
import { AiFillInfoCircle } from "react-icons/ai";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { GrResources } from "react-icons/gr";

const blogCard = [
  {
    link: '/aboutus',
    icon: <AiFillInfoCircle size={24} />,
    head: 'About Swift Suite',
    Date: 'April 22, 2024',
    details: 'Learn more about Swift Suite and how our platform simplifies dropshipping operations for entrepreneurs'
  },
  {
    link: '/pricing',
    icon: <FaFileInvoiceDollar size={24}/>,
    head: 'Our Pricing plans',
    Date: 'April 22, 2024',
    details: 'Explore our flexible pricing plans designed to meet needs of dropshipping businesses of all sizes'
  },
  {
    link: '/aboutus',
    icon: <GrResources size={24} />,
    head: 'Dropshipping Resources',
    Date: 'April 22, 2024',
    details: 'Explore our flexible pricing plans designed to meet needs of dropshipping businesses of all sizes'
  }
];

const Blog = () => {
  return (
    <div className="p-6 bg-[#E7F2ED] h-screen">
      <section className='flex flex-col items-center bg-white lg:mx-[10rem] md:mx-[5rem] mx-10 border h-full'>
      <div className="gap-3 mb-6">
        <CgNotes className="text-2xl" />
        <div>
          <h1 className="text-2xl font-bold">Blog</h1>
          <p className="text-gray-600">
            Insights and resources to help you optimize and grow your dropshipping business
          </p>
        </div>
      </div>

    
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogCard.map((item, index) => (
          <div
            key={index}
            className="flex flex-col p-4 border rounded-2xl shadow hover:shadow-lg transition"
            >
            <div className="mb-2 text-[#027840]">{item.icon}</div>
            <h2 className="text-lg font-semibold">{item.head}</h2>
            <p className="text-sm text-gray-500">{item.Date}</p>
            <p className="mt-2 text-gray-700">{item.details}</p>
          </div>
        ))}
      </div>
        </section>
    </div>
  );
};

export default Blog;
