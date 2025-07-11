import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getDayTasks,
  createTask,
  deleteOneTask,
  updateOneTask,
} from "./tasksOperation";

const initialState = {
  dayTasks: [],
  isModal: false,
  modalType: null,
  deleteData: null,
  editData: null,
  isLoading: false,
  error: null,
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
      .addCase(getDayTasks.fulfilled, (state, { payload }) => {
        // console.log("🎯 Отримано з бекенду:", JSON.stringify(payload, null, 2));
        state.dayTasks = payload;
        state.isLoading = false;
      })
      .addCase(createTask.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(deleteOneTask.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(updateOneTask.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(
          getDayTasks.pending,
          createTask.pending,
          deleteOneTask.pending,
          updateOneTask.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          getDayTasks.rejected,
          createTask.rejected,
          deleteOneTask.rejected,
          updateOneTask.rejected
        ),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      ),
});

export const {
  openModal,
  closeModal,
  setModalType,
  setDeleteData,
  setEditData,
} = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
