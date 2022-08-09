import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateTime } from "luxon";
import { RootState } from "../../store";

export type WorkoutData = {
  id: string;
  date?: DateTime | null | undefined;
  workout: string;
  isDone: boolean;
};

export interface WorkoutState {
  workouts: WorkoutData[];
}

const localState = localStorage.getItem("workouts");
const parsedLocalState =
  typeof localState === "string" ? JSON.parse(localState) : null;

const initialWorkouts =
  parsedLocalState != null
    ? parsedLocalState.workouts?.map((index: WorkoutData) => {
        if (typeof index.date === "string") {
          return {
            ...index,
            date: DateTime.fromISO(index.date),
          };
        } else return index;
      })
    : [];

const initialState: WorkoutState = {
  workouts: initialWorkouts,
};

export const workoutsSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {
    addWorkout: (state, action: PayloadAction<WorkoutData>) => {
      state.workouts = [...state.workouts, action.payload];
    },
    deleteWorkout: (state, action: PayloadAction<WorkoutData["id"]>) => {
      state.workouts = state.workouts.filter(
        (workout) => workout.id !== action.payload
      );
    },
    clearWorkouts: (state) => {
      state.workouts = [];
    },
  },
});

export const workoutsSelector = (state: RootState) => state.workouts;

export const { addWorkout, deleteWorkout, clearWorkouts } =
  workoutsSlice.actions;

export default workoutsSlice.reducer;
