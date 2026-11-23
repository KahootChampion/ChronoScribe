import { parseUserInput } from "./parser.mjs";
import { parseHourEstimate, parseMinuteEstimate } from "./parser.mjs";
import { addMinutes, addHours, convertDateToTime } from "./timeUtils.mjs";

// List of {description, timeEstimate, fromTime, toTime }
function generateTimeEntries(userInput) {
  const timeEntries = [];
  let calculatedDate = new Date();
  calculatedDate.setHours(14, 30, 0, 0);

  for (const { description, timeEstimate } of parseUserInput(userInput)) {
    const timeEntry = {};
    const hourEstimateMatch = parseHourEstimate(timeEstimate);
    const minuteEstimateMatch = parseMinuteEstimate(timeEstimate);

    if (!hourEstimateMatch && !minuteEstimateMatch) {
      throw new Error(`Invalid time estimate: ${timeEstimate}`);
    }

    timeEntry.fromTime = convertDateToTime(calculatedDate);
    timeEntry.timeEstimate = timeEstimate;
    timeEntry.description = description;

    if (hourEstimateMatch) {
      calculatedDate = addHours(calculatedDate, hourEstimateMatch[1]);
    }

    if (minuteEstimateMatch) {
      calculatedDate = addMinutes(calculatedDate, minuteEstimateMatch[1]);
    }

    timeEntry.toTime = convertDateToTime(calculatedDate);

    timeEntries.push(timeEntry);
  }
  return timeEntries;
}

export { generateTimeEntries };
