import React, { useState, useEffect } from "react";
import { IoPersonAdd } from "react-icons/io5";
import { LiaTimesSolid } from "react-icons/lia";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const InviteMembers = ({ onBack }) => {
  const token = localStorage.getItem("token");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const generatePassword = (length = 10) => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const schema = yup.object().shape({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: yup
      .string()
      .matches(/^[0-9]+$/, "Phone number must be numeric")
      .min(7, "Phone number is too short")
      .required("Phone number is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const countries = [
    {
      name: "United States",
      code: "+1",
      flag: "https://hatscripts.github.io/circle-flags/flags/us.svg",
    },
    {
      name: "Canada",
      code: "+1",
      flag: "https://hatscripts.github.io/circle-flags/flags/ca.svg",
    },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const selectedCountry = countries[selectedIndex];
  const toggleCountry = () => setSelectedIndex((prev) => (prev === 0 ? 1 : 0));

  useEffect(() => {
    const newPassword = generatePassword(12);
    setValue("password", newPassword);
  }, [setValue]);

  const onSubmit = async (data) => {
    setIsLoading(true); // Start loader
    const endpoint = "https://service.swiftsuite.app/accounts/create-subaccount/";
    const formData = {
      ...data,
      country: {
        name: selectedCountry.name,
        code: selectedCountry.code,
        flag: selectedCountry.flag,
      },
    };

    try {
      const response = await axios.post(endpoint, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      toast.success("User created successfully!");
      navigate("/layout/invite-success");
    } catch (err) {
      if (err.response?.data?.detail) {
        toast.error(err.response.data.detail);
      } else if (err.response?.data?.email) {
        toast.error(err.response.data.email);
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setIsLoading(false); // Stop loader
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between">
        <p className="flex justify-center items-center gap-2 text-[#027840] font-bold">
          <IoPersonAdd /> Create New Member Account
        </p>
        <button
          onClick={onBack}
          className="flex justify-center items-center gap-2 text-[#027840] font-bold"
        >
          Esc <LiaTimesSolid />
        </button>
      </div>
      <p className="my-2 text-[15px]">
        You can have a maximum of 10 users in your account plan. 6 user licenses
        remaining
      </p>
      <div className="py-6 bg-white shadow-md rounded-[24px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Profile Settings */}
          <h2 className="text-xl font-semibold border-b pb-2 mb-6 text-gray-800 md:px-14 px-5">
            Profile Settings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-16 gap-6 mb-10 md:px-14 px-5">
            {/* First Name */}
            <div>
              <label className="block mb-1 text-[1.2rem] text-[#00000099] font-semibold">
                First Name
              </label>
              <input
                {...register("first_name")}
                type="text"
                className="w-full border rounded-md px-4 py-2 border-gray-300 bg-[#F9F9F9] outline-none"
              />
              {errors.first_name && (
                <small className="text-red-600">
                  {errors.first_name.message}
                </small>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block mb-1 text-[1.2rem] text-[#00000099] font-semibold">
                Last Name
              </label>
              <input
                {...register("last_name")}
                type="text"
                className="w-full border bg-[#F9F9F9] rounded-md px-4 py-2 border-gray-300 outline-none"
              />
              {errors.last_name && (
                <small className="text-red-600">
                  {errors.last_name.message}
                </small>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-[1.2rem] text-[#00000099] font-semibold">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                className="w-full border bg-[#F9F9F9] rounded-md px-4 py-2 border-gray-300 outline-none"
              />
              {errors.email && (
                <small className="text-red-600">{errors.email.message}</small>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 text-[1.2rem] text-[#00000099] font-semibold">
                Phone Number
              </label>
              <div className="flex items-center border-2 rounded-md overflow-hidden">
                <button
                  type="button"
                  onClick={toggleCountry}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200"
                >
                  <img
                    src={selectedCountry.flag}
                    alt="Flag"
                    className="w-5 h-5"
                  />
                  <span>{selectedCountry.code}</span>
                </button>
                <input
                  {...register("phone")}
                  type="tel"
                  className="flex-1 px-4 py-2 bg-[#F9F9F9] outline-none"
                />
              </div>
              {errors.phone && (
                <small className="text-red-600">{errors.phone.message}</small>
              )}
            </div>
          </div>

          {/* Verification Section */}
          <h2 className="text-xl font-semibold border-b pb-2 mb-6 text-gray-800 md:px-14 px-5">
            Verification
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-16 gap-6 mb-10 md:px-14 px-5">
            {/* Password */}
            <div>
              <label className="block mb-1 text-[1.2rem] text-[#00000099] font-semibold">
                Password
              </label>
              <input
                {...register("password")}
                type="text"
                className="w-full border bg-[#F9F9F9] text-[#02784066] rounded-md px-4 py-2 border-gray-300 outline-none"
              />
              {errors.password && (
                <small className="text-red-600">
                  {errors.password.message}
                </small>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`flex items-center justify-center bg-green-700 text-white px-6 w-[254px] py-2 rounded-md hover:bg-green-800 transition ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <ThreeDots
                  height="25"
                  width="30"
                  color="#fff"
                  ariaLabel="loading"
                />
              ) : (
                "Create"
              )}
            </button>
          </div>
        </form>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default InviteMembers;
