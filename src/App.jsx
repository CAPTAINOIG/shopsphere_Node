import { Route, Routes } from 'react-router-dom';
import Rootlayout from './layout/Rootlayout';
import ScrollToTop from './layout/ScrollToTop';
import SignUp from './pages/SignUp';
import ErrorPage from './pages/Errorpage';
import ForgotPassword from './pages/ForgotPassword';
import Signin from './pages/Signin';
import Reset from './pages/Reset';
import Landingpage from './landingpage/Landingpage';
import Regsuccess from './pages/Regsuccess';
import PassSuccess from './pages/PassSuccess';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import Api from './Vendorenrolment/Api';
import StateAPi from './Vendorenrolment/StateAPi';
import ProductDetails from './cataloguedetails/ProductDetails';
import EditEnrollment from './EditVendorFile/EditEnrollment';
import CheckboxSelect from './pages/CheckboxSelect';
import Foot from './landingpage/Foot';
import ChoosePlan from './UserAdmin/ChoosePlan';
import PaymentSuccessful from './UserAdmin/PaymentSuccessful';
import PaymentFailed from './UserAdmin/PaymentFailed';
import PricingDetails from './UserAdmin/PricingDetails';
import AboutUs from './pages/AboutUs';
import Faqs from './UserAdmin/Faqs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ContactUs from './pages/ContactUs';
import Blog from './pages/Blog';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen font-[Roboto]">
      {/* Navbar always on top */}
      <Navbar openToggle={toggleIsOpen} />

      {/* Page content */}
      <main className="flex-grow">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/layout/*" element={<Rootlayout />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route
            path="/accounts/password_reset_confirm/:uidb64/:token"
            element={<Reset />}
          />
          <Route path="/success" element={<Regsuccess />} />
          <Route path="/passreg" element={<PassSuccess />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/api" element={<Api />} /> 
          <Route path="/state" element={<StateAPi />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/edit" element={<ProductDetails />} />
          <Route path="/editenrollment" element={<EditEnrollment />} />
          <Route path="/check" element={<CheckboxSelect />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/pricing" element={<ChoosePlan />} />
          <Route path="/chooseplan/paymentsuccessful" element={<PaymentSuccessful />} />
          <Route path="/chooseplan/paymentfailed" element={<PaymentFailed />} />
          <Route path="/pricing-details" element={<PricingDetails />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
          <Route path="/terms_of_service"  element={<TermsOfService/>} />
          <Route path="/contact-us"  element={<ContactUs/>} />
          <Route path="/blog"   element={<Blog/>} />
        </Routes>
      </main>
      <Foot />
    </div>
  );
}

export default App;
