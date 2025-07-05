import { createSlice } from "@reduxjs/toolkit";
import { createTask, getDayTasks, deleteOneTask } from "./tasksOperation";

const initialState = {
  dayTasks: [],
  isModal: false,
  modalType: null,
  deleteData: null,
  editData: null,
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

export const {
  openModal,
  closeModal,
  setModalType,
  setDeleteData,
  setEditData,
} = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
