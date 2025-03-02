import formatDate2 from "../helpers/formatDate2";
import { AxiosError } from "axios";
import axiosInstance from "./axiosInstance";

interface filterWorkoutParams {
  sport: string;
  time: string;
  date: string;
  coach: number | undefined;
}
const filterWorkout = async (obj: filterWorkoutParams) => {
  try {
    let response;
    if (obj.coach) {
      response = await axiosInstance.get(
        `/workouts/filter?specialization=${obj.sport}&date=${formatDate2(
          obj.date
        )}&time=${obj.time}&coachId=${obj.coach}`
      );
    } else {
      response = await axiosInstance.get(
        `/workouts/filter?specialization=${obj.sport}&date=${formatDate2(
          obj.date
        )}&time=${obj.time}`
      );
    }

    console.log(response, "hello");
    return { error: false, data: response.data.data };
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
    else if(e.response.data.message.includes("No workouts found matching the given filters.")){
      return {error:true, message:e.response.data.message };
    }
    // Type casting e as an AxiosError
    if (e instanceof AxiosError && e.response?.data?.error){
      return { error: false, data: [] };
    }
    return { error: true };
  }
};

export default filterWorkout;
