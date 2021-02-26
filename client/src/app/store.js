import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../Components/counter/counterSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
