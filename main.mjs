import fs from "node:fs";
import { spawn } from "node:child_process";
import { generateTimeEntries } from "./scheduler.mjs";
import { generateHtml } from "./formatter.mjs";

const userInput = fs.readFileSync(0, "utf8").split("\n");
const timeEntries = generateTimeEntries(userInput);
const generatedHtml = generateHtml(timeEntries);

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
toRtf.stdin.end(generatedHtml);
