import { configureStore } from "@reduxjs/toolkit";
import jobApplicationReducer from "./jobApplicationSlice";

// redux store which stores all the state 
const store = configureStore({
  reducer: {
    jobApplications: jobApplicationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
