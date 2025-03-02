import axiosInstance from "./axiosInstance";

interface CoachProfile {
  data: CoachProfile | PromiseLike<CoachProfile | undefined> | undefined;
  id: number;
}

const getCoachProfileById = async (
  id: number
): Promise<CoachProfile | undefined> => {
  console.log("inside coachprofile");
  try {
    const response = await axiosInstance.get<CoachProfile>(
      `/coach/profile/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch coach profile:", error);
    return undefined;
  }
};

export default getCoachProfileById;
