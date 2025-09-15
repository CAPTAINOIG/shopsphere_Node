import { useContext, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { AiOutlineAppstore } from "react-icons/ai";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { TbReport } from "react-icons/tb";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineInventory2 } from "react-icons/md";
import { FaRegAddressBook } from "react-icons/fa";
import { IoBagHandleOutline } from "react-icons/io5";
import swift from "../Images/swift.png";
import { MdOutlineReorder } from "react-icons/md";
import { AppContext } from "../context/Dashboard";
import { vendor } from "../Marketplaces/Data";
import axios from "axios";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import SignOutButton from "../pages/SignOutButton";
import { fetchVendorEnrolled } from "../api/authApi";

const Sidebar = () => {
  const token = localStorage.getItem("token");
  const { sideBarOpen, setSideBarOpen, isTablet } = useContext(AppContext);

  const [host, setHost] = useState(false);
  const [market, setMarket] = useState(false);
  const [vendorIdentifier, setVendorIdentifier] = useState(false);
  const [vendorEnrolled, setVendorEnrolled] = useState(false);
  const [allIdentifiers, setAllIdentifiers] = useState([]);
  const [allVendorEnrolled, setAllVendorEnrolled] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const isAdmin = localStorage.getItem("Admin") === "true";
  const navigate = useNavigate();
  const sidebarRef = useRef();
  const { pathname } = useLocation();

  // Helpers to determine active routes
  const isAssetsActive =
    pathname.includes("/layout/catalogue") ||
    pathname.includes("/layout/product");

  const isMarketplaceFlow =
    pathname.includes("/layout/mymarket") || pathname.includes("/layout/market");

  const isVendorActive =
    pathname.includes("/layout/editenrollment") ||
    pathname.includes("/layout/enrolment");


  const getVendorEnrolled = async () => {
    try {
      const data = await fetchVendorEnrolled();
      setAllVendorEnrolled(data);
    } catch (err) {
      if (err.response?.data?.detail) {
        localStorage.removeItem("token");
        navigate("/signin");
      }
    }
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    getVendorEnrolled();
    setHost(isAssetsActive);
  }, [token, isAssetsActive]);

  useEffect(() => {
    if (isTablet) {
      setSideBarOpen(false);
    } else {
      setSideBarOpen(true);
    }
  }, [isTablet]);

  useEffect(() => {
    isTablet && setSideBarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (pathname.includes("/layout/catalogue") || pathname.includes("/layout/product")) {
      setHost(true);
    }
  }, [pathname]);

  // Handlers
  const overlayClicked = () => setSideBarOpen(false);
  const toggleUp = () => setHost(!host);
  const toggleUpMarket = () => setMarket(!market);
  const toggleUpVendor = () => setVendorIdentifier(!vendorIdentifier);
  const toggleUpVendorEnrolled = () => setVendorEnrolled(!vendorEnrolled);

  const handleCloseDropdowns = () => {
    setMarket(false);
    setHost(false);
    setVendorIdentifier(false);
    setVendorEnrolled(false);
  };

  const marketPlace = (name) => {
    navigate("/layout/market", { state: { marketPlace: name } });
  };

  const Nav_animation = isTablet
    ? {
        open: { x: 0, width: "13rem", transition: { damping: 40 } },
        closed: { x: -250, width: 0, transition: { damping: 40, delay: 0.15 } },
      }
    : {
        open: { width: "16rem", transition: { damping: 40 } },
        closed: { width: "4rem", transition: { damping: 40 } },
      };

  return (
    <div className="text-[#089451]">
      {/* Mobile overlay */}
      <div
        onClick={overlayClicked}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] opacity-30 ${
          sideBarOpen ? "block" : "hidden"
        }`}
      ></div>

      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTablet ? -250 : 0 }}
        animate={sideBarOpen ? "open" : "closed"}
        className="shadow-xl md:z-[9] z-[9999] max-w-[13rem] fixed top-0 left-0 pt-24 h-screen bg-white"
      >
        {/* Logo */}
        <div
          className={`flex items-center gap-2.5 font-medium text-white lg:hidden mt-[-88px] block`}
        >
          <Link to="/">
            <img src={swift} alt="logo" />
          </Link>
        </div>

        {/* Menu */}
        <div className="flex flex-col text-4xl h-full overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white">
          <ul className="px-2.5 text-[0.9rem] py-5 flex flex-col gap-2">
            {/* Dashboard */}
            <li onClick={handleCloseDropdowns}>
              <NavLink to="/layout/home">
                {({ isActive }) => (
                  <div
                    className={`flex items-center gap-6 w-full px-2 hover:text-white ${
                      isActive ? "bg-[#027840] rounded-[6px] text-white" : ""
                    } hover:bg-[#027840] hover:rounded`}
                  >
                    <AiOutlineAppstore size={23} className="min-w-max" />
                    <span>Dashboard</span>
                  </div>
                )}
              </NavLink>
            </li>

            {/* Assets */}
            <li onClick={toggleUp}>
              <NavLink to="/layout/catalogue">
                {() => (
                  <div
                    className={`flex items-center gap-6 w-full px-2 hover:text-white ${
                      isAssetsActive
                        ? "bg-[#027840] rounded-[6px] text-white"
                        : ""
                    } hover:bg-[#027840] hover:rounded`}
                  >
                    <FaRegAddressBook size={23} className="min-w-max" />
                    <span>Assets</span>
                  </div>
                )}
              </NavLink>
            </li>

            {/* Assets sub menu */}
            <li className={`mt-[-4%] ${host ? "block" : "hidden"}`}>
              <Link to="/layout/catalogue">
                <p
                  className={`${
                    pathname.includes("/layout/catalogue")
                      ? "text-[#089451] font-bold"
                      : "text-[#089451] opacity-[0.6]"
                  } hover:bg-[#027840] hover:text-white hover:rounded`}
                >
                  Catalog
                </p>
              </Link>
              <Link to="/layout/product">
                <p
                  className={`${
                    pathname.includes("/layout/product")
                      ? "text-[#089451] font-bold"
                      : "text-[#089451] opacity-[0.6]"
                  } hover:bg-[#027840] hover:text-white hover:rounded`}
                >
                  Product
                </p>
              </Link>
            </li>

            {/* Inventory */}
            <li onClick={handleCloseDropdowns}>
              <NavLink to="/layout/inventory">
                {({ isActive }) => (
                  <div
                    className={`flex items-center gap-6 w-full px-2 hover:text-white ${
                      isActive ? "bg-[#027840] rounded-[6px] text-white" : ""
                    } hover:bg-[#027840] hover:rounded`}
                  >
                    <MdOutlineInventory2 size={23} className="min-w-max" />
                    <span>Inventory</span>
                  </div>
                )}
              </NavLink>
            </li>

            {/* Marketplace */}
            <li onClick={handleCloseDropdowns}>
              <Link to="/layout/mymarket">
                <div
                  className={`flex items-center gap-6 w-full px-2 hover:text-white ${
                    isMarketplaceFlow
                      ? "bg-[#027840] rounded-[6px] text-white"
                      : ""
                  } hover:bg-[#027840] hover:rounded`}
                >
                  <IoBagHandleOutline size={23} className="min-w-max" />
                  <span>Marketplace</span>
                </div>
              </Link>
            </li>

            {/* Vendor */}
            <li onClick={handleCloseDropdowns}>
              <NavLink to="/layout/editenrollment">
                {() => (
                  <div
                    className={`flex items-center gap-6 w-full px-2 hover:text-white ${
                      isVendorActive
                        ? "bg-[#027840] rounded-[6px] text-white"
                        : ""
                    } hover:bg-[#027840] hover:rounded`}
                  >
                    <PiShoppingCartSimpleFill size={23} className="min-w-max" />
                    <span>Vendor</span>
                  </div>
                )}
              </NavLink>
            </li>

            {/* Orders */}
            <li onClick={handleCloseDropdowns}>
              <NavLink to="/layout/order">
                {({ isActive }) => (
                  <div
                    className={`flex items-center gap-6 w-full px-2 hover:text-white ${
                      isActive ? "bg-[#027840] rounded-[6px] text-white" : ""
                    } hover:bg-[#027840] hover:rounded`}
                  >
                    <MdOutlineReorder size={23} className="min-w-max" />
                    <span>Orders</span>
                  </div>
                )}
              </NavLink>
            </li>

            {/* Reports */}
            <li onClick={handleCloseDropdowns}>
              <NavLink to="/layout/report">
                {({ isActive }) => (
                  <div
                    className={`flex items-center gap-6 w-full px-2 hover:text-white ${
                      isActive ? "bg-[#027840] rounded-[6px] text-white" : ""
                    } hover:bg-[#027840] hover:rounded`}
                  >
                    <TbReport size={23} className="min-w-max" />
                    <span>Reports</span>
                  </div>
                )}
              </NavLink>
            </li>

            {/* Help */}
            <li onClick={handleCloseDropdowns}>
              <NavLink to="/layout/help">
                {({ isActive }) => (
                  <div
                    className={`flex items-center gap-6 w-full px-2 hover:text-white ${
                      isActive ? "bg-[#027840] rounded-[6px] text-white" : ""
                    } hover:bg-[#027840] hover:rounded`}
                  >
                    <IoMdHelpCircleOutline size={23} className="min-w-max" />
                    <span>Help</span>
                  </div>
                )}
              </NavLink>
            </li>

            {/* Account (admin only) */}
            {isAdmin && (
              <li onClick={handleCloseDropdowns}>
                <NavLink to="/layout/myaccount">
                  {({ isActive }) => (
                    <div
                      className={`flex items-center gap-6 w-full px-2 hover:text-white ${
                        isActive ? "bg-[#027840] rounded-[6px] text-white" : ""
                      } hover:bg-[#027840] hover:rounded`}
                    >
                      <IoMdHelpCircleOutline size={23} className="min-w-max" />
                      <span>Account</span>
                    </div>
                  )}
                </NavLink>
              </li>
            )}

            {/* Sign out */}
            <li>
              <NavLink
                onClick={(e) => {
                  e.preventDefault();
                  openModal();
                }}
              >
                {() => (
                  <div className="flex items-center gap-6 w-full px-2 hover:bg-[#027840] hover:rounded hover:text-white">
                    <LiaSignOutAltSolid size={23} className="min-w-max" />
                    <span>Sign Out</span>
                  </div>
                )}
              </NavLink>
            </li>
          </ul>

          {/* Sign out modal */}
          <SignOutButton
            openModal={openModal}
            closeModal={closeModal}
            isOpen={isOpen}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
