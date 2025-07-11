export const selectDayTasks = (state) => {
  const { dayTasks } = state.tasks;
  return dayTasks;
};

export const selectOpenModal = (state) => {
  const { isModal } = state.tasks;
  return isModal;
};

export const selectModalType = (state) => {
  const { modalType } = state.tasks;
  return modalType;
};

export const selectDeleteData = (state) => {
  const { deleteData } = state.tasks;
  return deleteData;
};

export const selectEditData = (state) => {
  const { editData } = state.tasks;
  return editData;
};