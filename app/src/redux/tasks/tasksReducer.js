import { createSlice } from "@reduxjs/toolkit";
import { createTask, getDayTasks, deleteOneTask } from "./tasksOperation";

const initialState = {
  dayTasks: [],
  isModal: false,
  modalType: null,
  deleteData: null,
  editData: null,
  task: {
    hours: null,
    minutes: null,
  },
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
    setModalType(state, { payload }) {
      state.modalType = payload;
    },
    setDeleteData(state, { payload }) {
      state.deleteData = payload;
    },
    setEditData(state, { payload }) {
      state.editData = payload;
    },
    setTaskHours(state, { payload }) {
      state.task.hours = payload;
    },
    setTaskMinutes(state, { payload }) {
      state.task.minutes = payload;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(getDayTasks.fulfilled, (state, { payload }) => {
      // console.log("🎯 Отримано з бекенду:", JSON.stringify(payload, null, 2));
      state.dayTasks = payload;
    }),
});

export const {
  openModal,
  closeModal,
  setModalType,
  setDeleteData,
  setEditData,
  setTaskHours,
  setTaskMinutes,
} = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
