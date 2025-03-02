import axiosInstance from "./axiosInstance";

const cancelClientWorkout = async (
  workout_id: number | null | undefined,
  token: string | null
) => {
  try {
    const requestData = {
      workout_id,
    };

    const headers = {
      authorization: `Bearer ${token}`,
    };
    if (token) {
      const response = await axiosInstance.put(
        "/client/workouts/cancel",
        requestData,
        { headers }
      );
      console.log(response);
      return { error: false, data: response.data.message };
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

export default cancelClientWorkout;
