import { createSlice } from "@reduxjs/toolkit";
import { createTask, getDayTasks, deleteOneTask } from "./tasksOperation";

const initialState = {
  dayTasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(createTask.fulfilled, (state, { payload }) => {
        // console.log(payload);
      })
      .addCase(getDayTasks.fulfilled, (state, { payload }) => {
        // console.log("🎯 Отримано з бекенду:", JSON.stringify(payload, null, 2));
        state.dayTasks = payload;
      }),
  // .addCase(deleteOneTask.fulfilled, (state, { payload, meta }) => {
  //   // const deletedTaskId = meta.arg.taskId;
  //   // state.dayTasks = state.dayTasks.filter(
  //   //   (task) => task.babyService._id !== deletedTaskId
  //   // );
  //   // console.log("🎯 Отримано з бекенду:", JSON.stringify(payload, null, 2));
  // }),
});

export const tasksReducer = tasksSlice.reducer;
