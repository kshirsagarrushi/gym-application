import axiosInstance from "./axiosInstance";

interface coachDataProps {
  firstName: string;
  lastName: string;
  title: string;
  about: string;
  specialization: string;
  certificates: string[];
}

export const updateCoachDetails = async (
  token: null | string,
  coachData: coachDataProps
) => {
  try {
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await axiosInstance
        .put("/coach/profile/update", coachData, {
          headers,
        })
        .then((res) => res.data);
      return { error: false, data: response.data };
    }
  } catch (e) {
    console.log(e);
    return { error: true };
  }
};
