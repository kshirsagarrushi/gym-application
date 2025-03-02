import axiosInstance from "./axiosInstance";

const signIn = async (email: string, password: string) => {
  const requestBody = {
    email,
    password,
  };
  try {
    const response = await axiosInstance.post("/users/signin", requestBody);
    console.log(response);
    localStorage.setItem("token", response.data.data.token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        role: response.data.data.role,
        ...response.data.data.userDetails,
      })
    );
    console.log("response from auth", response);
    const data = {
      role: response.data.data.role,
      userDetails: response.data.data.userDetails,
    };
    return { error: false, data: data };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    console.log(e);
    if (e.response) {
      return { error: true, message: e.response.data.message };
    }
  }
};

const signUp = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  activity: string,
  target: string
) => {
  const requestBody = {
    firstName: firstname,
    lastName: lastname,
    target,
    preferableActivity: activity,
    email,
    password,
  };

  try {
    const response = await axiosInstance.post("/users/signup", requestBody);
    return {
      error: false,
      response: response,
      message: "Signup Successfull, please login to continue",
    };
  } catch (e: any) {
    console.log(e);
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

    // For other types of errors (like API errors)
    if (e.response) {
      const errMsg = e.response.data.message;
      return { error: true, message: errMsg.split("(")[0] }; // Trims any unwanted parts after "("
    }

    // Handle any unknown error
    return {
      error: true,
      message: "Something went wrong. Please try again later.",
    };
  }
};

export { signIn, signUp };
