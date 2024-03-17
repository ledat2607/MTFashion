import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/userReducer";
import { adminReducer } from "./reducer/adminReducer";

const Store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
  },
});
export default Store;
