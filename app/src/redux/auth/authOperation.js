import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import toast from 'react-hot-toast';

// axios.defaults.baseURL = "http://localhost:3031/api";
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
      // дістаємо повідомлення з error.response.data.message або даємо дефолт
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
      return data;
    } catch (error) {
      // console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// export const logOut = createAsyncThunk('auth/logout', async () => {
//   try {
//     const { data } = await axios.post('/users/logout');
//     token.unset();
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// });

// export const currentUser = createAsyncThunk(
//   'auth/refresh',
//   async (_, { getState, rejectWithValue }) => {
//     const state = getState();
//     const storageToken = state.auth.token;

//     if (storageToken === null) {
//       return rejectWithValue();
//     }

//     token.set(storageToken);
//     try {
//       const { data } = await axios.get('/users/current');
//       return data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );
