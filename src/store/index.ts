import { configureStore } from "@reduxjs/toolkit";
import { workoutsSlice } from "../features/workouts/workoutsSlice";

const store = configureStore({
  reducer: {
    workouts: workoutsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

store.subscribe(() => {
  localStorage.setItem("workouts", JSON.stringify(store.getState().workouts));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
