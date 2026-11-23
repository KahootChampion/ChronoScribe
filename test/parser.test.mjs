import { describe, test, expect } from "@jest/globals";
import {
  parseHourEstimate,
  parseMinuteEstimate,
  parseTimeEntry,
  parseUserInput,
} from "../parser.mjs";

describe("parseTimeEntry Tests", () => {
  test("Should parse a correct time entry without trimming white space", () => {
    const timeEntry = "Refactor code for ChronoScribe - 2 hours";
    const parseResults = parseTimeEntry(timeEntry);
    expect(parseResults[1]).toBe("Refactor code for ChronoScribe ");
    expect(parseResults[2]).toBe(" 2 hours");
  });
  test("Should take the last time value when multiple are provided", () => {
    const timeEntry =
      "Refactor code for ChronoScribe - 1 hours - 3 hours - 2 hours";
    const parseResults = parseTimeEntry(timeEntry);
    expect(parseResults[1]).toBe(
      "Refactor code for ChronoScribe - 1 hours - 3 hours ",
    );
    expect(parseResults[2]).toBe(" 2 hours");
  });
  test("Should parse a correct time entry when no space between the dash and number is provided", () => {
    const timeEntry = "Refactor code for ChronoScribe -2 hours";
    const parseResults = parseTimeEntry(timeEntry);
    expect(parseResults[1]).toBe("Refactor code for ChronoScribe ");
    expect(parseResults[2]).toBe("2 hours");
  });

  test("Should parse a correct time entry for minutes without changing the name to mins or min", () => {
    const timeEntry = "Refactor code for ChronoScribe -2 minutes";
    const parseResults = parseTimeEntry(timeEntry);
    expect(parseResults[1]).toBe("Refactor code for ChronoScribe ");
    expect(parseResults[2]).toBe("2 minutes");
  });
  test("Should fail to parse time entry without a time estimate provided", () => {
    const timeEntry = "Refactor code for ChronoScribe";
    const parseResults = parseTimeEntry(timeEntry);
    expect(parseResults).toBeFalsy();
  });

  test("Should fail to parse a time entry where it is not minutes or hours", () => {
    const timeEntry = "Refactor code for ChronoScribe - 2 seconds";
    const parseResults = parseTimeEntry(timeEntry);
    expect(parseResults).toBeFalsy();
  });
});

describe("parseHourEstimate Tests", () => {
  test("Should parse a correct time entry for hours", () => {
    const timeEntry = "Refactor code for ChronoScribe - 3 hours";
    const parseResults = parseHourEstimate(timeEntry);
    expect(parseResults[1]).toBe("3");
  });

  test("Should not parse an incorrect time entry for minutes", () => {
    const timeEntry = "Refactor code for ChronoScribe - 3 minutes";
    const parseResults = parseHourEstimate(timeEntry);
    expect(parseResults).toBeFalsy();
  });

  test("Should not parse an incorrect time entry for seconds", () => {
    const timeEntry = "Refactor code for ChronoScribe - 3 seconds";
    const parseResults = parseHourEstimate(timeEntry);
    expect(parseResults).toBeFalsy();
  });
});

describe("parseMinuteEstimate Tests", () => {
  test("Should parse a correct time entry without trimming white space", () => {
    const timeEntry = "Refactor code for ChronoScribe - 2 minutes";
    const parseResults = parseMinuteEstimate(timeEntry);
    expect(parseResults[1]).toBe("2");
  });
  test("Should not parse an incorrect time entry for hours", () => {
    const timeEntry = "Refactor code for ChronoScribe - 3 hours";
    const parseResults = parseMinuteEstimate(timeEntry);
    expect(parseResults).toBeFalsy();
  });

  test("Should not parse an incorrect time entry for seconds", () => {
    const timeEntry = "Refactor code for ChronoScribe - 3 seconds";
    const parseResults = parseMinuteEstimate(timeEntry);
    expect(parseResults).toBeFalsy();
  });
});

describe("parseUserInput Tests", () => {
  test("Should parse multiple valid time entries", () => {
    const userInput = ["Refactor code - 2 hours", "Write tests - 30 minutes"];

    const result = parseUserInput(userInput);

    expect(result).toEqual([
      { description: "Refactor code", timeEstimate: "2 hours" },
      { description: "Write tests", timeEstimate: "30 minutes" },
    ]);
  });

  test("Should trim whitespace from descriptions and time estimates", () => {
    const userInput = ["  Refactor code  -  2 hours  "];

    const result = parseUserInput(userInput);

    expect(result).toEqual([
      { description: "Refactor code", timeEstimate: "2 hours" },
    ]);
  });

  test("Should ignore invalid time entries", () => {
    const userInput = [
      "Refactor code - 2 hours",
      "Write tests",
      "Review code - 30 seconds",
    ];

    const result = parseUserInput(userInput);

    expect(result).toEqual([
      { description: "Refactor code", timeEstimate: "2 hours" },
    ]);
  });
});
