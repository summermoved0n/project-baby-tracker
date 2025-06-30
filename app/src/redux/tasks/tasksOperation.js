import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/tasks", formData);
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      return rejectWithValue(message);
    }
  }
);
