import axiosInstance from "./axiosInstance";

const changeClientPassword = async (
  oldPassword: string,
  newPassword: string,
  token: string | null
) => {
  try {
    const headers = {
      authorization: `Bearer ${token}`,
    };
    const requestData = {
      current_password: oldPassword,
      new_password: newPassword,
    };
    const response = await axiosInstance.put(
      "/client/profile/update/password",
      requestData,
      { headers }
    );
    console.log(response);

    return { error: false };
  } catch (e: any) {
    console.log(e);
    return { error: true, message: e.response.data.message };
  }
};

export default changeClientPassword;
