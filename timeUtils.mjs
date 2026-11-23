function addMinutes(date, minutesToAdd) {
  return new Date(date.getTime() + minutesToAdd * 60_000);
}

function addHours(date, hoursToAdd) {
  return new Date(date.getTime() + hoursToAdd * 360_0000);
}

function convertDateToTime(date) {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export { addMinutes, addHours, convertDateToTime };
