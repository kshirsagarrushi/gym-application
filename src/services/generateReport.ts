import axios from "axios";
import axiosInstance from "./axiosInstance";

interface generateReportParams {
  coachId: number;
  startDate: string;
  endDate: string;
  specialization: string;
}
const generateReport = async (
  obj: generateReportParams,
  token: string | null
) => {
  try {
    const headers = {
      authorization: `Bearer ${token}`,
    };
    if (token) {
      const response = await axios.post(
        `https://report-handler-run4team5-report-handler-dev.shared.edp-dev.cloudmentor.academy/admin/reports/create`,
        obj,
        {
          headers,
        }
      );
      console.log(response);
      return { error: false };
    }
  } catch (e: any) {
    if (
      e.message.includes("Network Error") ||
      e.message.includes("ERR_INTERNET_DISCONNECTED")
    ) {
      return {
        error: true,
        message:
          "Coudn't contact servers, please check your connection or try again",
      };
    }
    return { error: true, message: e.response.data.message };
  }
};

export default generateReport;
