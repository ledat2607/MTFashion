import axios from "axios";
import { server } from "../../server";

//Load user information
export const getAllOrder = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersRequest",
    });
    const { data } = await axios.get(
      `${server}/order/all-order-user/${userId}`
    );
    dispatch({
      type: "getAllOrdersSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersFailed",
      payload: error.response.data.message,
    });
  }
};
