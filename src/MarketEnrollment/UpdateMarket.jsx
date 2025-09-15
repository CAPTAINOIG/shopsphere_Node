import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster } from "sonner";
import { Button } from "antd";
import { CiEdit } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";
import { IoAdd } from "react-icons/io5";
import { LiaTimesSolid } from "react-icons/lia";
import { MdAccountBox } from "react-icons/md";
import { vendor2 } from "./Data";
import { FaRegCircleDot } from "react-icons/fa6";

const UpdateMarket = () => {
  const [data, setData] = useState(null);
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [noEnrolment, setNoEnrolment] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = JSON.parse(localStorage.getItem("userId"));

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.put(
          `https://service.swiftsuite.app/marketplaceApp/complete_enrolment_or_update/${userId}/Ebay/`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const responseData = res.data;
        if (!responseData || !responseData.marketplace_name) {
          setNoEnrolment(true);
          return;
        }

        setData(responseData);

        // Find logo from vendor2 based on marketplace_name in response
        const matchedVendor = vendor2.find(
          (v) => v.name.toLowerCase() === responseData.marketplace_name?.toLowerCase()
        );
        setLogo(matchedVendor?.image || null);
      } catch (err) {
        setNoEnrolment(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, userId]);

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  const handleEditClick = () => {
    localStorage.setItem('MarketList', 'false');
    navigate('/layout/market', {
      state: { marketPlace: data?.marketplace_name }
    });
  };

  return (
    <div className="w-full mx-auto">
      <Toaster richColors />

      {loading ? (
        <div className="flex justify-center py-10">
          <ThreeDots color="#000" height={40} />
        </div>
      ) : noEnrolment ? (
        <div className="text-center py-10 text-gray-600">
          No enrolment found
        </div>
      ) : (
        <div className="border rounded-lg">
          <button
            onClick={handleToggle}
            className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-all"
          >
            <div className="flex items-center gap-3">
              {logo && <img src={logo} alt="Marketplace Logo" className="h-6 w-10" />}
              <span className="font-semibold">{data?.marketplace_name}</span>
            </div>
            <div className="text-xl">
              {expanded ? <LiaTimesSolid /> : <IoAdd />}
            </div>
          </button>

          {expanded && (
            <div className="px-4 py-3 bg-white border-t">
              <div className="flex justify-between text-sm font-semibold border-b pb-2">
                <div className="w-1/3">Store ID</div>
                <div className="w-1/3 text-center">Status</div>
                <div className="w-1/3 text-end"></div>
              </div>
              <div className="flex justify-between text-sm py-2 items-center">
                <div className="w-1/3">
                  <span className="flex bg-[#005D6833] w-1/3 p-1 rounded">
                    <MdAccountBox className="text-xl" /> {data?.store_id || "N/A"}
                  </span>
                </div>
                <div className="w-1/3 flex items-center justify-center gap-2 text-[#BB8232] font-semibold">
                  <FaRegCircleDot /> Connected
                </div>
                <div className="w-1/3 flex justify-end gap-2">
                  <Button
                    size="small"
                    icon={<CiEdit />}
                    onClick={handleEditClick}
                    className="!bg-[#027840] !text-white !border-none hover:!bg-green-600 focus:!bg-green-600 active:!bg-green-700 !py-[16px] !rounded-[8px]"
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    icon={<FaTrashAlt />}
                    onClick={() => toast.warning("Delete functionality not implemented.")}
                    className="!bg-[#A71A1D] !text-white !border-none hover:!bg-red-600 focus:!bg-red-600 active:!bg-red-700 !py-[16px] !rounded-[8px]"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UpdateMarket;