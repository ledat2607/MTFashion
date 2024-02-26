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
  ShopManPage,
  ShopWomanPage,
  ProfilePage,
  ProductPage,
} from "./Routes.js";
import Store from "./redux/store.js";
import { loadUser } from "./redux/action/userAction.js";
import ProtectedRoute from "./protectedRoutes/userProtected.js";
const App = () => {
  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/man" element={<ShopManPage />} />
        <Route path="/woman" element={<ShopWomanPage />} />
        <Route path="/product/:name" element={<ProductPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        ></Route>
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
