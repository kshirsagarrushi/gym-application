import axiosInstance from "./axiosInstance";

interface FeedbackProps {
  workoutId: string;
  feedbackText: string;
  clientEmail: string;
}

export const giveCoachToClientFeedback = async (
  token: null | string,
  feedbackData: FeedbackProps
) => {
  try {
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axiosInstance.post(
        "/coach/workouts/feedback/add",
        feedbackData,
        {
          headers,
        }
      );
      return { error: false, data: response.data };
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
    }else if(e.response.data.message.includes("Feedback should be less than 500 characters long")){
      return {
        error:true,
        message:"Feedback should be less than 500 characters long"
      }
    }
    return { error: true, message: "Something went wrong. Try again later." };
  }
};
