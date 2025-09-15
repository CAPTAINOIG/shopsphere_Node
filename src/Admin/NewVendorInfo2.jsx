import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Toaster, toast } from 'sonner';
import { handlePreviousStep } from "../redux/newVendor";

const NewVendorInfo2 = () => {
  const store = useSelector((state) => state.newVendor.addNewVendor);
  const dispatch = useDispatch();

  // Yup validation schema
  const Schema = yup.object().shape({
    credential1Value: yup.string().required("Credential value is required"),
    credential2Value: yup.string().required("Credential value is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  });

  // State for dropdown selections with default values
  const [credential1Key, setCredential1Key] = useState("api_access_id");
  const [credential2Key, setCredential2Key] = useState("api_access_key");

  const handleBack = () => {
    console.log("Back button clicked, dispatching handlePreviousStep");
    dispatch(handlePreviousStep());
  };

  const onSubmit = (data) => {
    // Validate dropdown selections
    if (!credential1Key || !credential2Key) {
      toast.error("Please select a credential type for both fields");
      return;
    }

    // Create payload with dropdown selections as keys and input values as values
    const payload = {
      [credential1Key]: data.credential1Value,
      [credential2Key]: data.credential2Value,
    };

    // Log the payload
    console.log("Form submission payload:", payload);

    // Show success toast
    toast.success("Form submitted successfully!");
  };

  return (
    <div className="h-screen py-10 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border shadow-[0_4px_25px_0_rgba(0,0,0,0.05)] rounded-xl bg-white"
      >
        <h1 className="font-semibold my-4 mx-6 text-[1.2rem]">
          Select Vendor Credentials
        </h1>
        <div className="flex md:gap-10 gap-2 justify-center px-2">
          <select
            name="credential1Key"
            className="border lg:w-[230px] md:w-[210px] sm:w-[190px] w-[170px] bg-[#F2F2F2] text-[#089451] p-2 outline-none border-1 rounded-[5px]"
            value={credential1Key}
            onChange={(e) => setCredential1Key(e.target.value)}
          >
            <option value="">Select Credential</option>
            <option value="api_access_id">API Access ID</option>
            <option value="ftp_username">FTP Username</option>
            <option value="username">Username</option>
          </select>
          <div>
            <input
              type="text"
              {...register("credential1Value")}
              className={`border lg:w-[230px] md:w-[210px] sm:w-[190px] w-[180px] p-2 outline-none border-1 rounded-[5px] ${
                errors.credential1Value ? "border-red-600" : "border-black"
              }`}
            />
            {errors.credential1Value && (
              <small className="text-red-600 block mt-1">
                {errors.credential1Value.message}
              </small>
            )}
          </div>
        </div>
        <div className="flex md:gap-10 gap-2 my-5 justify-center px-2">
          <select
            name="credential2Key"
            className="border lg:w-[230px] md:w-[210px] sm:w-[190px] w-[170px] p-2 outline-none border-1 bg-[#F2F2F2] text-[#089451] rounded-[5px]"
            value={credential2Key}
            onChange={(e) => setCredential2Key(e.target.value)}
          >
            <option value="">Select Credential</option>
            <option value="api_access_key">API Access Key</option>
            <option value="ftp_password">FTP Password</option>
            <option value="password">Password</option>
          </select>
          <div>
            <input
              type="text"
              {...register("credential2Value")}
              className={`border lg:w-[230px] md:w-[210px] sm:w-[190px] w-[180px] p-2 outline-none border-1 rounded-[5px] ${
                errors.credential2Value ? "border-red-600" : "border-black"
              }`}
            />
            {errors.credential2Value && (
              <small className="text-red-600 block mt-1">
                {errors.credential2Value.message}
              </small>
            )}
          </div>
        </div>
        <div className="flex my-5 justify-center gap-4">
          <button
            type="submit"
            className="border px-10 rounded bg-[#089451] text-white py-2"
          >
            Pull Data
          </button>
        </div>
      </form>
      <button
        onClick={handleBack}
        className="bg-red-300 text-white px-10 py-2 rounded mt-4"
      >
        Back
      </button>
      <Toaster position="top-right" />
    </div>
  );
};

export default NewVendorInfo2;