import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Toaster, toast } from 'sonner';
import { handleNextStep } from "../redux/newVendor";
import { useSearchParams } from "react-router-dom";

const NewVendorInfo1 = () => {
  const store = useSelector((state) => state.newVendor.addNewVendor);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [stateSelectDisabled, setStateSelectDisabled] = useState(true);
  const [errorsVisible, setErrorsVisible] = useState(false);
  const [postalCode, setPostalCode] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [isZipValid, setIsZipValid] = useState(false);
  const [myForm, setMyForm] = useState(null);
  const [loading, setLoading] = useState(true);

  const countryRef = useRef(null);
  const stateRef = useRef(null);
  const fileInput = useRef(null);

  const countries = [
    {
      name: "United States",
      code: "US",
      states: [
        "Alabama",
        "Alaska",
        // ... other states
      ],
    },
    {
      name: "Canada",
      code: "CA",
      states: [
        "Alberta",
        "British Columbia",
        // ... other states
      ],
    },
  ];

  const Schema = yup.object().shape({
    address_street1: yup.string().required(),
    address_street2: yup.string().required(),
    city: yup.string().required(),
    country: yup.string().required(),
    state: yup.string().required(),
    vendor_name: yup.string().required(),
    logo: yup.string().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm({
    resolver: yupResolver(Schema),
  });

  // Watch the logo field to detect when an image is uploaded
  const logo = watch("logo");

  const dispatch = useDispatch();

  useEffect(() => {
    const checkAutofill = () => {
      const countryValue = countryRef.current?.value;
      const stateValue = stateRef.current?.value;

      if (countryValue && countryValue !== country) {
        setCountry(countryValue);
        setValue("country", countryValue, { shouldValidate: true });
        setStateSelectDisabled(false);
      }

      if (stateValue && stateValue !== state && !stateSelectDisabled) {
        setState(stateValue);
        setValue("state", stateValue, { shouldValidate: true });
      }
    };

    checkAutofill();
    const interval = setInterval(checkAutofill, 500);
    return () => clearInterval(interval);
  }, [country, state, setValue, stateSelectDisabled]);

  useEffect(() => {
    const matchedVendor = localStorage.getItem('matchedVendor');
    if (matchedVendor) {
      try {
        const myFormData = JSON.parse(matchedVendor);
        const enrolment = myFormData?.enrolment || {};
        if (Object.keys(enrolment).length > 0) {
          setMyForm(enrolment);
          setValue("address_street1", enrolment?.address_street1 || "");
          setValue("address_street2", enrolment?.address_street2 || "");
          setValue("city", enrolment?.city || "");
          setValue("country", enrolment?.country || "");
          setValue("zip_code", enrolment?.zip_code || "");
          setValue("state", enrolment?.state || "");
          setValue("vendor_name", enrolment?.vendor_name || "");
          setValue("logo", enrolment?.logo || "");

          if (enrolment.state && enrolment?.country) {
            setCountry(enrolment?.country);
            setState(enrolment?.state);
            setStateSelectDisabled(false);
            setPostalCode(enrolment?.zip_code);
          }
        } else {
          console.warn("Enrolment data is empty.");
        }
      } catch (error) {
        console.error("Error parsing matchedVendor from localStorage:", error);
      }
    }
    setLoading(false);
  }, [setValue]);

  const onSubmit = (data) => {
    if (!country) {
      toast.error("Please select a country");
      return;
    }
    if (!postalCode) {
      toast.error("Please enter a zip code");
      return;
    }
    if (error) {
      toast.error("Please enter a valid zip code.");
      return;
    }

    const updatedForm = {
      ...store,
      ...data,
      country,
      state,
      zip_code: postalCode,
    };

    dispatch(handleNextStep(updatedForm));
  };

  useEffect(() => {
    if (postalCode && country) {
      validatePostalCode();
    }
  }, [postalCode, country]);

  const validatePostalCode = async () => {
    setError("");
    setResult(null);
    setIsZipValid(false);

    const selectedCountry = countries.find((c) => c.name === country);
    if (!selectedCountry) {
      setError("Please select a valid country.");
      return;
    }

    if (!postalCode) {
      setError("Please enter a ZIP code.");
      return;
    }

    try {
      const response = await axios.get(
        `https://api.zippopotam.us/${selectedCountry.code}/${postalCode}`
      );

      if (response.status === 200) {
        setResult(response.data);
        setIsZipValid(true);
      }
    } catch (err) {
      setError("Invalid postal code or region.");
      setIsZipValid(false);
    }
  };

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setCountry(selectedCountry);
    setState("");
    setStateSelectDisabled(false);
    setErrorsVisible(false);
    setValue("country", selectedCountry, { shouldValidate: true });
  };

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setState(selectedState);
    setErrorsVisible(false);
    setValue("state", selectedState, { shouldValidate: true });
  };

  const handleFocus = () => {
    setErrorsVisible(true);
  };

  const handleFileClick = (inputRef) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    e.target.value = ""; // Reset input

    try {
      const base64 = await convertToBase64(file);
      setValue("logo", base64, { shouldValidate: true });
      toast.success("Logo uploaded successfully!");
    } catch (err) {
      toast.error("Error processing the image.");
      console.error("Error converting file to Base64:", err);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="h-full">
      <section className="mb-10 shadow-[0_4px_25px_0_rgba(0,0,0,0.05)]">
        <form className="bg-white py-10 lg:mt-8 mt-0" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="lg:text-xl text-sm font-semibold font-sans border-gray-500 border-b lg:p-4 p-0 py-2 px-4">
            Vendor Information
          </h1>

          <div className="px-5">
            <div className="mt-5">
              <div className="flex lg:gap-10 md:gap-8 lg:mt-0 mt-5">
                <label className="w-[140px] mt-3 font-semibold">Vendor name:</label>
                <input
                  {...register("vendor_name", { required: true })}
                  type="text"
                  className={`border border-black focus:outline-none p-3 py-2 lg:w-[50%] md:w-[45%] rounded ${
                    errors.vendor_name && "border-red-600"
                  }`}
                />
              </div>
              <small className="text-red-600 ms-[42%]">
                {errors.vendor_name && <span>This field is required</span>}
              </small>
            </div>
          </div>

          <div className="flex lg:gap-16 gap-3 border-gray-500 border-b lg:p-5 p-4">
            <label className="flex justify-center items-center font-semibold">Upload Logo:</label>
            <div
              className={`shadow-lg rounded-3xl border-2 border-dotted ${
                logo ? "border-green-500" : "border-gray-300"
              } flex flex-col items-center justify-center lg:w-[52%] md:w-[46%] w-[58%] h-[189px] ms-12 lg:ms-6 md:ms-20 rounded lg:mt-3 mt-0 p-4`}
            >
              <button
                type="button"
                onClick={() => handleFileClick(fileInput)}
                className="text-lg text-gray-500 mb-2"
              >
                + Upload Vendor Logo
              </button>
              <p className="text-sm text-gray-400 text-center">
                Select image of the vendor logo from your device
              </p>
              <input
                type="file"
                ref={fileInput}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </div>
          </div>

          <h1 className="lg:text-xl text-sm font-semibold font-sans border-gray-500 border-b lg:p-5 p-5 px-5">
            Vendor Address
          </h1>
          <div className="px-5">
            <div className="mt-5">
              <div className="flex lg:gap-10 md:gap-8 lg:mt-0 mt-5">
                <label className="w-[140px] mt-3 font-semibold">Address 1:</label>
                <input
                  {...register("address_street1", { required: true })}
                  type="text"
                  className={`border border-black focus:outline-none p-3 py-4 lg:w-[50%] md:w-[45%] rounded ${
                    errors.address_street1 && "border-red-600"
                  }`}
                />
              </div>
              <small className="text-red-600 ms-[42%]">
                {errors.address_street1 && <span>This field is required</span>}
              </small>
            </div>
            <div className="">
              <div className="flex lg:gap-10 md:gap-8 lg:mt-0 mt-5">
                <label className="w-[140px] mt-3 font-semibold">Address 2:</label>
                <input
                  {...register("address_street2", { required: true })}
                  type="text"
                  className={`border border-black focus:outline-none p-3 py-4 lg:w-[50%] md:w-[45%] rounded ${
                    errors.address_street2 && "border-red-600"
                  }`}
                />
              </div>
              <small className="text-red-600 ms-[42%]">
                {errors.address_street2 && <span>This field is required</span>}
              </small>
            </div>
            <div className="">
              <div className="flex lg:gap-10 md:gap-8 gap-2 lg:mt-0 mt-5">
                <label className="w-[140px] mt-3 font-semibold">City:</label>
                <input
                  {...register("city", { required: true })}
                  type="text"
                  className={`border border-black focus:outline-none py-2 p-3 rounded ${errors.city && "border-red-600"}`}
                />
              </div>
              <small className="text-red-600 ms-[42%]">
                {errors.city && <span>This field is required</span>}
              </small>
            </div>
            <div className="">
              <div className="flex lg:gap-10 md:gap-8 gap-2 lg:mt-0 mt-5">
                <label className="w-[140px] mt-3 font-semibold">Postal Code (Zip)</label>
                <div>
                  <input
                    {...register("zip_code", { required: true })}
                    type="text"
                    placeholder=""
                    onChange={(e) => {
                      setPostalCode(e.target.value);
                    }}
                    onBlur={() => {
                      if (postalCode && country) {
                        validatePostalCode();
                      } else {
                        setError("Please select a country and enter a ZIP code.");
                      }
                    }}
                    className="border border-black focus:outline-none py-2 p-3 rounded"
                  />
                </div>
              </div>
              <small className="text-red-600 ms-[42%]">
                {errors.zip_code && <span>This field is required</span>}
              </small>
              <small className="text-red-600 me-10">{error && <span>{error}</span>}</small>
            </div>

            <div className="flex flex-col mb-5">
              <div className="flex md:gap-8 lg:gap-10 gap-2 ">
                <label className="mt-3 w-[140px] font-semibold">Country:</label>
                <select
                  ref={countryRef}
                  className="px-4 py-3 mb-4 lg:w-[50%] md:w-[45%] w-[250px] bg-white border border-black rounded-md shadow-sm focus:outline-none"
                  value={country}
                  onFocus={handleFocus}
                  {...register("country")}
                  onChange={handleCountryChange}
                >
                  <option value="">Select Country</option>
                  {countries.map((selectedCountry) => (
                    <option key={selectedCountry.name} value={selectedCountry.name}>
                      {selectedCountry.name}
                    </option>
                  ))}
                </select>
              </div>
              <small className="text-red-600 ms-[42%]">
                {errors.country && errorsVisible && <span>This field is required</span>}
              </small>
              <div className="flex md:gap-8 lg:gap-10 gap-2">
                <label className="mt-3 w-[140px] font-semibold">State:</label>
                <select
                  ref={stateRef}
                  className={`px-4 py-3 mb-4 lg:w-[50%] md:w-[45%] w-[250px] bg-white border border-black rounded-md shadow-sm focus:outline-none ${
                    stateSelectDisabled && "opacity-50 pointer-events-none"
                  }`}
                  value={state}
                  onFocus={handleFocus}
                  {...register("state")}
                  onChange={handleStateChange}
                  disabled={stateSelectDisabled}
                >
                  <option value="">Select State</option>
                  {country &&
                    countries
                      .find((selectedCountry) => selectedCountry.name === country)
                      ?.states.map((selectedState) => (
                        <option key={selectedState} value={selectedState}>
                          {selectedState}
                        </option>
                      ))}
                </select>
              </div>
              <small className="text-red-600 ms-[42%]">
                {errors.state && errorsVisible && <span>This field is required</span>}
              </small>
            </div>
          </div>
          <button
            type="submit"
            disabled={!postalCode || (!isZipValid && postalCode.trim() === "")}
            className={`${
              postalCode && (isZipValid || postalCode.trim() !== "")
                ? "bg-[#089451] hover:border hover:border-[#089451] hover:bg-white text-white hover:text-[#089451]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } rounded lg:ms-[50%] ms-[49%] lg:mt-1 mt-10 lg:p-2 p-2 lg:w-[20%] w-[105px]`}
          >
            Next
          </button>
        </form>
        <Toaster position="top-right" />
      </section>
    </div>
  );
};

export default NewVendorInfo1;