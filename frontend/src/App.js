import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  LoginPage,
  SignUpPage,
  HomePage,
  VerifyEmailPage,
  Product,
  ProfilePage,
  ProductPage,
  CheckOutPage,
  PaymentPage,
  OrderSuccessPage,
  DetailOrderPage,
  ChatPage,
} from "./Routes.js";
import {
  SignUpAdminPage,
  LoginAdminPage,
  AdminHomepage,
  AdminChatPage,
} from "./AdminRoutes.js";
import Store from "./redux/store.js";
import { loadUser } from "./redux/action/userAction.js";
import ProtectedRoute from "./protectedRoutes/userProtected.js";
import AdminProtectedRoute from "./protectedRoutes/AdminProtected.js";
import { loadAdmin } from "./redux/action/adminAction.js";
import { getAllPRoduct } from "./redux/action/productAction.js";
const App = () => {
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadAdmin());
    Store.dispatch(getAllPRoduct());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:name" element={<ProductPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/check_out"
          element={
            <ProtectedRoute>
              <CheckOutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/success"
          element={
            <ProtectedRoute>
              <OrderSuccessPage />
            </ProtectedRoute>
          }
        />
        <Route path="/detail-order/:id" element={<DetailOrderPage />} />
        {/*Admin page*/}
        <Route path="/admin/sign-up" element={<SignUpAdminPage />} />
        <Route path="/admin/login" element={<LoginAdminPage />} />
        <Route
          path="/admin/"
          element={
            <AdminProtectedRoute>
              <AdminHomepage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/chat"
          element={
            <AdminProtectedRoute>
              <AdminChatPage />
            </AdminProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />
    </BrowserRouter>
  );
};

export default App;
