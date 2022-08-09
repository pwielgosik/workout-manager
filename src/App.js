import React from "react";
import "./App.css";
import WorkoutList from "./components/WorkoutList";
import Container from "@mui/material/Container";
import Drawer from "./components/Drawer";
import AppBar from "./components/AppBar";
import Preferences from "./components/Preferences";
import { Routes, Route } from "react-router-dom";

function App() {
  const [searchInput, setSearchInput] = React.useState("");

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <Container className="App" maxWidth="false" disableGutters>
      {/* <AppBar
            handleSearchInputChange={handleSearchInputChange}
            searchInputValue={searchInput}
          /> */}
      <Drawer appTitle="Workout Manager">
        <Routes>
          <Route path="/" element={<h2>Welcome to the Workout Manager</h2>} />
          <Route path="exercises" element={<h2>Exercises</h2>} />
          <Route
            path="workouts"
            element={<WorkoutList searchInput={searchInput} />}
          />
          <Route path="preferences" element={<Preferences />} />
          <Route path="logout" element={<h2>You have been logged out</h2>} />
        </Routes>
      </Drawer>
    </Container>
  );
}

export default App;
