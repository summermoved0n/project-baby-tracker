export const selectDayTasks = (state) => {
  const { dayTasks } = state.tasks;
  return dayTasks;
};

export const selectOpenModal = (state) => {
  const { isModal } = state.tasks;
  return isModal;
};
