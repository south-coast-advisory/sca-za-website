/**
 * Renders every library document to a branded PDF.
 *
 *   npm run build:docs
 *
 * PDFs are written to  private-documents/  — deliberately OUTSIDE public/, so
 * they cannot be fetched without going through the gated download route. If
 * they lived in public/ the whole lead magnet would be pointless.
 *
 * Run this after editing src/content/documents*.ts, and commit the output.
 */
import { mkdirSync, createWriteStream, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import PDFDocument from "pdfkit";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const outDir = join(root, "private-documents");

// Brand values, resolved from the colour engine's master variables.
// engine: --brand-h 239, --brand-s 71%; primary is the 19% lightness step.
const INK = "#0F1152";
const MID = "#2222B7";
const RED = "#DC071D";
const COPY = "#3A3E4C";
const MUTED = "#6E7382";
const RULE = "#D8DAE6";

const PAGE = { margin: 56, width: 595.28, height: 841.89 }; // A4 points

/** Flow content stops here, leaving clear space above the footer rule. */
const BOTTOM_LIMIT = PAGE.height - 120;

/**
 * Write outside the normal text flow without PDFKit helpfully adding a page.
 * Anything positioned near the foot of a page MUST go through this — crossing
 * the bottom margin during a doc.text() call is what produced blank pages.
 */
function atBottom(doc, draw) {
  const saved = doc.page.margins.bottom;
  doc.page.margins.bottom = 0;
  draw();
  doc.page.margins.bottom = saved;
}

/** Draw the cover page. */
function cover(doc, d, site) {
  doc.rect(0, 0, PAGE.width, 250).fill(INK);

  doc.fillColor("#FFFFFF").font("Helvetica-Bold").fontSize(9);
  doc.text(site.name.toUpperCase(), PAGE.margin, 56, { characterSpacing: 2 });

  doc.fillColor("#FFFFFF").font("Helvetica-Bold").fontSize(26);
  doc.text(d.title, PAGE.margin, 96, { width: PAGE.width - PAGE.margin * 2, lineGap: 2 });

  doc.fillColor("#A9ADE8").font("Helvetica").fontSize(12);
  doc.text(d.subtitle, PAGE.margin, doc.y + 8, { width: PAGE.width - PAGE.margin * 2 });

  doc.rect(PAGE.margin, 250, 64, 5).fill(RED);

  let y = 300;
  doc.fillColor(MUTED).font("Helvetica-Bold").fontSize(8);
  doc.text("WHO THIS IS FOR", PAGE.margin, y, { characterSpacing: 1.5 });
  doc.fillColor(COPY).font("Helvetica").fontSize(11);
  doc.text(d.forWho, PAGE.margin, y + 16, { width: PAGE.width - PAGE.margin * 2 });

  y = doc.y + 26;
  doc.fillColor(MUTED).font("Helvetica-Bold").fontSize(8);
  doc.text("WHAT IS INSIDE", PAGE.margin, y, { characterSpacing: 1.5 });
  y += 18;
  doc.font("Helvetica").fontSize(11).fillColor(COPY);
  for (const item of d.youGet) {
    doc.circle(PAGE.margin + 3, y + 6, 2).fill(RED);
    doc.fillColor(COPY).text(item, PAGE.margin + 16, y, { width: PAGE.width - PAGE.margin * 2 - 16 });
    y = doc.y + 8;
  }

  // Footer block on the cover
  atBottom(doc, () => {
    const fy = PAGE.height - 150;
    doc.moveTo(PAGE.margin, fy).lineTo(PAGE.width - PAGE.margin, fy).strokeColor(RULE).lineWidth(1).stroke();
    doc.fillColor(INK).font("Helvetica-Bold").fontSize(11);
    doc.text(site.legalName, PAGE.margin, fy + 16);
    doc.fillColor(MUTED).font("Helvetica").fontSize(10);
    doc.text(
      `${site.address.street}, ${site.address.locality}, ${site.address.postalCode}`,
      PAGE.margin,
      doc.y + 2,
    );
    doc.text(`${site.phoneDisplay}   ·   ${site.url.replace("https://www.", "")}`, PAGE.margin, doc.y + 2);
    doc.fillColor(MUTED).fontSize(8);
    doc.text(
      `Updated ${d.updated}. General information, not advice for your circumstances.`,
      PAGE.margin,
      doc.y + 10,
      { width: PAGE.width - PAGE.margin * 2 },
    );
  });
}

function ensureSpace(doc, needed) {
  if (doc.y + needed > BOTTOM_LIMIT) doc.addPage();
}

function heading(doc, text) {
  ensureSpace(doc, 70);
  doc.moveDown(0.8);
  const y = doc.y;
  doc.rect(PAGE.margin, y + 4, 3, 16).fill(RED);
  doc.fillColor(INK).font("Helvetica-Bold").fontSize(14);
  doc.text(text, PAGE.margin + 14, y, { width: PAGE.width - PAGE.margin * 2 - 14 });
  doc.moveDown(0.4);
}

function paragraph(doc, text) {
  ensureSpace(doc, 40);
  doc.fillColor(COPY).font("Helvetica").fontSize(10.5);
  doc.text(text, PAGE.margin, doc.y, { width: PAGE.width - PAGE.margin * 2, lineGap: 2.5 });
  doc.moveDown(0.5);
}

function bullets(doc, items, box) {
  doc.font("Helvetica").fontSize(10.5);
  for (const item of items) {
    ensureSpace(doc, 34);
    const y = doc.y;
    if (box) {
      doc.rect(PAGE.margin + 1, y + 2, 8.5, 8.5).lineWidth(0.9).strokeColor(MID).stroke();
    } else {
      doc.circle(PAGE.margin + 4, y + 6, 2).fill(RED);
    }
    doc.fillColor(COPY).font("Helvetica").fontSize(10.5);
    doc.text(item, PAGE.margin + 20, y, { width: PAGE.width - PAGE.margin * 2 - 20, lineGap: 2 });
    doc.moveDown(0.35);
  }
  doc.moveDown(0.3);
}

function note(doc, text) {
  ensureSpace(doc, 60);
  const width = PAGE.width - PAGE.margin * 2;
  const height = doc.heightOfString(text, { width: width - 28, lineGap: 2 }) + 22;
  const y = doc.y;
  doc.rect(PAGE.margin, y, width, height).fill("#F2F3FA");
  doc.rect(PAGE.margin, y, 3, height).fill(RED);
  doc.fillColor(COPY).font("Helvetica-Oblique").fontSize(10);
  doc.text(text, PAGE.margin + 16, y + 11, { width: width - 28, lineGap: 2 });
  doc.y = y + height + 10;
}

function table(doc, head, rows) {
  const width = PAGE.width - PAGE.margin * 2;
  const colWidth = width / head.length;

  const drawHead = () => {
    const y = doc.y;
    doc.rect(PAGE.margin, y, width, 22).fill(INK);
    doc.fillColor("#FFFFFF").font("Helvetica-Bold").fontSize(8.5);
    head.forEach((h, i) => {
      doc.text(h.toUpperCase(), PAGE.margin + 8 + i * colWidth, y + 7, {
        width: colWidth - 16,
        characterSpacing: 0.8,
      });
    });
    doc.y = y + 22;
  };

  ensureSpace(doc, 90);
  drawHead();

  for (const row of rows) {
    doc.font("Helvetica").fontSize(9.5);
    const heights = row.map((cell, i) =>
      doc.heightOfString(cell, { width: colWidth - 16, lineGap: 1.5 }),
    );
    const rowHeight = Math.max(...heights) + 14;

    if (doc.y + rowHeight > BOTTOM_LIMIT) {
      doc.addPage();
      drawHead();
    }

    const y = doc.y;
    row.forEach((cell, i) => {
      doc.fillColor(i === 0 ? INK : COPY).font(i === 0 ? "Helvetica-Bold" : "Helvetica").fontSize(9.5);
      doc.text(cell, PAGE.margin + 8 + i * colWidth, y + 7, { width: colWidth - 16, lineGap: 1.5 });
    });
    doc
      .moveTo(PAGE.margin, y + rowHeight)
      .lineTo(PAGE.width - PAGE.margin, y + rowHeight)
      .strokeColor(RULE)
      .lineWidth(0.7)
      .stroke();
    doc.y = y + rowHeight;
  }
  doc.moveDown(0.8);
}

function footers(doc, site) {
  const range = doc.bufferedPageRange();
  for (let i = 1; i < range.count; i++) {
    doc.switchToPage(range.start + i);
    // Footers sit below the text margin, so they must never trigger a page break.
    atBottom(doc, () => {
      const y = PAGE.height - 58;
      doc.moveTo(PAGE.margin, y).lineTo(PAGE.width - PAGE.margin, y).strokeColor(RULE).lineWidth(0.7).stroke();
      doc.fillColor(MUTED).font("Helvetica").fontSize(8);
      doc.text(
        `${site.legalName}  ·  ${site.phoneDisplay}  ·  ${site.url.replace("https://www.", "")}`,
        PAGE.margin,
        y + 10,
        { width: PAGE.width - PAGE.margin * 2 - 50, lineBreak: false },
      );
      doc.text(`${i + 1}`, PAGE.width - PAGE.margin - 40, y + 10, {
        width: 40,
        align: "right",
        lineBreak: false,
      });
    });
  }
}

export function renderDocument(d, site) {
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  const doc = new PDFDocument({
    size: "A4",
    margins: { top: PAGE.margin, bottom: 90, left: PAGE.margin, right: PAGE.margin },
    bufferPages: true,
    info: {
      Title: d.title,
      Author: site.legalName,
      Subject: d.summary,
      Keywords: `${d.category}, South Africa, SARS, accounting`,
    },
  });

  const path = join(outDir, `${d.slug}.pdf`);
  const stream = createWriteStream(path);
  doc.pipe(stream);

  cover(doc, d, site);
  doc.addPage();

  for (const section of d.sections) {
    heading(doc, section.heading);
    for (const block of section.blocks) {
      if (block.kind === "text") paragraph(doc, block.text);
      else if (block.kind === "bullets") bullets(doc, block.items, false);
      else if (block.kind === "checklist") bullets(doc, block.items, true);
      else if (block.kind === "note") note(doc, block.text);
      else if (block.kind === "table") table(doc, block.head, block.rows);
    }
  }

  // Closing page
  doc.addPage();
  doc.rect(0, 0, PAGE.width, 180).fill(INK);
  doc.fillColor("#FFFFFF").font("Helvetica-Bold").fontSize(20);
  doc.text("Would you rather not do this yourself?", PAGE.margin, 62, {
    width: PAGE.width - PAGE.margin * 2,
  });
  doc.fillColor("#A9ADE8").font("Helvetica").fontSize(11);
  doc.text(
    "We have kept books, filed returns and run payrolls from Amanzimtoti since 1980. Twenty minutes on the phone costs nothing and usually saves something.",
    PAGE.margin,
    doc.y + 8,
    { width: PAGE.width - PAGE.margin * 2, lineGap: 2 },
  );
  doc.fillColor(INK).font("Helvetica-Bold").fontSize(14);
  doc.text(site.phoneDisplay, PAGE.margin, 220);
  doc.fillColor(COPY).font("Helvetica").fontSize(11);
  doc.text(site.url.replace("https://", ""), PAGE.margin, doc.y + 4);
  doc.text(`${site.address.street}, ${site.address.locality}, ${site.address.postalCode}`, PAGE.margin, doc.y + 4);
  atBottom(doc, () => {
    doc.fillColor(MUTED).font("Helvetica").fontSize(8.5);
    doc.text(
      "This document is general information about South African accounting and tax practice. It is not advice for your particular circumstances, and rules change — usually with the annual Budget. Confirm anything you intend to rely on.",
      PAGE.margin,
      PAGE.height - 150,
      { width: PAGE.width - PAGE.margin * 2, lineGap: 2 },
    );
  });

  footers(doc, site);
  const pages = doc.bufferedPageRange().count;
  doc.end();

  return new Promise((resolve) => stream.on("finish", () => resolve({ path, pages })));
}

export { outDir };
