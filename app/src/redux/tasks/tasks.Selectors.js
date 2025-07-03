export const selectDayTasks = (state) => {
  const { dayTasks } = state.tasks;
  return dayTasks;
};
