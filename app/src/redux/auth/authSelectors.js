export const selectAuthUser = (state) => {
  const { user } = state.auth;
  return user;
};

export const selectAuthLoggedIn = (state) => {
  const { isLoggedIn } = state.auth;
  return isLoggedIn;
};

export const selectAuthLoading = (state) => {
  const { isLoading } = state.auth;
  return isLoading;
};

export const selectAuthError = (state) => {
  const { error } = state.auth;
  return error;
};
