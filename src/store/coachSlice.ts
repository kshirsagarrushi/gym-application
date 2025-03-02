import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Feedback } from "../components/ShowFeedbackList";

export interface COACH {
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  role: string;
  type?: string;
  certificates?: string[];
  specialization: string[];
  ratings: number;
  about: string;
  title: string;
  profilePicture: string;
  feedbacks: Feedback[];
}

const initialState: COACH = {
  firstName: "",
  lastName: "",
  email: "",
  token: "",
  role: "",
  type: "",
  certificates: [],
  specialization: [],
  ratings: 0,
  about: "",
  title: "",
  profilePicture: "",
  feedbacks: [],
};

const CoachSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    coachLogin: (state, action: PayloadAction<COACH>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.type = action.payload.type;
      state.certificates = action.payload.certificates;
      state.specialization = action.payload.specialization;
      state.ratings = action.payload.ratings;
      state.title = action.payload.title;
      state.about = action.payload.about;
      state.profilePicture = action.payload.profilePicture;
      state.feedbacks = action.payload.feedbacks;
    },
    coachLogout: (state) => {
      Object.keys(state).forEach((key) => {
        (state as any)[key] = "";
      });
    },
  },
});

export const { coachLogin, coachLogout } = CoachSlice.actions;
export default CoachSlice.reducer;
