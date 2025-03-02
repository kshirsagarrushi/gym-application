import axios from "axios";

const downloadReport = async (
  token: string | null,
  report_id: number,
  type: string
) => {
  try {
    console.log(token);
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(
      `https://report-handler-run4team5-report-handler-dev.shared.edp-dev.cloudmentor.academy/admin/reports/download?reportId=${report_id}&format=${
        type == "excel" ? "cvs" : type
      }`,
      {
        headers,
        responseType: "blob", // This tells axios to handle it as a binary file
      }
    );

    const mimeTypes: Record<string, string> = {
      pdf: "application/pdf",
      csv: "text/csv",
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      txt: "text/plain",
    };

    const mimeType = mimeTypes[type] || "application/octet-stream"; // Default to generic binary

    // Create a blob from the response data
    const blob = new Blob([response.data], { type: mimeType });

    const url = window.URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement("a");
    link.href = url;
    link.download = `report_${report_id}.${type}`; // Dynamic filename
    document.body.appendChild(link);
    // Trigger the download
    link.click();

    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);

    return { error: false };
  } catch (e: any) {
    console.log(e);
    return {
      error: true,
      message: e.response?.data?.message || "Download failed",
    };
  }
};

export default downloadReport;
