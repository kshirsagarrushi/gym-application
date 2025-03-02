import axios from "axios";

const getClientDetails = async (token: null | string) => {
  try {
    if (token) {
      const headers = {
        authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        "https://gym-application-run4team5-sb-dev.shared.edp-dev.cloudmentor.academy/client/profile ",
        { headers }
      );
      return { error: false, data: response.data };
    }
  } catch (e) {
    console.log(e);
    return { error: true };
  }
};

export default getClientDetails;