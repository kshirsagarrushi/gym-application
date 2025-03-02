import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./clientSlice";
import coachReducer from "./coachSlice";
import adminReducer from "./adminSlice";
export const store = configureStore({
  reducer: {
    client: clientReducer,
    coach: coachReducer,
    admin: adminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
