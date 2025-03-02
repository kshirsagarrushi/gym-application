import axiosInstance from "./axiosInstance";

interface bookWorkoutParams {
  coachEmail: string;
  date: string;
  workoutType: string;
  timeSlot: string;
}
const bookWorkout = async (obj: bookWorkoutParams, token: string | null) => {
  try {
    const headers = {
      authorization: `Bearer ${token}`,
    };
    console.log(obj);
    if (token) {
      console.log("object date in bookworkout", obj);
      const response = await axiosInstance.post("/client/workouts/book", obj, {
        headers,
      });
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
    else if (
      e.response.data.message.includes(
        "The requested time slot is already booked."
      ) ||
      e.response.data.message.includes("Date must be a future date") || e.response.data.message.includes("Time slot is required and can't be empty") || e.response.data.message.includes("You have an existing workout scheduled") || e.response.data.message.includes("Bookings must be made at least one hour before the slot start time")
    ) {
      return { error: true, message: e.response.data.message };
    }
    console.log("last",e);
    return { error: true, message: "Something went wrong!!! Try again later" };
  }
};

export default bookWorkout;
