import { escapeHtml } from "./htmlUtils.mjs";
function generateHtml(timeEntries) {
  let resultTemplate = "<ul>";
  for (const timeEntry of timeEntries) {
    resultTemplate += "<li>";
    resultTemplate += `${escapeHtml(timeEntry.description)} - <h1>${escapeHtml(timeEntry.timeEstimate)}</h1>`;
    resultTemplate += "</li>";
    resultTemplate += "<ul>";
    resultTemplate += "<li>";
    resultTemplate += `(${escapeHtml(timeEntry.fromTime)} - ${escapeHtml(timeEntry.toTime)})`;
    resultTemplate += "</li>";
    resultTemplate += "</ul>";
  }
  resultTemplate += "</ul>";
  return resultTemplate;
}
export { generateHtml };
