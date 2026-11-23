import fs from "node:fs";
import { spawn } from "node:child_process";
import { addHours, addMinutes, convertDateToTime } from "./timeUtils.mjs";
import {
  parseTimeEntry,
  parseHourEstimate,
  parseMinuteEstimate,
} from "./parser.mjs";

const userInput = fs.readFileSync(0, "utf8").split("\n");
const timeEntryDictionary = {};
for (const line of userInput) {
  const hoursMatch = parseTimeEntry(line);
  if (hoursMatch) {
    timeEntryDictionary[hoursMatch[1].trim()] = hoursMatch[2].trim();
  } else {
    if (line.trim() !== "") {
      console.log(`${line.trim()} does not have a time entry`);
    }
  }
}

const finalResults = [];
let calculatedDate = new Date();
calculatedDate.setHours(14, 30, 0, 0);

let resultTemplate = "<ul>";

for (const [description, timeEstimate] of Object.entries(timeEntryDictionary)) {
  const hourEstimateMatch = parseHourEstimate(timeEstimate);
  const minuteEstimateMatch = parseMinuteEstimate(timeEstimate);

  if (hourEstimateMatch) {
    resultTemplate += "<li>";
    resultTemplate += `${description} - <h1>${timeEstimate}</h1>`;
    resultTemplate += "</li>";
    resultTemplate += "<ul>";
    resultTemplate += "<li>";
    resultTemplate += `(${convertDateToTime(calculatedDate)} - ${convertDateToTime(addHours(calculatedDate, hourEstimateMatch[1]))})`;
    resultTemplate += "</li>";
    resultTemplate += "</ul>";
    calculatedDate = addHours(calculatedDate, hourEstimateMatch[1]);
  }
  if (minuteEstimateMatch) {
    resultTemplate += "<li>";
    resultTemplate += `${description} - <h1>${timeEstimate}</h1>`;
    resultTemplate += "</li>";
    resultTemplate += "<ul>";
    resultTemplate += "<li>";
    resultTemplate += `(${convertDateToTime(calculatedDate)} - ${convertDateToTime(addMinutes(calculatedDate, minuteEstimateMatch[1]))})`;
    resultTemplate += "</li>";
    resultTemplate += "</ul>";
    calculatedDate = addMinutes(calculatedDate, minuteEstimateMatch[1]);
  }
}

resultTemplate += "</ul>";

const toRtf = spawn("textutil", [
  "-stdin",
  "-format",
  "html",
  "-convert",
  "rtf",
  "-stdout",
]);

const pbcopy = spawn("pbcopy");
toRtf.stdout.pipe(pbcopy.stdin);
toRtf.stdin.end(resultTemplate);
