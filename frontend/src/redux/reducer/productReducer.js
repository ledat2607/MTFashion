import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("getAllProductsRequest", (state) => {
      state.loading = true;
    })
    .addCase("getAllProductsSuccess", (state, action) => {
      state.loading = false;
      state.products = action.payload;
    })
    .addCase("getAllProductsFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("clearError", (state) => {
      state.error = null;
    });
});
