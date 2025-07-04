import { createSlice } from "@reduxjs/toolkit";
import { createTask, getDayTasks, deleteOneTask } from "./tasksOperation";

const initialState = {
  dayTasks: [],
  isModal: false,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    openModal(state, { payload }) {
      state.isModal = true;
    },
    closeModal(state, { payload }) {
      state.isModal = false;
    },
  },
  extraReducers: (builder) =>
    builder
      // .addCase(createTask.fulfilled, (state, { payload }) => {
      //   // console.log(payload);
      // })
      .addCase(getDayTasks.fulfilled, (state, { payload }) => {
        // console.log("🎯 Отримано з бекенду:", JSON.stringify(payload, null, 2));
        state.dayTasks = payload;
      }),
});

export const { openModal, closeModal } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
