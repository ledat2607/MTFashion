import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

export const orderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("getAllOrdersRequest", (state) => {
      state.loading = true;
    })
    .addCase("getAllOrdersSuccess", (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    })
    .addCase("getAllOrdersFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("clearError", (state) => {
      state.error = null;
    });
});
