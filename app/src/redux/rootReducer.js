import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  avatar: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserName(state, action) {
      state.name = action.payload;
    },
    setUserEmail(state, action) {
      state.email = action.payload;
    },
    setUserAvatar(state, action) {
      state.avatar = action.payload;
    },
  },
});

export const { setUserName, setUserEmail, setUserAvatar } = usersSlice.actions;
export const rootReducer = usersSlice.reducer;
