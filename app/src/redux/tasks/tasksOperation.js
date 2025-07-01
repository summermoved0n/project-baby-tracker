import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post("/tasks", formData);

      dispatch(getDayTasks(formData.date));

      return data;
    } catch (error) {
      console.log(error);
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

export const getDayTasks = createAsyncThunk(
  "tasks/getDayTasks",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/tasks?date=${formData}`);
      return data;
    } catch (error) {
      console.log(error);
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      return rejectWithValue(message);
    }
  }
);
