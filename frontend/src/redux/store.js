import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/userReducer";
import { adminReducer } from "./reducer/adminReducer";
import { productReducer } from "./reducer/productReducer";
import { orderReducer } from "./reducer/orderReducer";

const Store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    products: productReducer,
    orders: orderReducer
  },
});
export default Store;
