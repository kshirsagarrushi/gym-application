import axiosInstance from "./axiosInstance";

const getClientWorkouts = async (token: null | string) => {
  console.log("inside get client workouts");
  try {
    if (token) {
      const headers = {
        authorization: `Bearer ${token}`,
      };
      const response = await axiosInstance.get("/client/workouts", { headers });
      return { error: false, data: response.data.data.workouts };
    }
  } catch (e) {
    console.log(e);
    return { error: true };
  }
};

export default getClientWorkouts;
