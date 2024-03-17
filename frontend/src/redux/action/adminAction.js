import axios from "axios";
import { server } from "../../server";

//Load user information
export const loadAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadAdminRequest",
    });
    const { data } = await axios.get(`${server}/admin/get-admin`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadAdminSuccess",
      payload: data.admin,
    });
  } catch (error) {
    dispatch({
      type: "LoadAdminFail",
      payload: error.response.data.message,
    });
  }
};
