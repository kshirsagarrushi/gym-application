import axiosInstance from "./axiosInstance";

const changeCoachPassword = async (
  oldPassword: string,
  newPassword: string,
  token: string | null
) => {
  try {
    const headers = {
      authorization: `Bearer ${token}`,
    };
    const requestData = {
      currentPassword: oldPassword,
      newPassword: newPassword,
    };
    const response = await axiosInstance.put(
      "/coach/profile/update/password",
      requestData,
      { headers }
    );
    console.log(response);
    return { error: false };
  } catch (e: any) {
    console.log(e);
    if (e.response) {
      return { error: true, message: e.response.data.message };
    } else {
      return {
        error: true,
        message: "Something went wrong, please try again later",
      };
    }
  }
};

export default changeCoachPassword;
