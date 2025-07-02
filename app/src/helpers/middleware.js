export const createYearPattern = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const createTimePattern = (time) => {
  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const hasTwoMoreKeys = (obj) => {
  const keys = Object.keys(obj);
  return keys.length > 2;
};

export const getMinutesDifference = (start, end) => {
  const [h1, m1] = start.split(":").map(Number);
  const [h2, m2] = end.split(":").map(Number);

  const totalMinutesStart = h1 * 60 + m1;
  const totalMinutesEnd = h2 * 60 + m2;

  return totalMinutesEnd - totalMinutesStart;
};
