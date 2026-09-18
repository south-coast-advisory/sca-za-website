/** Structured document content, rendered both as a web page and as a PDF. */

export type DocBlock =
  | { kind: "text"; text: string }
  | { kind: "bullets"; items: string[] }
  | { kind: "checklist"; items: string[] }
  | { kind: "table"; head: string[]; rows: string[][] }
  | { kind: "note"; text: string };

export type DocSection = {
  heading: string;
  blocks: DocBlock[];
};

export type LibraryDoc = {
  slug: string;
  title: string;
  /** Shown under the title on the card and the landing page. */
  subtitle: string;
  category: "Starting out" | "Tax and SARS" | "Payroll" | "Xero" | "Running the books";
  /** Who it is genuinely for. Used to set expectations before the form. */
  forWho: string;
  /** Shown on the page as the quotable answer block. May run long. */
  summary: string;
  /** Search-result description, kept under 160 characters. */
  metaDescription: string;
  /** What the reader walks away with — shown as a list before the gate. */
  youGet: string[];
  updated: string;
  pages: number;
  sections: DocSection[];
};
