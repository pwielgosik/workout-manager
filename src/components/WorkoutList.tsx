import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Stack from "@mui/material/Stack";
import AddWorkoutForm from "./AddWorkoutForm";
import { nanoid } from "nanoid";
import { DateTime } from "luxon";
import { useSelector, useDispatch } from "react-redux";
import {
  addWorkout,
  deleteWorkout,
  clearWorkouts,
} from "../features/workouts/workoutsSlice";
import { WorkoutData } from "../features/workouts/workoutsSlice";
import { workoutsSelector } from "../features/workouts/workoutsSlice";
import { AppDispatch } from "../store";

interface WorkoutListProps {
  searchInput: string;
}

const sortWorkouts = (workouts: WorkoutData[]) => {
  const arr = [...workouts];

  if (workouts.length <= 1) return workouts;

  const sortedWorkouts = arr.sort((a, b) => {
    if (a.date && b.date != null) {
      return a.date?.toSeconds() - b.date?.toSeconds();
    } else return 0;
  });
  return sortedWorkouts;
};

// function arrayEquals(a: WorkoutData[], b: WorkoutData[]) {
//   return a.length === b.length && a.every((val, index) => val === b[index]);
// }

const WorkoutList = ({ searchInput }: WorkoutListProps) => {
  const [checked, setChecked] = React.useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { workouts } = useSelector(workoutsSelector);
  const sortedWorkouts = workouts ? sortWorkouts(workouts) : [];
  const dispatch = useDispatch<AppDispatch>();

  const handleToggle = (id: string) => () => {
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleDeleteWorkout = (id: string) => () => {
    dispatch(deleteWorkout(id));
  };

  const handleAddWorkout = (workout: string, date?: DateTime | null) => {
    const newWorkout = {
      id: nanoid(),
      workout: workout,
      isDone: false,
      date: date,
    };
    dispatch(addWorkout(newWorkout));
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleClearList = () => dispatch(clearWorkouts());

  return (
    <>
      <List
        sx={{
          width: "100%",
          maxWidth: 500,
          bgcolor: "transparent",
          paddingRight: 0,
          paddingTop: 3,
          paddingBottom: 4,
          margin: "auto",
        }}
      >
        <Stack spacing={1}>
          {sortedWorkouts
            .filter((el) => {
              //if no input the return the original
              if (searchInput === "") {
                return el;
              }
              //return the item which contains the user input
              else {
                return el.workout.toLowerCase().includes(searchInput);
              }
            })
            .map((workout) => {
              const labelId = `checkbox-list-label-${workout.id}`;

              return (
                <ListItem
                  key={workout.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete workout"
                      onClick={handleDeleteWorkout(workout.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                  disablePadding
                  divider
                >
                  <ListItemButton
                    role={undefined}
                    onClick={handleToggle(workout.id)}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(workout.id) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={workout.workout} />
                    {workout.date ? (
                      <ListItemText>
                        {workout.date.toLocaleString(DateTime.DATETIME_MED)}
                      </ListItemText>
                    ) : null}
                  </ListItemButton>
                </ListItem>
              );
            })}
        </Stack>
      </List>
      <ButtonGroup disableElevation variant="contained" size="large">
        <Button
          variant="contained"
          onClick={handleOpenModal}
          aria-label="add new workout"
        >
          Add workout
        </Button>
        <Button
          variant="outlined"
          onClick={handleClearList}
          aria-label="clear all workouts"
        >
          Clear all
        </Button>
      </ButtonGroup>
      <AddWorkoutForm
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        handleAddWorkout={handleAddWorkout}
      />
    </>
  );
};

export default WorkoutList;
