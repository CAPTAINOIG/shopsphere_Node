import stepReducer from './stepReducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: stepReducer, // If stepReducer is an object with reducers (e.g., { vendor, editVendor })
});

export { store };
