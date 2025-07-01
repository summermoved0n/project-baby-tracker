import { createSlice } from "@reduxjs/toolkit";
import { createTask, getDayTasks } from "./tasksOperation";

const initialState = {
  dayTasks: [],
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
        console.log("🎯 Отримано з бекенду:", JSON.stringify(payload, null, 2));
        state.dayTasks = payload;
      }),
});

export const tasksReducer = tasksSlice.reducer;
