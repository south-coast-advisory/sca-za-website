import { services } from "@/content/services";

/**
 * The review engine's content: what a client can review, the guided questions
 * and the video prompts. Ported from the Lava-SA engine, rewritten for an
 * accounting practice. Guided questions exist because "Great service!" helps
 * nobody; a client describing the SARS mess before and the calm after is what
 * persuades the next business owner — and what Google and AI search can quote.
 */

export const GENERAL_SUBJECT = "The practice overall";

export const reviewSubjects: { label: string; slug: string | null }[] = [
  { label: GENERAL_SUBJECT, slug: null },
  { label: "Moving to Xero / Xero support", slug: "xero" },
  ...services.map((s) => ({ label: s.nav, slug: s.slug })),
];

export const subjectSlug = (label: string) =>
  reviewSubjects.find((s) => s.label === label)?.slug ?? null;

export type ReviewQuestion = {
  id: string;
  label: string;
  placeholder: string;
  hint?: string;
  minLength: number;
  rows: number;
};

export const reviewQuestions: ReviewQuestion[] = [
  {
    id: "relationship",
    label: "How long have you worked with us, and what do we do for you?",
    placeholder: "e.g. Since 2014 — monthly bookkeeping, VAT and the annual financials for our two shops.",
    minLength: 15,
    rows: 2,
  },
  {
    id: "before",
    label: "What was the situation before you came to South Coast Advisory?",
    placeholder:
      "Behind on returns? A SARS letter? A shoebox of slips? Another accountant who never phoned back?",
    hint: "The problem is what the next reader recognises in themselves.",
    minLength: 30,
    rows: 3,
  },
  {
    id: "after",
    label: "What is different now — for you and for the business?",
    placeholder: "Time saved, penalties avoided, numbers you finally trust, sleep regained…",
    minLength: 30,
    rows: 3,
  },
  {
    id: "team",
    label: "How do Neil and the team handle your questions and deadlines?",
    placeholder: "How quickly they answer, how they explain things, what happened when something went wrong…",
    minLength: 20,
    rows: 3,
  },
];

export const videoPrompts = [
  "Your name, your business and where you are on the South Coast",
  "What was going wrong before you came to us",
  "What we did, and what is different now",
  "Who you would recommend us to",
];

export const MAX_VIDEO_SECONDS = 90;

export const emptyAnswers = () =>
  Object.fromEntries(reviewQuestions.map((q) => [q.id, ""])) as Record<string, string>;

/** Question-and-answer pairs, kept structured for later display and search. */
export const buildAnswers = (answers: Record<string, string>) =>
  reviewQuestions
    .map((q) => ({ question: q.label, answer: (answers[q.id] ?? "").trim() }))
    .filter((a) => a.answer);

/** The same answers as one readable block — what lands in `quote` and the email. */
export const compileReview = (answers: Record<string, string>) =>
  buildAnswers(answers)
    .map((a) => `${a.question}\n${a.answer}`)
    .join("\n\n");
