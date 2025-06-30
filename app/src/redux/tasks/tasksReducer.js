import { createSlice } from "@reduxjs/toolkit";
import { createTask, getDayTasks } from "./tasksOperation";

const initialState = {
  task: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(createTask.fulfilled, (state, { payload }) => {
        console.log(payload);
      })
      .addCase(getDayTasks.fulfilled, (state, { payload }) => {
        console.log(payload);
      }),
});

export const tasksReducer = tasksSlice.reducer;
