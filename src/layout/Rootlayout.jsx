import React, { useContext } from 'react';
import { AppContext } from '../context/Dashboard';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Sidebar from '../Side/Sidebar';
import Header from '../Nav/Header';
import Product from '../cataloguedetails/Product';
import Enrolment from '../Vendorenrolment/Enrolment';
import Catalogue from '../cataloguedetails/Catalogue';
import Inventory from '../inventory/Inventory';
import Selectedproduct from '../SelectedProduct/Selectedproduct';
import Ebay from '../MarketEnrollment/Ebaydata/Ebay';
import Order from '../OrderPage/Order';
import OrderDetails from '../OrderPage/OrderDetails';
import Listing from '../cataloguedetails/ProductListing/Listing';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditEnrollment from '../EditVendorFile/EditEnrollment';
import VendorEdit from '../EditVendorFile/VendorEdit';
import Success from '../MarketEnrollment/Success';
import AddNewVendor from '../Admin/AddNewVendor';
import NewVendorInfoMain from '../Admin/NewVendorInfoMain';
import Report from '../pages/Report';
import Help from '../pages/Help';
import ScrollToTop from './ScrollToTop';
import MyMarket from '../MarketEnrollment/MyMarket';
import MarketParent from '../MarketEnrollment/MarketParent';
import AccountFile from '../UserAdmin/AccountFile';
import InventoryDetail from '../inventory/InventoryDetail';
import SuccessInvite from '../UserAdmin/SuccessInvite';
import PaymentHistory from '../UserAdmin/PaymentHistory';
import Parent from '../settings/Parent';

const Rootlayout = ({ children }) => {
  const { sideBarOpen } = useContext(AppContext);
  const location = useLocation();

  // Remove px-4 only on /layout/settings
  const noPadding = location.pathname === '/layout/settings';

  return (
    <div className="min-h-screen flex flex-col bg-[#E7F2ED]">
      <Header />
      <div className="flex flex-1 overflow-hidden h-screen">
        <Sidebar />
        <div
          id="scrollable-content"
          className={`flex-1 transition-all duration-200 ease-in-out h-screen overflow-y-auto pt-8 ${
            noPadding ? '' : 'px-4'
          } ${sideBarOpen ? 'md:ml-52' : 'md:ml-16'}`}
        >
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<AccountFile />} />
            <Route path="/product" element={<Product />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/enrolment" element={<Enrolment />} />
            <Route path="/market" element={<MarketParent />} />
            <Route path="/success" element={<Success />} />
            <Route path="/selectedproduct" element={<Selectedproduct />} />
            <Route path="/ebay" element={<Ebay />} />
            <Route path="/listing/:productId" element={<Listing />} />
            <Route path="/order" element={<Order />} />
            <Route path="/orderdetails/:orderDetail" element={<OrderDetails />} />
            <Route path="/inventory/detail" element={<InventoryDetail />} />
            <Route path="/editenrollment" element={<EditEnrollment />} />
            <Route path="/editvendor" element={<VendorEdit />} />
            <Route path="/addnewvendor" element={<AddNewVendor />} />
            <Route path="/newvendordetails" element={<NewVendorInfoMain />} />
            <Route path="/report" element={<Report />} />
            <Route path="/help" element={<Help />} />
            <Route path="/mymarket" element={<MyMarket />} />
            <Route path="/myaccount" element={<AccountFile />} />
            <Route path="/invite-success" element={<SuccessInvite />} />
            <Route path="/payment-history" element={<PaymentHistory />} />
            <Route path="/settings" element={<Parent />} />
          </Routes>
          {children}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Rootlayout;
