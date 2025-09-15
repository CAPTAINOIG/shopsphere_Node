import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import VendorPage from "./VendorPage";

const Vendorenrolment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get vendor name from query param or localStorage
  const vendorName =
    new URLSearchParams(location.search).get("vendor") ||
    localStorage.getItem("vendor_name") ||
    "";

  const checkVendor = localStorage.getItem("fromVendor");

  const handleVendorPageClose = () => {
    if (checkVendor === "true") {
      navigate("/layout/editenrollment");
    } else {
      navigate("/layout/home");
    }
  };

  return (
    <section className="bg-white  rounded-[10px]">
      <VendorPage
        vendorName={vendorName}
        onClose={handleVendorPageClose}
        navigate={navigate}
      />
    </section>
  );
};

export default Vendorenrolment;
