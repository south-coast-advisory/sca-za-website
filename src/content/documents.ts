import type { LibraryDoc } from "./documents-types";
import { documentsTwo } from "./documents-2";
import { documentsThree } from "./documents-3";

export type { LibraryDoc, DocSection, DocBlock } from "./documents-types";

const UPDATED = "September 2026";

/**
 * The resource library.
 *
 * Every document is written for South African rules and tied to a service SCA
 * actually sells. Deliberately NO volatile figures (rates, thresholds, filing
 * season dates) — those go stale and a wrong number on an accountant's
 * document is worse than no document. Structure and process do not go stale.
 */
const documentsOne: LibraryDoc[] = [
  {
    slug: "sars-cipc-deadline-calendar",
    metaDescription:
      "Every recurring SARS and CIPC deadline for South African businesses: EMP201, VAT201, EMP501, provisional tax, ITR14 and annual returns. Free PDF.",
    title: "The SARS & CIPC Deadline Calendar",
    subtitle: "Every recurring submission a South African business owes, and when",
    category: "Tax and SARS",
    forWho: "Any business owner who has ever been surprised by a SARS penalty.",
    summary:
      "The returns that repeat every year — EMP201, VAT201, EMP501, provisional tax, ITR14, CIPC annual returns and COIDA — with how each due date is actually calculated and what happens when one is missed.",
    youGet: [
      "A one-page table of every recurring deadline",
      "How each date is calculated from your own year end",
      "What a missed deadline costs, and the order to fix things in",
      "A month-by-month planner to put on the wall",
    ],
    updated: UPDATED,
    pages: 5,
    sections: [
      {
        heading: "How to use this calendar",
        blocks: [
          {
            kind: "text",
            text: "Most penalties are not caused by an unwillingness to pay. They are caused by a date nobody was watching. This calendar lists the submissions that repeat every year, and explains how each due date is worked out, so you can put them in your own diary rather than relying on a reminder that may never come.",
          },
          {
            kind: "note",
            text: "Annual filing season dates for individuals and provisional taxpayers are announced by SARS each year and change. They are deliberately not printed here. Confirm the current season dates with us or on sars.gov.za.",
          },
        ],
      },
      {
        heading: "The recurring deadlines",
        blocks: [
          {
            kind: "table",
            head: ["Submission", "When it is due", "Applies to"],
            rows: [
              ["EMP201", "By the 7th of the month after the payroll month, or the last business day before it", "Every employer"],
              ["VAT201", "By the 25th of the month after the tax period, or the last business day of that month when filing on eFiling", "VAT vendors"],
              ["EMP501 (interim)", "After the August payroll, in the window SARS announces", "Every employer"],
              ["EMP501 (annual)", "After the February payroll, in the window SARS announces", "Every employer"],
              ["IRP6 first period", "Within six months of the start of the year of assessment (31 August for a February year end)", "Provisional taxpayers"],
              ["IRP6 second period", "By the last day of the year of assessment", "Provisional taxpayers"],
              ["IRP6 third (voluntary)", "Usually six months after year end (30 September for a February year end)", "Provisional taxpayers"],
              ["ITR14", "Within twelve months of the company's financial year end", "Every company"],
              ["CIPC annual return", "Within 30 business days of the registration anniversary", "Companies and CCs"],
              ["Beneficial ownership", "With the annual return", "Companies"],
              ["COIDA return of earnings", "Annually, in the window the Compensation Fund announces", "Every employer"],
            ],
          },
        ],
      },
      {
        heading: "Working out your own dates",
        blocks: [
          {
            kind: "text",
            text: "Three things determine your calendar: your financial year end, your VAT category, and your payroll cycle. Write them down once and the rest follows.",
          },
          {
            kind: "checklist",
            items: [
              "My financial year end is: ______________",
              "My VAT category (A, B, C, D or E) is: ______________",
              "My VAT periods end in the months: ______________",
              "My company registration anniversary is: ______________",
              "My payroll is processed on the ______ of each month",
            ],
          },
          {
            kind: "text",
            text: "Your VAT category is allocated by SARS and appears on your VAT registration. It is not a matter of preference, and it determines which two-month cycle you fall into.",
          },
        ],
      },
      {
        heading: "What a missed deadline actually costs",
        blocks: [
          {
            kind: "bullets",
            items: [
              "Administrative penalties for outstanding returns recur every month until the return is filed. Filing stops the clock, which is why filing always comes before negotiating.",
              "Interest on unpaid tax runs separately from penalties and is far harder to have reversed.",
              "SARS can appoint a third party — your bank or your customer — to pay a tax debt out of your money, without negotiating with you first.",
              "A company that does not file its CIPC annual return is placed in deregistration, which can freeze bank accounts and make contracts unenforceable.",
              "A late EMP501 delays every employee's IRP5, which delays their own tax returns.",
            ],
          },
        ],
      },
      {
        heading: "If you are already behind",
        blocks: [
          {
            kind: "text",
            text: "Being years behind is more common than you would think, and it is fixable. The order matters.",
          },
          {
            kind: "checklist",
            items: [
              "List every registration you hold: income tax, VAT, PAYE, UIF, SDL, COIDA, CIPC",
              "Pull a statement of account for each tax type from eFiling",
              "Identify every outstanding return, oldest first",
              "File the outstanding returns — this stops new penalties accruing",
              "Only then request remission of penalties, with your reasons in writing",
              "Agree a payment arrangement for what is genuinely owed",
              "Put the recurring dates in a diary so it does not happen again",
            ],
          },
          {
            kind: "note",
            text: "Requesting remission before the returns are filed almost always fails. Get current first.",
          },
        ],
      },
      {
        heading: "Month-by-month planner",
        blocks: [
          {
            kind: "text",
            text: "Print this page. For a February year end, a typical year looks like the following. Adjust the provisional tax and annual return months to your own dates.",
          },
          {
            kind: "table",
            head: ["Month", "What falls due"],
            rows: [
              ["Every month", "EMP201 by the 7th"],
              ["Every second month", "VAT201 (depending on your category)"],
              ["August", "First provisional tax payment (February year end)"],
              ["September / October", "Interim EMP501 reconciliation window"],
              ["September", "Third (voluntary) provisional payment for the prior year"],
              ["February", "Second provisional tax payment; financial year end"],
              ["April / May", "Annual EMP501 reconciliation window; IRP5 certificates issued"],
              ["Your anniversary month", "CIPC annual return and beneficial ownership filing"],
              ["Fund's announced window", "COIDA return of earnings"],
            ],
          },
        ],
      },
    ],
  },

  {
    slug: "xero-migration-checklist",
    metaDescription:
      "A practical checklist for moving to Xero in South Africa: conversion dates, data to prepare, bank feeds, payroll, and the mistakes to avoid.",
    title: "Moving to Xero: The Migration Checklist",
    subtitle: "What to prepare, what to expect, and what usually goes wrong",
    category: "Xero",
    forWho:
      "Owners on Pastel, Sage, QuickBooks or spreadsheets who are considering the move to Xero.",
    summary:
      "A practical checklist for migrating to Xero in South Africa: choosing a conversion date, what data to bring across, connecting SA bank feeds, integrating payroll, and the mistakes that cost the most time.",
    youGet: [
      "A decision test for whether you should move at all",
      "The full pre-migration data checklist",
      "A realistic timeline, and what actually causes delays",
      "The five mistakes we see most often",
    ],
    updated: UPDATED,
    pages: 5,
    sections: [
      {
        heading: "First, should you move at all?",
        blocks: [
          {
            kind: "text",
            text: "Switching accounting systems is disruptive, and it is not always the right call. Be honest with these before going further.",
          },
          {
            kind: "checklist",
            items: [
              "Do you wait weeks to find out how the business performed?",
              "Is someone still capturing bank statements by hand?",
              "Do you and your accountant work from different copies of the data?",
              "Do you need to see the books from somewhere other than one office computer?",
              "Are you paying for a server or backups purely to run accounting software?",
            ],
          },
          {
            kind: "text",
            text: "Three or more yeses and Xero will likely pay for itself in time saved alone. If you run complex manufacturing, deep job costing or heavily customised reports, get advice before committing — sometimes the honest answer is to stay where you are.",
          },
        ],
      },
      {
        heading: "Choose the conversion date",
        blocks: [
          {
            kind: "bullets",
            items: [
              "The cleanest date is the first day of a new financial year. Everything before it stays in the old system, everything after starts fresh.",
              "The second cleanest is the first day of a new VAT period, so no VAT return is split across two systems.",
              "Never convert mid-VAT-period unless you enjoy reconciling two sets of figures for one return.",
              "Keep the old system accessible, read-only, for at least five years. SARS can ask for the underlying records.",
            ],
          },
        ],
      },
      {
        heading: "What to prepare before the switch",
        blocks: [
          {
            kind: "checklist",
            items: [
              "Signed or final annual financial statements for the last completed year",
              "A trial balance as at the conversion date",
              "Age analysis of debtors at the conversion date",
              "Age analysis of creditors at the conversion date",
              "Bank statements covering the conversion date",
              "Stock valuation, if you carry inventory",
              "Fixed asset register with cost, date and accumulated depreciation",
              "VAT return for the last completed period, with its reconciliation",
              "Employee master data if payroll is moving at the same time",
              "Your customer and supplier lists, cleaned of duplicates and dead accounts",
            ],
          },
          {
            kind: "note",
            text: "The clean-up is the real work. Converting a messy ledger produces a messy Xero file, and then everyone blames the software.",
          },
        ],
      },
      {
        heading: "Design the chart of accounts around your business",
        blocks: [
          {
            kind: "text",
            text: "The single biggest missed opportunity in a migration is copying the old chart of accounts across unchanged. This is the one moment where restructuring costs nothing.",
          },
          {
            kind: "bullets",
            items: [
              "Split income by the lines you actually make decisions about, not by whatever was set up years ago.",
              "Separate direct costs from overheads properly, so gross margin means something month to month.",
              "Collapse accounts nobody has looked at in three years.",
              "Use tracking categories for branch, division or job instead of creating duplicate account codes.",
            ],
          },
        ],
      },
      {
        heading: "Connecting the plumbing",
        blocks: [
          {
            kind: "checklist",
            items: [
              "Apply for bank feeds early — the bank's approval is usually the longest wait in the whole project",
              "Confirm which accounts feed automatically and which need statement imports",
              "Set up your VAT settings to match your SARS category and registration date",
              "Connect payroll (South African payroll runs in an integrated system, not in Xero itself)",
              "Connect payment services if you want customers to pay invoices online",
              "Load your invoice template with your real logo, banking details and terms",
              "Set user access: who may approve payments, who may only capture",
              "Turn on two-step authentication for every user, without exception",
            ],
          },
        ],
      },
      {
        heading: "A realistic timeline",
        blocks: [
          {
            kind: "table",
            head: ["Stage", "Typical time", "What drives it"],
            rows: [
              ["Review and decision", "2 to 5 days", "How quickly you can supply the last trial balance"],
              ["Data preparation and clean-up", "3 to 10 days", "The state of the existing ledger"],
              ["Conversion and balancing", "2 to 5 days", "Complexity, stock, multi-currency"],
              ["Bank feeds live", "3 to 15 days", "The bank, not you or us"],
              ["Training", "Half a day, then support", "How many people capture data"],
            ],
          },
          {
            kind: "text",
            text: "A straightforward small business is usually working entirely in Xero within two to three weeks of starting.",
          },
        ],
      },
      {
        heading: "The five mistakes we see most",
        blocks: [
          {
            kind: "bullets",
            items: [
              "Converting without reconciling the opening balances to the last signed statements. Every later difference becomes impossible to trace.",
              "Bringing across years of transaction history that nobody will ever open, which slows the file and adds cost.",
              "Copying the old chart of accounts unchanged and losing the one chance to fix the reporting.",
              "Leaving the old system live, so two people capture the same invoice in two places.",
              "Skipping the training and then concluding the software is difficult.",
            ],
          },
        ],
      },
    ],
  },

  {
    slug: "month-end-close-checklist",
    metaDescription:
      "A seven-stage month-end close for South African small businesses: bank, debtors, creditors, payroll, VAT, adjustments and review. Free PDF.",
    title: "The Month-End Close Checklist",
    subtitle: "A repeatable close, in the order that actually works",
    category: "Running the books",
    forWho: "Bookkeepers and owners who want figures they can trust before the 10th.",
    summary:
      "A step-by-step month-end close for a South African small business: banking, debtors, creditors, VAT, payroll, journals and the review questions to ask before you call it done.",
    youGet: [
      "The close in seven ordered stages",
      "The reconciliations that catch the most errors",
      "A short review checklist before you sign it off",
      "A simple close timetable you can hand to staff",
    ],
    updated: UPDATED,
    pages: 5,
    sections: [
      {
        heading: "Why order matters",
        blocks: [
          {
            kind: "text",
            text: "A close done out of order produces numbers that move after you have looked at them. Cash first, then what you are owed, then what you owe, then the adjustments. Each stage depends on the one before it.",
          },
        ],
      },
      {
        heading: "Stage 1 — Cash",
        blocks: [
          {
            kind: "checklist",
            items: [
              "Every bank account reconciled to the statement, to the cent",
              "Credit card and loan accounts reconciled",
              "Card machine and payment gateway settlements matched to deposits",
              "Petty cash counted and agreed",
              "Unpresented items reviewed — anything older than three months investigated",
              "Suspense account cleared to zero",
            ],
          },
        ],
      },
      {
        heading: "Stage 2 — What you are owed",
        blocks: [
          {
            kind: "checklist",
            items: [
              "All sales invoices for the month raised and sent",
              "Debtors age analysis agreed to the debtors control account",
              "Credit notes processed in the correct month",
              "Deposits and payments in advance treated as liabilities, not income",
              "Anything over 90 days flagged for a decision, not just noted again",
            ],
          },
        ],
      },
      {
        heading: "Stage 3 — What you owe",
        blocks: [
          {
            kind: "checklist",
            items: [
              "All supplier invoices captured, including those still sitting in an inbox",
              "Creditors age analysis agreed to the creditors control account",
              "Supplier statements reconciled for your major accounts",
              "Accruals raised for costs incurred but not yet invoiced to you",
              "Prepayments split so the cost falls in the right months",
            ],
          },
        ],
      },
      {
        heading: "Stage 4 — Payroll and people",
        blocks: [
          {
            kind: "checklist",
            items: [
              "Payroll journal posted and agreed to the payroll reports",
              "Net pay per the payroll agreed to what actually left the bank",
              "PAYE, UIF and SDL liabilities agreed to the EMP201",
              "Leave and bonus provisions updated",
              "Any loans to or from staff reviewed",
            ],
          },
        ],
      },
      {
        heading: "Stage 5 — VAT",
        blocks: [
          {
            kind: "checklist",
            items: [
              "VAT control account reconciled to the VAT return for the period",
              "Zero-rated and exempt supplies checked for correct treatment",
              "Input VAT claimed only where a valid tax invoice is held",
              "Entertainment, motor cars and other blocked inputs excluded",
              "Prior period corrections tracked separately, not buried",
            ],
          },
          {
            kind: "note",
            text: "A VAT control account that never quite balances is the single most common sign that a set of books needs attention.",
          },
        ],
      },
      {
        heading: "Stage 6 — Adjustments and assets",
        blocks: [
          {
            kind: "checklist",
            items: [
              "Depreciation posted for the month",
              "New assets added to the fixed asset register, not expensed by accident",
              "Assets disposed of or scrapped removed, with the profit or loss recognised",
              "Stock count or movement processed, and cost of sales checked against gross margin",
              "Loan accounts and interest agreed to statements",
              "Owner's drawings and personal expenses posted where they belong",
            ],
          },
        ],
      },
      {
        heading: "Stage 7 — Review before you call it closed",
        blocks: [
          {
            kind: "text",
            text: "Print the income statement and balance sheet and ask these five questions. If any answer is a shrug, the close is not finished.",
          },
          {
            kind: "bullets",
            items: [
              "Does the gross margin look like last month? If not, do I know why?",
              "Is every balance sheet line supported by something I could show a third party?",
              "Are there any negative balances that make no sense — negative stock, negative creditors?",
              "Did anything unusually large hit a single expense account this month?",
              "Would I be comfortable if this month's figures were the ones a bank looked at?",
            ],
          },
        ],
      },
      {
        heading: "A close timetable that works",
        blocks: [
          {
            kind: "table",
            head: ["Working day", "What happens"],
            rows: [
              ["Day 1 to 2", "Capture outstanding supplier invoices; raise all sales invoices"],
              ["Day 3", "Bank, card and cash reconciliations"],
              ["Day 4", "Debtors and creditors reconciliations; supplier statements"],
              ["Day 5", "Payroll journal, accruals, prepayments, depreciation"],
              ["Day 6", "VAT reconciliation and review questions"],
              ["Day 7", "Management accounts issued, with a short commentary"],
            ],
          },
        ],
      },
    ],
  },
];

export const libraryDocuments: LibraryDoc[] = [
  ...documentsOne,
  ...documentsTwo,
  ...documentsThree,
];

export const docBySlug = (slug: string) => libraryDocuments.find((d) => d.slug === slug);

export const docCategories = Array.from(new Set(libraryDocuments.map((d) => d.category)));
