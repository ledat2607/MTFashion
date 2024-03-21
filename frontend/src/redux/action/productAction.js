import axios from "axios";
import { server } from "../../server";

//Load user information
export const getAllPRoduct = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });
    const { data } = await axios.get(`${server}/product/all-product-admin`, {
      withCredentials: true,
    });
    dispatch({
      type: "getAllProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response.data.message,
    });
  }
};
