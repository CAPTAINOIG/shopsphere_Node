import { createSlice } from "@reduxjs/toolkit";

const initialData =  {
  "id": 3,
  "name": null,
  "logo": null,
  "address_street1": null,
  "address_street2": null,
  "city": null,
  "state": null,
  "zip_code": null,
  "country": null
};

export const newVendorSlice = createSlice({
  name: "newVendor",
  initialState: {
    addNewVendor:  { ...initialData, currentStep: 0 },
    updateVendor: {},
    currentStep: 0,
  },
  reducers: {
    handleNextStep: (state, action) => {
      state.addNewVendor = { ...state.addNewVendor, ...action.payload };
      const { currentStep, vendor } = state.addNewVendor;
      state.addNewVendor.currentStep++;
      console.log(state.addNewVendor);
    },

    handlePreviousStep: (state) => {
    //   const { currentStep, vendor } = state.addNewVendor;
      state.addNewVendor.currentStep--;
    },

  },
});

export const { handleNextStep, handlePreviousStep } = newVendorSlice.actions;

export default newVendorSlice.reducer;
