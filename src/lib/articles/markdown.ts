const HEADING_REGEX = /^(#{1,6})\s+(.*)$/;
const LIST_ITEM_REGEX = /^-\s+(.*)$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderHeading(match: RegExpMatchArray): string {
  const level = match[1].length;
  const text = escapeHtml(match[2].trim());
  const headingLevel = Math.min(level, 6);
  return `<h${headingLevel}>${text}</h${headingLevel}>`;
}

export function markdownToHtml(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html: string[] = [];
  let inList = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
      continue;
    }

    const headingMatch = line.match(HEADING_REGEX);
    if (headingMatch) {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
      html.push(renderHeading(headingMatch));
      continue;
    }

    const listMatch = line.match(LIST_ITEM_REGEX);
    if (listMatch) {
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${escapeHtml(listMatch[1].trim())}</li>`);
      continue;
    }

    if (inList) {
      html.push("</ul>");
      inList = false;
    }

    html.push(`<p>${escapeHtml(line)}</p>`);
  }

  if (inList) {
    html.push("</ul>");
  }

  return html.join("\n");
}
