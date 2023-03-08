import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/userSlice";
// import tasks from "./slices/TasksSlice";
import filter from "./slices/FilterSlice";

export const store = configureStore({
  // reducer: { user, tasks, filter },
  reducer: { user, filter },
  devTools: process.env.NODE_ENV !== "production",
});
