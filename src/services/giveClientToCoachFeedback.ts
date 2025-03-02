import axiosInstance from "./axiosInstance";

interface FeedbackProps {
  workout_id: string;
  feedback: string;
  rating: number;
}

export const giveClientToCoachFeedback = async (
  token: null | string,
  feedbackData: FeedbackProps
) => {
  try {
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axiosInstance.post(
        "/client/workouts/feedback/add",
        feedbackData,
        {
          headers,
        }
      );
      return { error: false, data: response.data, status: response.status };
    }
  } catch (e: any) {
    console.log(e)
    if (
      e.message.includes("Network Error") ||
      e.message.includes("ERR_INTERNET_DISCONNECTED")
    ) {
      return {
        error: true,
        message:
          "Coudn't contact servers, please check your connection or try again",
      };
    }else if(e.response.data.message.includes("Feedback must not exceed 500 characters")|| e.response.data.message.includes("Feedback must be at least 2 characters")){
      return {
        error:true,
        message:e.response.data.message
      }
    }
    return { error: true , message:"Something went wrong. Try again later."};
  }
};
