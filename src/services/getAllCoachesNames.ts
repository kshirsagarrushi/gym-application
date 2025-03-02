import axios from "axios";
import axiosInstance from "./axiosInstance";

const getAllCoachesNames = async () => {
  try {
    const response = await axiosInstance.get(
      "/coach/info"
    );
    return { error: false, data: response.data.data };
  } catch (e) {
    console.log(e);
    return { error: true };
  }
};

export default getAllCoachesNames;
