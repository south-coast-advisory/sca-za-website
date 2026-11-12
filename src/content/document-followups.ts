/**
 * What the thank-you page offers after each guide. Specific enough that the
 * next step is the conversation, not another brochure.
 */
export const documentFollowups: Record<string, { next: string; bring: string[] }> = {
  "sars-cipc-deadline-calendar": {
    next: "The calendar tells you the dates. It cannot tell you which returns your own business still owes. That is a twenty-minute conversation with Neil.",
    bring: [
      "Your tax reference number",
      "Which returns you filed in the last year",
      "Any SARS or CIPC letter you have not answered",
    ],
  },
  "xero-migration-checklist": {
    next: "Most of the pain in a Xero move is deciding whether to move at all. Bring your latest trial balance and Neil will tell you, plainly, if it is worth it.",
    bring: [
      "Your latest trial balance or management accounts",
      "The system you use now",
      "The date you would like to switch",
    ],
  },
  "month-end-close-checklist": {
    next: "If the close still takes more than a few days, the practice can take the monthly close off your desk. One set of numbers is enough for Neil to see where the time is going.",
    bring: [
      "Last month's bank statements",
      "Your debtors and creditors lists",
      "What you already do at month end",
    ],
  },
  "payroll-compliance-pack": {
    next: "EMP201, EMP501 and UIF are where the penalties start. If any of those are behind, phone the office and ask for Neil before the next deadline.",
    bring: [
      "How many people you pay",
      "Whether EMP201 is up to date",
      "Any penalty notice from SARS",
    ],
  },
  "vat-registration-decision-guide": {
    next: "The registration decision is one conversation, not a weekend of reading. Neil will tell you whether you must register, and whether you should if you do not have to.",
    bring: [
      "Turnover for the last twelve months",
      "Whether your customers are businesses or the public",
      "Any VAT201 you have already filed",
    ],
  },
  "record-keeping-guide": {
    next: "If SARS has already asked for documents, do not wait out the deadline. Phone the office and the team will tell you what to send, and what to leave out.",
    bring: [
      "The SARS letter, if you have one",
      "Where your records currently live",
      "How far back your invoices go",
    ],
  },
  "bbbee-requirements-guide": {
    next: "Most smaller businesses only need an affidavit, not a full scorecard. Neil can tell you which side of that line you are on.",
    bring: [
      "Last year's turnover",
      "Whether a customer has asked for a certificate",
      "Your current affidavit, if you have one",
    ],
  },
};
