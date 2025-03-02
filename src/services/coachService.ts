import axiosInstance from "./axiosInstance";

export const getAllCoaches = async () => {
  try {
    const response = await axiosInstance.get("/coach/all");
    return { error: false, data: response.data.data };
  } catch (error: any) {
    console.log(error);
    if (
      error.message.includes("Network Error") ||
      error.message.includes("ERR_INTERNET_DISCONNECTED")
    ) {
      return {
        error: true,
        message:
          "Coudn't contact servers, please check your connection or try again",
      };
    }
    return { error: true, data: [] };
  }
};
