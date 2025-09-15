import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { handleNextStep } from "../redux/vendor";

import Vendorenrolment from "./Vendorenrolment";
import Fpicredential from "./Fpicredential";
import Fpioption from "./Fpioption";
import Lipsey from "./Lipsey";
import Fragrancex from "./Fragrancex";
import Zanders from "./Zanders";
import Cwr from "./Cwr";
import Ssi from "./Ssi";
import Rsr from "./Rsr";
import Identifier from "./Identifier";
import Thank from "./Thank";

import { BsCheckCircleFill } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";

import lipsey from "../../public/image/vendor enrol/lipsey.png";
import fragrancex from "../../public/image/vendor enrol/fragrancex.png";
import zanders from "../../public/image/vendor enrol/zanders.png";
import cwr from "../../public/image/vendor enrol/cwr.png";
import ssi from "../../public/image/vendor enrol/ssi.png";
import rsr from "../../public/image/vendor enrol/rsr.png";

const Enrolment = () => {
  const token = localStorage.getItem("token");
  const vendor_name = localStorage.getItem("vendor_name");
  const new_account = JSON.parse(localStorage.getItem("newAccount") || "false");
  const dispatch = useDispatch();
  const currentStepFromRedux = useSelector(
    (state) => state.vendor.vendorData.currentStep
  );

  useEffect(() => {
    dispatch(handleNextStep({ currentStep: new_account ? 0 : -1 }));
  }, [new_account, dispatch]);

  const steps = [
    "Vendor Enrolment",
    "FTP Credentials",
    "Vendor Options",
    "Product Type",
  ];

  const renderCurrentStep = () => {
    switch (currentStepFromRedux) {
      case 0:
        return <Vendorenrolment />;
      case 1:
        return <Fpicredential />;
      case 2:
        return <Identifier />;
      case 3:
        switch (vendor_name) {
          case "Lipsey":
            return <Lipsey />;
          case "Fragrancex":
            return <Fragrancex />;
          case "Zanders":
            return <Zanders />;
          case "CWR":
            return <Cwr />;
          case "SSI":
            return <Ssi />;
          case "RSR":
            return <Rsr />;
          default:
            return <Fpioption />;
        }
      case 4:
        return <Thank />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex items-center justify-around mt-10 pt-10 px-20">
        <div>
          <h1 className="text-xl font-bold py-3">
            Enrol Vendor
          </h1>
        </div>
        <div>
          {vendor_name === "Lipsey" ? (
            <img src={lipsey} alt="lipsey" className="h-16 md:h-20 object-contain" />
          ) : vendor_name === "Fragrancex" ? (
            <img src={fragrancex} alt="fragrancex" className="h-10 md:h-10 object-contain" />
          ) : vendor_name === "Zanders" ? (
            <img src={zanders} alt="zanders" className="h-10 md:h-10 object-contain" />
          ) : vendor_name === "CWR" ? (
            <img src={cwr} alt="cwr" className="h-10 md:h-10 object-contain" />
          ) : vendor_name === "SSI" ? (
            <img src={ssi} alt="ssi" className="h-10 md:h-10 object-contain" />
          ) : vendor_name === "RSR" ? (
            <img src={rsr} alt="rsr" className="h-10 md:h-10 object-contain" />
          ) : (
            'No image Available'
          )}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center gap-6 py-2">
          {steps.map((label, index) => {
            const completed = currentStepFromRedux > index;
            const current = currentStepFromRedux === index;

            return (
              <div
                key={index}
                className={`${
                  currentStepFromRedux === 4 ? "hidden" : "block"
                } flex items-center gap-2`}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-white text-sm ${
                    completed
                      ? "bg-green-600"
                      : current
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                >
                  {completed ? (
                    <BsCheckCircleFill className="text-white" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={`text-sm hidden md:block font-medium ${
                    current ? "text-green-800" : "text-gray-600"
                  }`}
                >
                  {label}
                </span>
                {index !== steps.length - 1 && (
                  <div className="w-6 h-px bg-gray-400" />
                )}
              </div>
            );
          })}
        </div>

        <div className="rounded-xl w-full max-w-3xl min-h-[300px] mb-10 py-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepFromRedux}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {renderCurrentStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Enrolment;
