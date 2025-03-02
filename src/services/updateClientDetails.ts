import axiosInstance from "./axiosInstance";

interface clientDataProps {
  firstName: string;
  lastName: string;
  preferableActivity: string;
  target: string;
}

export const updateClientDetails = async (
  token: null | string,
  clientData: clientDataProps
) => {
  try {
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await axiosInstance
        .put("/client/profile/update", clientData, {
          headers,
        })
        .then((res) => res.data);
        console.log("response",response);
      return { error: false, data: response.message };
    }
  } catch (e: any) {
    if(!e.response){
      return { error: true, data: "Coudn't contact servers, please check your connection or try again" };
    }else if(e.response.data.message.includes("Last name must contain only letters.") || e.response.data.message.includes("First name must contain only letters.")){
      return {error:true, data:e.response.data.message}
    }
    return { error: true };
  }
};
