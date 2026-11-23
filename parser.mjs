// Parse a user input line containing a task description and time estimate
function parseTimeEntry(line) {
  return line.match(
    /^(.*)-(\s+\d+(?:\.?\d+?)?\s+(mins?|minutes?|hours?|hrs?)\s*)/i,
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

export { parseTimeEntry, parseHourEstimate, parseMinuteEstimate };
