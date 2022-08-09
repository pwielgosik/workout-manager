import React from "react";
import {
  Box,
  TextField,
  Button,
  Modal,
  Typography,
  Stack,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DateTime } from "luxon";
import { styled } from "@mui/material/styles";

const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 250px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  box-shadow: 24px;
  border-radius: 2px;
  padding: 24px;
  display: flex;
  flex-direction: column;
`;

interface AddWorkoutFormProps {
  handleCloseModal: () => void;
  isModalOpen: boolean;
  handleAddWorkout: (workout: string, date?: DateTime | null) => void;
}

interface IState {
  date: DateTime;
  workout: string;
}

const initialState = {
  date: DateTime.now(),
  workout: "",
};

const AddWorkoutForm = ({
  handleCloseModal,
  isModalOpen,
  handleAddWorkout,
}: AddWorkoutFormProps) => {
  const [input, setInput] = React.useState<IState>(initialState);
  const [date, setDate] = React.useState<DateTime | null>(DateTime.now());

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => {
      const newState = { ...prev, [event.target.name]: event.target.value };
      return newState;
    });
  };

  const handleChangeDate = (newValue: DateTime | null) => {
    setDate(newValue);
    console.log(newValue);
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledBox>
        <Stack spacing={2}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter new workout
          </Typography>
          <TextField
            required
            aria-required
            label="Workout name"
            name="workout"
            id="workout-text-input"
            defaultValue="Enter new workout"
            value={input.workout}
            onChange={handleChange}
          />
          <DateTimePicker
            disableMaskedInput
            label="Date"
            value={date}
            onChange={handleChangeDate}
            renderInput={(params) => <TextField {...params} />}
          />
          <Button
            variant="contained"
            onClick={() => {
              handleAddWorkout(input.workout, date);
              handleCloseModal();
            }}
          >
            Add
          </Button>
          <Button variant="outlined" onClick={handleCloseModal}>
            Close
          </Button>
        </Stack>
      </StyledBox>
    </Modal>
  );
};

export default AddWorkoutForm;
