import axios from "axios";

const getDetailedReport = async (token: string | null, reportId: number) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(
      `https://report-handler-run4team5-report-handler-dev.shared.edp-dev.cloudmentor.academy/admin/reports/detailedReport/${reportId}`,
      {
        headers,
      }
    );
    return { error: false, data: response.data.data };
  } catch (e) {
    console.log(e);
    return { error: true };
  }
};

export default getDetailedReport;
