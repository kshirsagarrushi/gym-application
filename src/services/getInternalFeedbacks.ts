import axiosInstance from "./axiosInstance";

const getInternalFeedbacks = async (token: null | string) => {
  try {
    if (token) {
      const headers = {
        authorization: `Bearer ${token}`,
      };
      const response = await axiosInstance.get("/coach/profile/view", {
        headers,
      });
      return { error: false, data: response.data.data };
    } else {
      return { error: true };
    }
  } catch (e: any) {
    console.log(e);
    // return { error: false, data: e.response.data.data };
    return { error: true };
  }
};

export default getInternalFeedbacks;
