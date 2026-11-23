// Parse a user input line containing a task description and time estimate
function parseTimeEntry(line) {
  return line.match(
    /^(.*)-(\s*\d+(?:\.?\d+?)?\s+(minutes?|mins?|hours?|hrs?)\s*)/i,
  );
}

// Extract an hour-based estimate
function parseHourEstimate(timeEstimate) {
  return timeEstimate.match(/\s*(\d+(?:\.?\d*)?)\s*(?:hours?|hrs?)/i);
}

// Extract an minute-based estimate
function parseMinuteEstimate(timeEstimate) {
  return timeEstimate.match(/\s*(\d+(?:\.?\d*)?)\s*(?:minutes?|mins?)/i);
}

// Key: Description of task
// Value: <Number> <Time Increment i.e mins, hours, etc.>
function parseUserInput(userInput) {
  const timeEntries = [];
  for (const line of userInput) {
    const timeEntry = {};
    const parsingSucceeds = parseTimeEntry(line);
    if (parsingSucceeds) {
      timeEntry.description = parsingSucceeds[1].trim();
      timeEntry.timeEstimate = parsingSucceeds[2].trim();
      timeEntries.push(timeEntry);
    }
  }
  return timeEntries;
}

export {
  parseTimeEntry,
  parseHourEstimate,
  parseMinuteEstimate,
  parseUserInput,
};
