import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

axios.defaults.baseURL = "https://project-backend-d58n.onrender.com/api";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

export const register = createAsyncThunk(
  "auth/register",
  async (registerData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/auth/signup", registerData);
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

export const logIn = createAsyncThunk(
  "auth/login",
  async (registerData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/auth/signin", registerData);
      token.set(data.token);
      await AsyncStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async () => {
  try {
    const { data } = await axios.post("/auth/signout");
    token.unset();
    await AsyncStorage.removeItem("token");
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const currentUser = createAsyncThunk(
  "auth/current",
  async (_, { rejectWithValue }) => {
    try {
      // console.log("header", axios.defaults.headers.common.Authorization);
      const storageToken = await AsyncStorage.getItem("token");
      // console.log("storage token", storageToken);
      if (!storageToken) return rejectWithValue();

      token.set(storageToken);
      const { data } = await axios.get("/auth/current");
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data || "Помилка");
    }
  }
);
