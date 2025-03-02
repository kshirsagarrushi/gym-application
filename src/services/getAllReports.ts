import axios from "axios";
import axiosInstance from "./axiosInstance";

const getAllReports = async (token: string | null) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(
      "https://report-handler-run4team5-report-handler-dev.shared.edp-dev.cloudmentor.academy/admin/reports/viewAll",
      {
        headers,
      }
    );
    console.log(response);
    return { error: false, data: response.data.data };
  } catch (e: any) {
    console.log(e);
    return { error: true, message: e.response.data.message };
  }
};

export default getAllReports;
