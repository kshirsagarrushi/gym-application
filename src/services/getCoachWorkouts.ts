import axiosInstance from "./axiosInstance";

const getCoachWorkouts = async (token: null | string) => {
  try {
    if (token) {
      const headers = {
        authorization: `Bearer ${token}`,
      };
      const response = await axiosInstance.get("/coach/workouts", { headers });
      return { error: false, data: response.data.data.workouts };
    }
  } catch (e) {
    console.log(e);
    return { error: true };
  }
};

export default getCoachWorkouts;
