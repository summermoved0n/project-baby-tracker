export const selectDayTasks = (state) => {
  // console.log("here");
  // console.log("Redux state.tasks:", JSON.stringify(state.tasks, null, 2));

  const { dayTasks } = state.tasks;
  return dayTasks;
};
