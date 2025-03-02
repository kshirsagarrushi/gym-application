import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Admin {
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  role: string;
}

const initialState: Admin = {
  firstName: "",
  lastName: "",
  email: "",
  token: "",
  role: "",
};

const AdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminLogin: (state, action: PayloadAction<Admin>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    adminLogout: (state) => {
      Object.keys(state).forEach((key) => {
        (state as any)[key] = "";
      });
    },
  },
});

export const { adminLogin, adminLogout } = AdminSlice.actions;
export default AdminSlice.reducer;
