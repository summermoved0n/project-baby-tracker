import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { register, logIn } from "./authOperation.js";

const initialState = {
  user: { username: null, email: null },
  token: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      // .addCase(logOut.fulfilled, (state, _) => {
      //   state.user = { name: null, email: null };
      //   state.token = null;
      //   state.isLoggedIn = false;
      //   state.isLoading = false;
      // })
      // .addCase(currentUser.fulfilled, (state, action) => {
      //   state.user = action.payload;
      //   state.isLoggedIn = true;
      //   state.isLoading = false;
      // })
      .addMatcher(
        isAnyOf(
          register.pending,
          logIn.pending
          // logOut.pending,
          // currentUser.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          register.rejected,
          logIn.rejected
          // logOut.rejected,
          // currentUser.rejected
        ),
        (state, { payload }) => {
          console.log(payload);
          state.isLoading = false;
          state.error = payload;
        }
      ),
});

export const authReducer = authSlice.reducer;
