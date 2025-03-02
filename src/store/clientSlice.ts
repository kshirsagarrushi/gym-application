import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CLIENT {
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  role: string;
  target: string;
  preferableActivity: string;
}

interface ClinetUpdate{
  firstName?:string;
  lastName?:string;
  target?:string;
  preferableActivity?:string;
}

const initialState: CLIENT = {
  firstName: "",
  lastName: "",
  email: "",
  token: "",
  role: "",
  target: "",
  preferableActivity: "",
};

const ClientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    clientLogin: (state, action: PayloadAction<CLIENT>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.target = action.payload.target;
      state.preferableActivity = action.payload.preferableActivity;
    },
    updateDetails:(state,action:PayloadAction<ClinetUpdate>)=>{
      state.firstName = action.payload.firstName || state.firstName;
      state.lastName = action.payload.lastName || state.lastName;
      state.target = action.payload.target || state.target;
      state.preferableActivity = action.payload.preferableActivity || state.preferableActivity;
    },
    clientLogout: (state) => {
      Object.keys(state).forEach((key) => {
        (state as any)[key] = "";
      });
    },
  },
});

export const { clientLogin, clientLogout,updateDetails } = ClientSlice.actions;
export default ClientSlice.reducer;
