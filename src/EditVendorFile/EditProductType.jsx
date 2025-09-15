import React, { useEffect, useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import { IoChevronDown } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { handleNextStep, handlePreviousStep } from '../redux/EditVendor';
import axios from 'axios';
import gif from '../Images/gif.gif';
import { Toaster, toast } from 'sonner';
import { MdInfo } from 'react-icons/md';
import ResponsiveTooltip from '../Vendorenrolment/ResponsiveTooltip'; 

const EditProductType = () => {
  const store = useSelector(state => state.editVendor.enrolmentUpdate);
  let token = localStorage.getItem('token');
  const vendor_name = localStorage.getItem('vendor_name');
  const connection = JSON.parse(localStorage.getItem('matchedVendor'));

  const [checkBoxesProduct, setCheckBoxesProduct] = useState([]);
  const [checkBoxesManufacturer, setCheckBoxesManufacturer] = useState([]);
  const [myLoader, setMyLoader] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [manufacturerOpen, setIsManufacturerOpen] = useState(false);
  const [option, setOption] = useState(new Set());
  const [selectedOptions, setSelectedOptions] = useState(new Set());
  const [myIdentifier, setIsMyIdentifier] = useState('');
  const [myEditDetails, setMyEditDetails] = useState([]);
  const [heading, setHeading] = useState('');
  const [heading2, setHeading2] = useState('');
  const [truck, setTruck] = useState(false);
  const [oversized, setOversized] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [check, setCheck] = useState(false);
  const [inventory, setInventory] = useState(false);
  const [order, setOrder] = useState(false);
  const [tracking, setTracking] = useState(false);
  const [third_party_marketplaces, setThirdPartyMarketplaces] = useState(false);
  const [returnable, setReturnable] = useState(false);

  const [productChecked, setProductChecked] = useState([]);
  const [manufacturerChecked, setManufacturerChecked] = useState([]);
  const [myForm, setMyForm] = useState('');

  useEffect(() => {
    if (connection) {
      if (connection.product_filter) {
        setCheckBoxesProduct((prev) =>
          JSON.stringify(prev) !== JSON.stringify(connection.product_filter)
            ? connection.product_filter
            : prev
        );
        setHeading2('Select Product');
      }

      if (connection.manufacturer) {
        setCheckBoxesManufacturer((prev) =>
          JSON.stringify(prev) !== JSON.stringify(connection.manufacturer)
            ? connection.manufacturer
            : prev
        );
        setHeading('Manufacturer');
      }

      if (connection.brand) {
        setCheckBoxesManufacturer((prev) =>
          JSON.stringify(prev) !== JSON.stringify(connection.brand)
            ? connection.brand
            : prev
        );
        setHeading('Brand');
      }

      if (connection.product_category) {
        setCheckBoxesProduct((prev) =>
          JSON.stringify(prev) !== JSON.stringify(connection.product_category)
            ? connection.product_category
            : prev
        );
        setHeading2('Category');
      }

      if (connection.enrollment?.identifier) {
        setIsMyIdentifier((prev) =>
          prev !== connection.enrollment.identifier
            ? connection.enrollment.identifier
            : prev
        );
      }

      setMyEditDetails((prev) =>
        JSON.stringify(prev) !== JSON.stringify(connection) ? connection : prev
      );
    }
  }, [connection]);

  useEffect(() => {
    if (Array.isArray(connection?.product_filter) && connection.product_filter.length) {
      setCheckBoxesProduct(connection.product_filter);
    }

    if (Array.isArray(connection?.manufacturer) && connection.manufacturer.length) {
      setCheckBoxesManufacturer(connection.manufacturer);
    } else if (Array.isArray(connection?.brand) && connection.brand.length) {
      setCheckBoxesManufacturer(connection.brand);
    }

    if (Array.isArray(connection?.enrollment?.product_filter)) {
      setSelectedOptions(new Set(connection.enrollment.product_filter));
    }
    if (Array.isArray(connection?.product_category) && connection.product_category.length) {
      setSelectedOptions(new Set(connection.enrollment.product_category));
    }

    if (Array.isArray(connection?.brand)) {
      setOption(new Set(connection.enrollment.brand));
    } else if (Array.isArray(connection?.manufacturer)) {
      setOption(new Set(connection.enrollment.manufacturer));
    }

    setIsMyIdentifier(connection?.enrollment?.identifier || false);
  }, []);

  const Schema = yup.object().shape({
    percentage_markup: yup
      .string()
      .matches(/^\d*\.?\d*$/, 'Must be a valid number')
      .nullable(),
    fixed_markup: yup
      .string()
      .matches(/^\d*\.?\d*$/, 'Must be a valid number')
      .nullable(),
    shipping_cost: yup
      .string()
      .matches(/^\d*\.?\d*$/, 'Must be a valid number')
      .nullable(),
    stock_minimum: yup
      .string()
      .matches(/^\d*\.?\d*$/, 'Must be a valid number')
      .nullable(),
    stock_maximum: yup
      .string()
      .matches(/^\d*\.?\d*$/, 'Must be a valid number')
      .nullable(),
    costaverage: yup.string().nullable(),
    inventory: yup.string().nullable(),
    send_orders: yup.string().nullable(),
    update_tracking: yup.string().nullable(),
    update_inventory: yup.string().nullable(),
    cost_average: yup.string().nullable(),
    truck_freight: yup.boolean().nullable(),
    oversized: yup.boolean().nullable(),
    returnable: yup.boolean().nullable(),
    third_party_marketplaces: yup.boolean().nullable(),
    serialized: yup.boolean().nullable(),
  });

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(Schema)
  });

  useEffect(() => {
    const matchedVendor = localStorage.getItem('matchedVendor');
    if (matchedVendor) {
      try {
        const myFormData = JSON.parse(matchedVendor);
        console.log("myFormData:", myFormData); // Log full response
        const enrolment = myFormData?.enrollment || {};
        console.log("enrolment:", enrolment);

        setMyForm(enrolment);

        // Set state for checkboxes
        setTruck(enrolment?.truck_freight || false);
        setOversized(enrolment?.oversized || false);
        setReturnable(enrolment?.returnable || false);
        setInventory(enrolment?.update_inventory || false);
        setOrder(enrolment?.send_orders || false);
        setTracking(enrolment?.update_tracking || false);
        setThirdPartyMarketplaces(enrolment?.third_party_marketplaces || false);
        setCheck(enrolment?.serialized || false);

        // Set form fields
        setValue("vendor_identifier", enrolment?.identifier || "");
        setValue("fixed_markup", enrolment?.fixed_markup || "");
        setValue("percentage_markup", enrolment?.percentage_markup || "");
        setValue("shipping_cost", enrolment?.shipping_cost || "");
        setValue("stock_minimum", enrolment?.stock_minimum || "");
        setValue("stock_maximum", enrolment?.stock_maximum || "");
        setValue("truck_freight", enrolment?.truck_freight || false);
        setValue("oversized", enrolment?.oversized || false);
        setValue("returnable", enrolment?.returnable || false);
        setValue("update_inventory", enrolment?.update_inventory || false);
        setValue("send_orders", enrolment?.send_orders || false);
        setValue("update_tracking", enrolment?.update_tracking || false);
        setValue("third_party_marketplaces", enrolment?.third_party_marketplaces || false);
        setValue("serialized", enrolment?.serialized || false);
      } catch (error) {
        console.error("Error parsing matchedVendor:", error);
      }
    }
  }, [setValue]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const manufacturerDropdown = () => {
    setIsManufacturerOpen(!manufacturerOpen);
  };

  let dispatch = useDispatch();
  let endpoint = `https://service.swiftsuite.app/api/v2/update-enrollment/${myIdentifier}/`;

  const onSubmit = (data) => {
    const formData = {
      ...store,
      ...data,
      ...(connection.product_filter && { product_filter: [...selectedOptions] }),
      ...(connection.manufacturer && { manufacturer: [...option] }),
      ...(connection.brand && { brand: [...option] }),
      ...(connection.product_category && { product_category: [...selectedOptions] }),
      stock_minimum: data.stock_minimum === "" ? null : data.stock_minimum,
      stock_maximum: data.stock_maximum === "" ? null : data.stock_maximum,
      shipping_cost: data.shipping_cost === "" ? null : data.shipping_cost,
    };

    if (connection.product_filter && selectedOptions.size === 0) {
      toast.error('Please select at least one product');
      return;
    }
    if (option.size === 0 && connection.enrollment.vendor !== 3) {
      toast.error('Please select at least one manufacturer.');
      return;
    }
    console.log(formData);

    setMyLoader(true);
    axios.put(endpoint, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    })
      .then((response) => {
        setMyLoader(false);
        localStorage.setItem("lipsey", JSON.stringify(response.data));
        console.log("response.data:", response.data);

        toast.success('Enrolment successfully updated');
        dispatch(handleNextStep(formData));
        localStorage.removeItem("editVendor");
      })
      .catch((err) => {
        setMyLoader(false);
        console.log("err:", err);
        if (err.response) {
          const { status } = err.response;
          if (status === 500 || status === 404) {
            toast.error("An internal server issue has occurred. Please contact customer service.");
          } else {
            toast.error(`Error ${status}: Something went wrong.`);
          }
        } else if (err.request) {
          toast.error("Network error: Please check your internet connection.");
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      });
  };

  const handlePrevious = () => {
    dispatch(handlePreviousStep());
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const selectallProducts = () => {
    setSelectedOptions(new Set(checkBoxesProduct));
    setProductChecked(checkBoxesProduct);
  };

  const deselectallProducts = () => {
    setSelectedOptions(new Set());
  };

  const handleCheckBoxProduct = (product) => {
    setSelectedOptions((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(product)) {
        newSelection.delete(product);
      } else {
        newSelection.add(product);
      }
      return newSelection;
    });
  };

  const handleManufacturerChange = (event) => {
    setOption(event.target.value);
  };

  const selectAllManufacturers = () => {
    setOption(new Set(checkBoxesManufacturer));
    setManufacturerChecked(checkBoxesManufacturer);
  };

  const deselectAllManufacturers = () => {
    setOption(new Set());
  };

  const handleCheckBoxManufacturer = (id) => {
    setOption(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  const handleCheckboxChange = (setState, fieldName) => (e) => {
    const checked = e.target.checked;
    setState(checked);
    setValue(fieldName, checked);
  };

  // Function to restrict input to numbers and decimals
  const restrictToNumbersAndDecimals = (e) => {
    e.target.value = e.target.value.replace(/[^0-9.]/g, '');
    if (e.target.value.split('.').length > 2) {
      e.target.value = e.target.value.replace(/\.(?=.*\.)/g, '');
    }
  };

  return (
    <>
      <section className='bg-[#E7F2ED] mb-10'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='lg:w-[100%] bg-white z-[100000] lg:h-[20%] py-10 lg:mt-8 mt-0 shadow-xl'>
            <div className={connection.enrollment.vendor === '4' ? 'grid grid-cols-12 mt-5 h-10 px-5' : 'hidden'}>
              <h3 className='text-sm font-semibold col-span-6'>Serialized:</h3>
              <div className="flex gap-2 h-[20px] col-span-6">
                <input
                  {...register("serialized")}
                  
                  type="checkbox"
                  onChange={handleCheckboxChange(setCheck, "serialized")}
                  checked={check}
                  className="w-5 h-5 rounded-lg border border-gray-500 focus:outline-none appearance-none bg-white checked:bg-green-500 checked:border-green-500 relative checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:font-bold checked:after:absolute checked:after:top-0 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:leading-5"
                />
                <ResponsiveTooltip title="Lorem ipsum dolor sit amet.">
                  <MdInfo />
                </ResponsiveTooltip>
              </div>
            </div>
            <div>
              <div className={!connection.product_filter && !connection.product_category ? 'hidden' : 'block'}>
                <h1 className='ms-5 lg:text-xl text-sm font-bold'>Product Type</h1>
                <div className='grid grid-cols-12 mt-5 px-5'>
                  <label className='mt-2 text-sm font-semibold h-8 md:col-span-6 col-span-5' htmlFor="">{heading2}:</label>
                  <div className='relative border border-gray-500 rounded p-1 text-sm h-8 md:col-span-6 col-span-7 lg:w-3/4'>
                    <div className='flex items-center px-2 cursor-pointer justify-between' onClick={toggleDropdown}>
                      <span className='text-gray-500'>{heading2}</span>
                      {isOpen ? <IoIosArrowUp size={14} /> : <IoChevronDown size={14} />}
                    </div>
                    {isOpen && (
                      <div className='max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white scrollbar-track-white scrollbar-shorter absolute mt-2 bg-white shadow-lg z-[100000] rounded-b-lg w-full py-3 right-[1px] border'>
                        <div className='flex justify-between gap-2 md:mx-2'>
                          <button type="button" className='border border-[#089451] font-semibold py-1 px-1 rounded' onClick={selectallProducts}>Select All</button>
                          <button type="button" className='border border-[#089451] font-semibold py-1 px-1 rounded' onClick={deselectallProducts}>Deselect All</button>
                        </div>
                        <div className='p-2'>
                          {checkBoxesProduct.map((product, index) => (
                            <div className='flex justify-between' key={index}>
                              <label>{product}</label>
                              <input
                              className="w-5 h-5 rounded-lg border border-gray-500 focus:outline-none appearance-none bg-white checked:bg-green-500 checked:border-green-500 relative checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:font-bold checked:after:absolute checked:after:top-0 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:leading-5 my-1"
                                type="checkbox"
                                checked={selectedOptions.has(product)}
                                onChange={() => handleCheckBoxProduct(product)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className={
                (!connection.brand || connection.brand.length === 0) &&
                (!connection.manufacturer || connection.manufacturer.length === 0)
                  ? 'hidden'
                  : 'lg:text-xl font-bold mt-5'
              }>
                <div className='grid grid-cols-12 mt-5 px-5'>
                  <label className='mt-2 text-sm font-semibold h-8 md:col-span-6 col-span-5' htmlFor="">
                    {heading}:
                  </label>
                  <div className='relative border border-gray-500 rounded p-1 text-sm h-8 md:col-span-6 col-span-7 lg:w-3/4'>
                    <div className='flex items-center px-2 cursor-pointer justify-between gap-2' onClick={manufacturerDropdown}>
                      <span className='text-gray-500'>{heading}</span>
                      {manufacturerOpen ? <IoIosArrowUp size={14} /> : <IoChevronDown size={14} />}
                    </div>
                    {manufacturerOpen && (
                      <div className='max-h-[60vh] right-[1px] overflow-y-auto scrollbar-thin scrollbar-thumb-white scrollbar-track-white scrollbar-shorter absolute mt-2 bg-white shadow-lg z-[1000] w-full py-3'>
                        <div className='flex justify-between gap-2 mx-1'>
                          <button type="button" className='border border-[#089451] py-1 px-1 rounded' onClick={selectAllManufacturers}>
                            Select All
                          </button>
                          <button type="button" className='border border-[#089451] py-1 px-1 rounded' onClick={deselectAllManufacturers}>
                            Deselect All
                          </button>
                        </div>
                        <div className='p-2'>
                          {checkBoxesManufacturer.map((checkbox, index) => (
                            <div className='flex justify-between hover:bg-gray-100' key={index}>
                              <label>{checkbox}</label>
                              <input
                                type="checkbox"
                                className="w-5 h-5 rounded-lg border border-gray-500 focus:outline-none appearance-none bg-white checked:bg-green-500 checked:border-green-500 relative checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:font-bold checked:after:absolute checked:after:top-0 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:leading-5 my-1"
                                checked={option.has(checkbox)}
                                onChange={() => handleCheckBoxManufacturer(checkbox)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className={connection.enrollment.vendor === 3 ? 'grid grid-cols-12 mt-5 h-10 px-5' : 'hidden'}>
                <h3 className="text-sm font-semibold col-span-6">Truck Freight:</h3>
                <div className="flex gap-2 h-[20px] col-span-6">
                  <input
                    {...register("truck_freight")}
                    type="checkbox"
                    onChange={handleCheckboxChange(setTruck, "truck_freight")}
                    checked={truck}
                    className="w-5 h-5 rounded-lg border border-gray-500 focus:outline-none appearance-none bg-white checked:bg-green-500 checked:border-green-500 relative checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:font-bold checked:after:absolute checked:after:top-0 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:leading-5"
                  />
                  <ResponsiveTooltip title="Include Truck Freight Only Products in Catalogue.">
                    <MdInfo />
                  </ResponsiveTooltip>
                </div>
              </div>
              <div className={connection.enrollment.vendor === 4 ? 'grid grid-cols-12 mt-5 h-10 px-5' : 'hidden'}>
                <h3 className="text-sm font-semibold col-span-6">Adult Sig Required:</h3>
                <div className="flex gap-2 h-[20px] col-span-6">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded-lg border border-gray-500 focus:outline-none appearance-none bg-white checked:bg-green-500 checked:border-green-500 relative checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:font-bold checked:after:absolute checked:after:top-0 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:leading-5"
                  />
                  <ResponsiveTooltip title="$5 cost is added to any product with adult signature required.">
                    <MdInfo />
                  </ResponsiveTooltip>
                </div>
              </div>
              <div className={connection.enrollment.vendor === 3 ? 'grid grid-cols-12 mt-5 h-10 px-5' : 'hidden'}>
                <h3 className="text-sm font-semibold col-span-6">Oversized:</h3>
                <div className="flex gap-2 h-[20px] col-span-6">
                  <input
                    {...register("oversized")}
                    type="checkbox"
                    onChange={handleCheckboxChange(setOversized, "oversized")}
                    checked={oversized}
                    className="w-5 h-5 rounded-lg border border-gray-500 focus:outline-none appearance-none bg-white checked:bg-green-500 checked:border-green-500 relative checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:font-bold checked:after:absolute checked:after:top-0 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:leading-5"
                  />
                  <ResponsiveTooltip title="Include Oversized Products in Catalogue.">
                    <MdInfo />
                  </ResponsiveTooltip>
                </div>
              </div>
              <div className={connection.enrollment.vendor === 3 ? 'grid grid-cols-12 mt-5 h-10 px-5' : 'hidden'}>
                <h3 className="text-sm font-semibold col-span-6">3rd Party Marketplace:</h3>
                <div className="flex gap-2 h-[20px] col-span-6">
                  <input
                    {...register("third_party_marketplaces")}
                    type="checkbox"
                    onChange={handleCheckboxChange(setThirdPartyMarketplaces, "third_party_marketplaces")}
                    checked={third_party_marketplaces}
                    className="w-5 h-5 rounded-lg border border-gray-500 focus:outline-none appearance-none bg-white checked:bg-green-500 checked:border-green-500 relative checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:font-bold checked:after:absolute checked:after:top-0 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:leading-5"
                  />
                  <ResponsiveTooltip title="Include products not allowed on 3rd party marketplaces.">
                    <MdInfo />
                  </ResponsiveTooltip>
                </div>
              </div>
              <div className={connection.enrollment.vendor === 3 ? 'grid grid-cols-12 mt-5 h-10 px-5' : 'hidden'}>
                <h3 className="text-sm font-semibold col-span-6">Non-Returnable:</h3>
                <div className="flex gap-2 h-[20px] col-span-6">
                  <input
                    {...register("returnable")}
                    type="checkbox"
                    onChange={handleCheckboxChange(setReturnable, "returnable")}
                    checked={returnable}
                    className="w-5 h-5 rounded-lg border border-gray-500 focus:outline-none appearance-none bg-white checked:bg-green-500 checked:border-green-500 relative checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:font-bold checked:after:absolute checked:after:top-0 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:leading-5"
                  />
                  <ResponsiveTooltip title="Include Non-Returnable Products.">
                    <MdInfo />
                  </ResponsiveTooltip>
                </div>
              </div>

              <h1 className="ms-5 lg:text-xl font-bold mt-2">Pricing Option</h1>
              <div>
                <div className="grid grid-cols-12 mt-5 px-5">
                  <h3 className="mt-2 text-sm font-semibold h-[35px] md:col-span-6 col-span-5">Percentage Markup:</h3>
                  <input
                    {...register("percentage_markup")}
                    type="text"
                    className="border h-[35px] md:col-span-6 col-span-7 lg:w-3/4 px-2 border-gray-500 focus:outline-none py-1 rounded"
                    onInput={restrictToNumbersAndDecimals}
                  />
                </div>
                <small className="text-red-600 ms-[42%] lg:ms-[55%]">
                  {errors.percentage_markup && <span>{errors.percentage_markup.message}</span>}
                </small>
              </div>

              <div>
                <div className="grid grid-cols-12 mt-5 px-5">
                  <h3 className="mt-2 text-sm font-semibold h-[35px] col-span-5 md:col-span-6">Fixed Markup:</h3>
                  <input
                    {...register("fixed_markup")}
                    type="text"
                    className="border h-[35px] col-span-7 md:col-span-6 lg:w-3/4 px-2 border-gray-500 focus:outline-none py-1 rounded"
                    onInput={restrictToNumbersAndDecimals}
                  />
                </div>
                <small className="text-red-600 ms-[42%] lg:ms-[55%]">
                  {errors.fixed_markup && <span>{errors.fixed_markup.message}</span>}
                </small>
              </div>


               <div>
                <div className="grid grid-cols-12 mt-5 px-5">
                  <h3 className="mt-2 text-sm font-semibold h-[35px] col-span-5 md:col-span-6">Shipping cost:</h3>
                  <input
                    {...register("shipping_cost")}
                    type="text"
                    className="border h-[35px] col-span-7 md:col-span-6 lg:w-3/4 px-2 border-gray-500 focus:outline-none py-1 rounded"
                    onInput={restrictToNumbersAndDecimals}
                  />
                </div>
                <small className="text-red-600 ms-[42%] lg:ms-[55%]">
                  {errors.shipping_cost && <span>{errors.shipping_cost.message}</span>}
                </small>
              </div>


              <h1 className="ms-5 lg:text-xl font-bold mt-5">Inventory</h1>
              <div>
                <div className="grid grid-cols-12 mt-5 px-5">
                  <h3 className="mt-2 text-sm font-semibold h-[35px] col-span-5 md:col-span-6">Stock Minimum:</h3>
                  <input
                    {...register("stock_minimum")}
                    type="text"
                    className="border h-[35px] col-span-7 md:col-span-6 lg:w-3/4 px-2 border-gray-500 focus:outline-none py-1 rounded"
                    onInput={restrictToNumbersAndDecimals}
                  />
                </div>
                <small className="text-red-600 ms-[42%] lg:ms-[55%]">
                  {errors.stock_minimum && <span>{errors.stock_minimum.message}</span>}
                </small>
              </div>

              <div>
                <div className="grid grid-cols-12 mt-5 px-5">
                  <h3 className="mt-2 text-sm font-semibold h-[35px] col-span-5 md:col-span-6">Stocks Maximum:</h3>
                  <input
                    {...register("stock_maximum")}
                    type="text"
                    className="border h-[35px] col-span-7 md:col-span-6 lg:w-3/4 px-2 border-gray-500 focus:outline-none py-1 rounded"
                    onInput={restrictToNumbersAndDecimals}
                  />
                </div>
                <small className="text-red-600 ms-[42%] lg:ms-[55%]">
                  {errors.stock_maximum && <span>{errors.stock_maximum.message}</span>}
                </small>
              </div>

              <h1 className='ms-5 lg:text-xl font-bold mt-5'>Integration Settings</h1>
              <div className='grid grid-cols-12 mt-5 h-10 px-5'>
                <h3 className='text-sm font-semibold col-span-6'>Update Inventory:</h3>
                <div className="flex gap-2 h-[20px] col-span-6">
                  <input
                    type="checkbox"
                    {...register("update_inventory")}
                    onChange={handleCheckboxChange(setInventory, "update_inventory")}
                    checked={inventory}
                   className="w-5 h-5 rounded-lg border border-gray-500 focus:outline-none appearance-none bg-white checked:bg-green-500 checked:border-green-500 relative checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:font-bold checked:after:absolute checked:after:top-0 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:leading-5"
                  />
                  <ResponsiveTooltip title="Swift Suite will start updating inventory on marketplace for synced products.">
                    <MdInfo />
                  </ResponsiveTooltip>
                </div>
              </div>
              <div className='grid grid-cols-12 mt-5 h-10 px-5'>
                <h3 className='text-sm font-semibold col-span-6'>Send Orders:</h3>
                <div className="flex gap-2 h-[20px] col-span-6">
                  <input
                    type="checkbox"
                    {...register("send_orders")}
                    onChange={handleCheckboxChange(setOrder, "send_orders")}
                    checked={order}
                    className="w-5 h-5 rounded-lg border border-gray-500 focus:outline-none appearance-none bg-white checked:bg-green-500 checked:border-green-500 relative checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:font-bold checked:after:absolute checked:after:top-0 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:leading-5"
                  />
                  <ResponsiveTooltip title="Check to allow orders to be sent to supplier for fulfillment.">
                    <MdInfo />
                  </ResponsiveTooltip>
                </div>
              </div>
              <div className='grid grid-cols-12 mt-5 h-10 px-5'>
                <h3 className='text-sm font-semibold col-span-6'>Update Tracking:</h3>
                <div className="flex gap-2 h-[20px] col-span-6">
                  <input
                    type="checkbox"
                    {...register("update_tracking")}
                    onChange={handleCheckboxChange(setTracking, "update_tracking")}
                    checked={tracking}
                    className="w-5 h-5 rounded-lg border border-gray-500 focus:outline-none appearance-none bg-white checked:bg-green-500 checked:border-green-500 relative checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:font-bold checked:after:absolute checked:after:top-0 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:leading-5"
                  />
                  <ResponsiveTooltip title="Start updating order tracking information.">
                    <MdInfo />
                  </ResponsiveTooltip>
                </div>
              </div>

              <div className='flex gap-20 justify-center my-5'>
                <button
                  type='button'
                  onClick={handlePrevious}
                  className='bg-white text-[#089451] border py-1 px-3 rounded hover:bg-[#089451] font-bold hover:text-white border-[#089451]'
                >
                  Previous
                </button>
                <button
                  type='submit'
                  className='bg-[#089451] text-white border py-1 px-5 rounded hover:bg-white font-bold hover:text-[#089451] border-[#089451]'
                >
                  {myLoader ? <img src={gif} alt="" className='w-[25px]' /> : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
      <Toaster position="top-right" />
    </>
  );
};

export default EditProductType;