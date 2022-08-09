import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";

interface WorkoutProps {
  id: number;
  isDone: boolean;
  workout: string;
  date: Date;
}

const Workout: FC<WorkoutProps> = ({ id, isDone, workout, date }) => {
  return (
    <ListItem key={id} divider>
      <Typography>{workout}</Typography>
      <Typography>{date.toString()}</Typography>
    </ListItem>
  );
};

export default Workout;
