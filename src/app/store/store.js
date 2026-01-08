import { configureStore } from '@reduxjs/toolkit';

// Import reducers from features (example connections)
// import eHeartReducer from '../../features/eHeart/models/eHeartSlice'; // Connect to eHeart model
// import panchangReducer from '../../features/panchang/models/panchangSlice'; // Connect to panchang model

const store = configureStore({
  reducer: {
    // eHeart: eHeartReducer,
    // panchang: panchangReducer,
    // Add more reducers from features
  },
});

export default store;