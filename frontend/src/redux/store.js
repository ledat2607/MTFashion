import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/userReducer";
import { adminReducer } from "./reducer/adminReducer";
import { productReducer } from "./reducer/productReducer";

const Store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    products: productReducer,
  },
});
export default Store;
