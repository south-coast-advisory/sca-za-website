/**
 * Entry point for the PDF build.
 *
 *   npm run build:docs
 *
 * Imports the same content files the website renders, so a document and its
 * web page can never disagree.
 */
import { libraryDocuments } from "../src/content/documents";
import { site } from "../src/lib/site";
// Plain JS renderer — pdfkit drawing only, no types needed.
import { renderDocument, outDir } from "./build-documents.mjs";

async function main() {
  console.log(`Rendering ${libraryDocuments.length} documents to ${outDir}\n`);
  for (const doc of libraryDocuments) {
    const { path, pages } = await renderDocument(doc, site);
    console.log(`  ✓ ${doc.title} — ${pages} pages\n    ${path}`);
  }
  console.log("\nDone. These live outside public/ on purpose — they are served");
  console.log("only through /api/documents/[slug]/download after the form is completed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
