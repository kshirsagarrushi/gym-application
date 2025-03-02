import axiosInstance from "../services/axiosInstance";

const checkTokenExpiry = async (token: string, role: string) => {
  let response;
  const headers = {
    authorization: `Bearer ${token}`,
  };
  if (role == "client") {
    response = await axiosInstance.get("/client/workouts", { headers });
  } else {
    response = await axiosInstance.get("/coach/workouts", { headers });
  }
  if (response.status != 200) {
    return false;
  }
  return true;
};

export default checkTokenExpiry;
