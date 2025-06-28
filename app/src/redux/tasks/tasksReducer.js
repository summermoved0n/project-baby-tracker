import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  task: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  extraReducers: (builder) => builder,
});

export const tasksReducer = tasksSlice.reducer;
