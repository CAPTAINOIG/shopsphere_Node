import  { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { IoEyeSharp } from 'react-icons/io5';
import { BsEyeSlashFill } from 'react-icons/bs';
import axios from 'axios';
import signImage1 from '../Images/signup1.png';
import { Toaster, toast } from 'sonner';
import {signin } from "../api/authApi";


const SignIn = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [myLoader, setMyLoader] = useState(false);
  const navigate = useNavigate();

  // const loginEndpoint = 'https://service.swiftsuite.app/accounts/login/';
  const sendOtpEndpoint = 'https://service.swiftsuite.app/accounts/send-otp/';

  const validationSchema = useMemo(() =>
    yup.object({
      email: yup.string().email('Invalid email format').required('Email is required'),
      password: yup.string().required('Password is required'),
    }), []
  );

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setMyLoader(true);

      try {
        const res = await signin(values, {timeout: 15000});
        localStorage.setItem('Admin', res.isAdmin);
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('fullName', res.full_name);
        localStorage.setItem('userId', res.id);
        toast.success('✅ Sign in successful!');
        const redirect = localStorage.getItem('redirectAfterLogin');
        setTimeout(() => {
          navigate(redirect || '/layout/home');
          if (redirect) localStorage.removeItem('redirectAfterLogin');
        }, 1000);
      } catch (error) {
        setMyLoader(false);
        if (error.code === 'ECONNABORTED') {
          toast.error('⚠️ Request timed out. Please try again.');
        } else if (!error.response) {
          toast.error('⚠️ Network error. Please check your connection.');
        } else if (error.response.status === 403) {
          const msg = error.response.data?.detail;
          if (msg === 'Account not verified, check your email for verification code') {
            try {
              await axios.post(sendOtpEndpoint,
              { email: values.email },
              { timeout: 15000 });
              toast.success('✅ OTP sent to your email!');
              localStorage.setItem('emailForAuth', values.email)
              navigate('/auth');
            } catch (otpError) {
              toast.error('⚠️ Failed to send OTP. Please try again.');
            }
          } else {
            toast.error('❌ Invalid credentials.');
          }
        } else if (error.response.data?.email) {
          error.response.data.email.forEach((msg) => toast.error(`⚠️ ${msg}`));
        } else {
          toast.error(error.response.data?.detail || '⚠️ Server error. Try again.');
        }
      }
    },
  });

  return (
    <div className='min-h-screen flex flex-col'>
      <Toaster position="top-right" />
      <section className="flex-grow grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 lg:px-10">
        <div className="px-10 flex justify-center items-center">
          <img src={signImage1} alt="Sign in illustration" className="w-full h-full max-h-[55vh] object-contain" />
        </div>

        <div className="lg:py-20 py-0 lg:px-28 md:px-14 px-4 flex flex-col justify-center">
          <h1 className="text-center font-semibold text-2xl text-[#089451] mb-2">Enter your sign-in details</h1>

          <form onSubmit={formik.handleSubmit}>
            <p className="text-[#089451] font-semibold text-xl my-4">Sign in</p>

            <div className="my-2 h-[80px]">
              <label>Email</label>
              <input
                type="text"
                name="email"
                placeholder="Jane1234"
                className="text-base focus:outline-[#089451] px-4 py-3 w-full border-[1.5px] mt-1 border-[#089451]"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <span className="text-red-500 my-1">{formik.errors.email}</span>
              )}
            </div>

            <div className="mt-5 relative h-[80px]">
              <label>Password</label>
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                autoComplete="off"
                className="text-base focus:outline-[#089451] border-[1.5px] border-[#089451] mt-1 py-3 ps-4 w-full"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <span className="text-red-500 my-1">{formik.errors.password}</span>
              )}
              <span
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute top-[47px] right-5 cursor-pointer"
              >
                {passwordVisible ? <IoEyeSharp /> : <BsEyeSlashFill />}
              </span>
            </div>

            <div className="flex justify-between my-5">
              <label className="flex gap-2 items-center text-sm">
                <input type="checkbox" className="accent-green-600 w-4 h-4" />
                Remember Me
              </label>
              <Link to="/forgotpassword" className="hover:text-[#089451] text-sm">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#089451] flex justify-center items-center h-[40px] rounded text-white font-bold py-3 mt-5"
            >
              {myLoader ? (
                <div className="w-[25px] h-[25px] border-4 border-t-transparent border-white rounded-full animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>

            <div className="flex justify-between my-4 text-sm">
              <span className="font-semibold">Don &apos;t have an Account?</span>
              <Link to="/signup" className="font-bold text-[#089451] hover:text-black">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
