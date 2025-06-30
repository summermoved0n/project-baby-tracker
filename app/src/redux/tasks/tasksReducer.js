import { createSlice } from "@reduxjs/toolkit";
import { createTask } from "./tasksOperation";

const initialState = {
  task: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  extraReducers: (builder) =>
    builder.addCase(createTask.fulfilled, (state, { payload }) => {
      console.log(payload);
    }),
  // .addCase(getAllTasks.fulfilled, (state, { payload }) => {
  //   console.log(payload);
  // }),
});

export const tasksReducer = tasksSlice.reducer;
